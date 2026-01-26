
import fs from "fs"
import { Product } from "../Models/Products.model.js";

import mongoose from "mongoose";


await mongoose.connect(process.env.MONGO)

const data = JSON.parse(fs.readFileSync("src/seedData/products.js", "utf-8"))

await Product.insertMany(data)
console.log("cargado")
process.exit()