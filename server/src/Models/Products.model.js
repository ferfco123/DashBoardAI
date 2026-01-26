
import mongoose from "mongoose"

const ProductSchema = new mongoose.Schema({


    name: { type: String, required: true },
    category: { type: String, required: true },
    sku: { type: String, required: true },
    costPrice: { type: Number, required: true },
    salePrice: { type: Number },
    isActive: { type: Boolean, defaulT: true },

}, {
    timestamps: true
})

export const Product = mongoose.model("Product", ProductSchema)