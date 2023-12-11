const express = require('express');
const router = express.Router();
const multer = require('multer');
const {
  deleteTodo, updateTodo, createTodo, getAllTodosWithPagination, getAllTodos, getSingleTodo,
} = require('./TodosController');

router.get('/single-todo/:id', getSingleTodo);

router.get('/all-todos', getAllTodos);

router.get('/all-todos-with-pagination', getAllTodosWithPagination);

router.post('/create-todo', multer().none(), createTodo);

router.put('/update-todo/:id', multer().none(), updateTodo);

router.delete('/delete-todo/:id', multer().none(), deleteTodo);

module.exports = router;
