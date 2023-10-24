const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
    menuId: {
        type: Number,
        required: true,
        unique: true,
    },
    orderType: {
        type: String,
        enum: ["Food", "Drink"],
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    deletedAt: {
        type: Date,
        default: null
    },
    updatedAt: {
        type: Date,
        default: null
    },
    totalPrice: {
        type: Number,
        required: true
    },
    orderStatus: {
        type: String,
        enum: ["Pending", "Served", "Paid"],
        default: "Pending"
    }
});

module.exports = mongoose.model("Order", OrderSchema);