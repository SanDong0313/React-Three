const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const projectSchema = new Schema({
    name: {
        type: String,
        require: true
    },
    template: {
        type: String,
        default: ''
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    images: [{
        filename: {
            type: String
        },
        is_build: {
            type: Number,
            default: 0
        }
    }],
    date: {
        type: Date,
        default: Date.now
    },
    ref_number: {
        type: Number,
        default: 0
    }
});

module.exports = Project = mongoose.model("projects", projectSchema);