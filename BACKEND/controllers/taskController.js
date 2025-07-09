const Task = require('../models/Task');
const { validationResult } = require('express-validator');

// Add a new task
exports.addTask = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, data: null, error: errors.array() });
  }
  try {
    const task = new Task(req.body);
    await task.save();
    res.status(201).json({ success: true, data: task, error: null });
  } catch (error) {
    res.status(500).json({ success: false, data: null, error: error.message });
  }
};

// Get all tasks
exports.getTasks = async (req, res) => {
  try {
    const tasks = await Task.find().populate('orderId');
    res.status(200).json({ success: true, data: tasks, error: null });
  } catch (error) {
    res.status(500).json({ success: false, data: null, error: error.message });
  }
};

// Get a task by ID
exports.getTaskById = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id).populate('orderId');
    if (!task) {
      return res.status(404).json({ success: false, data: null, error: 'Task not found' });
    }
    res.status(200).json({ success: true, data: task, error: null });
  } catch (error) {
    res.status(500).json({ success: false, data: null, error: error.message });
  }
};

// Update a task
exports.updateTask = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, data: null, error: errors.array() });
  }
  try {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!task) {
      return res.status(404).json({ success: false, data: null, error: 'Task not found' });
    }
    res.status(200).json({ success: true, data: task, error: null });
  } catch (error) {
    res.status(500).json({ success: false, data: null, error: error.message });
  }
};

// Delete a task
exports.deleteTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) {
      return res.status(404).json({ success: false, data: null, error: 'Task not found' });
    }
    res.status(200).json({ success: true, data: { message: 'Task deleted successfully' }, error: null });
  } catch (error) {
    res.status(500).json({ success: false, data: null, error: error.message });
  }
};
