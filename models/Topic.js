const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const StepSchema = mongoose.Schema({
    title: { type: String, default: "untitled" },
    status: { type: String, default: "notdone" },
    url: { type: String, default: "" },
    date: {
        type: Date,
        default: Date.now
    }
});

const TopicSchema = mongoose.Schema({
    name: { type: String, default: "untitled" },
    description: { type: String, default: "untitled" },
    steps: [StepSchema],
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Topic', TopicSchema);

