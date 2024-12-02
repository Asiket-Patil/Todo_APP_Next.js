const mongoose = require('mongoose');

const TodoSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    isCompleted: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true 
});

const TodoModel = mongoose.models.Todo || mongoose.model('Todo', TodoSchema);

module.exports = TodoModel;
