import mongoose from "mongoose";
import { Product } from "../Models/Products.model.js";
import { Sales } from "../Models/Sales.model.js";



await mongoose.connect(process.env.MONGO)

const products = await Product.find()


const regions = ["Norte", "Centro", "Sur", "AMBA"]
const channels = ["online", "store", "distributor"]

const sales = []

for (let i = 0; i < 5000; i++) {
    const product = products[Math.floor(Math.random() * products.length)]

    const quantity = Math.ceil(Math.random() * 5)
    const unitPrice = product.salePrice

    sales.push({
        saleNumber: i + 1,
        productId: product._id,
        productName: product.name,
        category: product.category,
        quantity, unitPrice,
        total: quantity * unitPrice,
        region: regions[Math.floor(Math.random() * regions.length)],
        channel: channels[Math.floor(Math.random() * channels.length)],
        saleDate: new Date(Date.now() - Math.random() * 1000 * 60 * 60 * 24 * 90),

    })
}

await Sales.insertMany(sales)
console.log("cargado")
process.exit()