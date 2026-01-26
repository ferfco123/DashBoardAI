
import mongoose from "mongoose"

const SalesSchema = new mongoose.Schema({


    saleNumber: { type: Number, required: true },
    productId: { type: mongoose.Schema.Types.ObjectId, ref: "Products" },
    productName: { type: String, required: true },
    category: { type: String, required: true },
    quantity: { type: Number },
    salePrice: { type: Number },
    total: { type: Number },
    region: { type: String },
    channel: { type: String, enum: ["online", "store", "distributor"] },
    saleDate: { type: Date }

}, {
    timestamps: true
})

export const Sales = mongoose.model("Sales", SalesSchema)