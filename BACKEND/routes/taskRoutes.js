const express = require('express');
const { body, validationResult } = require('express-validator');
const router = express.Router();
const taskController = require('../controllers/taskController');

// Validation rules for creating/updating a task
const taskValidationRules = [
  body('title').notEmpty().withMessage('Title is required'),
  body('orderId').notEmpty().withMessage('Order ID is required'),
  body('status').optional().isIn(['pending', 'in progress', 'completed']).withMessage('Invalid status'),
  body('dueDate').optional().isISO8601().withMessage('Due date must be a valid date'),
];

// Task routes
router.post('/', taskValidationRules, taskController.addTask);
router.get('/', taskController.getTasks);
router.get('/:id', taskController.getTaskById);
router.put('/:id', taskValidationRules, taskController.updateTask);
router.delete('/:id', taskController.deleteTask);

module.exports = router;
