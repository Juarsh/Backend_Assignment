const mongoose = require('mongoose');

const reportSchema = mongoose.Schema({
    cmdtyName: {
        type: String,
    },
    cmdtyID: {
        type: String,
    },
    marketID: {
        type: String,
    },
    marketName: {
        type: String,
    },
    users:{
        type: [String],
    },
    priceUnit: {
        type: String,
    },
    price: {
        type: Number,
    },
}, { timestamps: true });

module.exports = mongoose.model('user', reportSchema);

