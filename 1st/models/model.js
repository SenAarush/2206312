const mongoose = require('mongoose');

const windowStateSchema = new mongoose.Schema({
    identifier: {
        type: String,
        required: true,
        unique: true,
        default: 'averageCalculatorState' 
    },
  
    window: {
        type: [Number],
        default: []
    }
}, { timestamps: true });

const WindowState = mongoose.model('WindowState', windowStateSchema);

module.exports = WindowState;