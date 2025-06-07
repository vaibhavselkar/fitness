const express = require('express');
const router = express.Router();
const Workout = require('../models/workout');

// POST /submit - Add or update workout for a user
router.post('/submit', async (req, res) => {
    const { name, age, exercise, duration } = req.body;
  
    try {
      let user = await Workout.findOne({ name });
  
      if (user) {
        user.workouts.push({ exercise, duration });
        await user.save();
        res.status(200).json({ message: 'Workout added to existing user.' });
      } else {
        const newUser = new Workout({
          name,
          age,
          workouts: [{ exercise, duration }]
        });
        await newUser.save();
        res.status(201).json({ message: 'New user and workout saved.' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Error saving workout', details: error.message });
    }
  });
  
  // GET /users - Get all users or filter by name
  router.get('/users_fitness_record', async (req, res) => {
    const { name } = req.query;
  
    try {
      if (name) {
        const user = await Workout.findOne({ name });
        if (!user) return res.status(404).json({ message: 'User not found' });
        return res.status(200).json(user);
      }
  
      const users = await Workout.find();
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ error: 'Error fetching users', details: error.message });
    }
  });
  

module.exports = router;
