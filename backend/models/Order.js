import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    user:{
        type: String,
        required: true,
    },

    products: [
        {
        name: String,
        price: Number,
        quantity: Number,
        }
    ],

    total:Number,

    status: {
        type: String,
        default: "pendiente",
    },

    createdAt: {
        type: Date,
        default: Date.now,
    }


});

export default mongoose.model("Order", orderSchema);