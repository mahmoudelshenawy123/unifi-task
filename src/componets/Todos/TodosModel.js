const mongoose = require('mongoose');

const TodosSchema = mongoose.Schema({
  title: {
    type: String,
    required: [true, 'To Do Title is required'],
  },
  priority: {
    type: String,
    enum:['high','medium','low'],
    required: [true, 'To Do Priority is required'],
  },
  user_id: {
    // type: mongoose.Schema.Types.ObjectId,
    // ref: 'User',
    // required: [true, 'User Id is required'],
    type: String,
    required: [true, 'User Id is required'],
  },

}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  },
});

module.exports.Todos = mongoose.model('Todo', TodosSchema);
