import { arrayOfChannel, arrayOfProducts, arrayOfRegions } from "./products.js"
import { Sales } from "../Models/Sales.model.js"




export const generateSales = async () => {


    try {


        const totalSales = Math.floor(Math.random() * (51)) + 50






        function getWeekNumber(d) {
            const date = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
            const dayNum = date.getUTCDay() || 7;
            date.setUTCDate(date.getUTCDate() + 4 - dayNum);
            const yearStart = new Date(Date.UTC(date.getUTCFullYear(), 0, 1));
            return Math.ceil((((date - yearStart) / 86400000) + 1) / 7);
        }
        let sales = []
        for (let i = 0; i < totalSales; i++) {

            const date = new Date(Date.now() - Math.random() * 4 * 24 * 60 * 60 * 1000)
            const year = date.getFullYear()
            const week = getWeekNumber(date)
            const weekStr = week.toString().padStart(2, "0")


            const product = arrayOfProducts[Math.floor(Math.random() * arrayOfProducts.length)];


            const quantity = Math.ceil(Math.random() * 5)



            sales.push({
                saleNumber: Number(`${year}${weekStr}${i}`),
                productId: product._id,
                productName: product.name,
                category: product.category,
                quantity,
                total: quantity * product.salePrice,
                region: arrayOfRegions[Math.floor(Math.random() * arrayOfRegions.length)],
                channel: arrayOfChannel[Math.floor(Math.random() * arrayOfChannel.length)],
                saleDate: date,

            })
        }
        await Sales.insertMany(sales)
    } catch (error) {
        console.log(error)
    }


}


