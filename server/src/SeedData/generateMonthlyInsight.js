import mongoose from "mongoose"
import { SalesSnapshots } from "../Models/SalesSnapshots.model.js"
import { Insights } from "../Models/Insights.model.js"
import dotenv from "dotenv"
dotenv.config()

function pctChange(current, previous) {
    if (!previous || previous === 0) return null
    return ((current - previous) / previous) * 100

}


async function run() {
    await mongoose.connect(process.env.MONGO)

    const snapshot = await SalesSnapshots.find({ period: "monthly" }).sort({ from: 1 })

    for (let i = 1; i < snapshot.length; i++) {
        const current = snapshot[i]
        const previous = snapshot[i - 1]
        const revenueChangePct = pctChange(current.totalRevenue, previous.totalRevenue)

        const ordersChangePct = pctChange(current.totalSales, previous.totalSales)
        const avgOrderValueChangePct = pctChange(current.avgTicket, previous.avgTicket)



        await Insights.create({


            period: "monthly",

            periodKey: current.periodKey,
            comparedTo: previous.periodKey,
            metrics: {
                revenueChangePct,
                ordersChangePct,
                avgOrderValueChangePct
            },
            flags: {
                revenueSpike: revenueChangePct >= 20,
                revenueDrop: revenueChangePct <= -20,
                orderSpike: ordersChangePct >= 20,
                orderdrop: ordersChangePct <= -20
            }
        })
    }
    console.log("generado")
    process.exit()
}
run()