const mongoose = require('mongoose');

const workoutEntrySchema = new mongoose.Schema({
  exercise: String,
  duration: Number,
  timestamp: { type: Date, default: Date.now }
});

const WorkoutSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  age: { type: Number, required: true },
  workouts: [workoutEntrySchema]
});

module.exports = mongoose.model('Workout', WorkoutSchema);
