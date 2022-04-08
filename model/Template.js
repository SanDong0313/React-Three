const mongoose = require('mongoose');

const schema = mongoose.Schema;

const TemplateSchema = new schema({
    name: {
        type: String,
        require: true
    },
    files: [{
        filename: {
            type: String
        },
        filetype: {
            type: String
        }
    }],
    model_name: {
        type: String,
        require: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = Template = mongoose.model('templates', TemplateSchema);