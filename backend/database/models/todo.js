const mongoose = require('mongoose');

const TodoSchema = new mongoose.Schema({
    title: {
        type: String,
        trim: true,
        minLength: 3
    },
    _categoryId: {
        type: mongoose.Types.ObjectId,
        required: true
    },
    completed: {
        type: Boolean,
        default: false,
        required: true
    }
});

const Todo = mongoose.model('Todo', TodoSchema);

module.exports = Todo;