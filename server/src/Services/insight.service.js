import { Insights } from "../Models/Insights.model.js"
import { SalesSnapshots } from "../Models/SalesSnapshots.model.js"

function pctChange(current, previous) {
    if (!previous || previous === 0) return null;
    return ((current - previous) / previous) * 100;
}
export const generateInsight = async ({ period }) => {
    try {


        const snapshots = await SalesSnapshots.find({ period }).sort({ from: -1 }).limit(2)

        if (snapshots.length < 2) return

        const [current, previous] = snapshots
        let growth = 0

        if (previous.totalRevenue > 0) {
            growth = (current.totalRevenue - previous.totalRevenue) / previous.totalRevenue
        }
        const revenueChangePct = pctChange(current.totalRevenue, previous.totalRevenue)
        const ordersChangePct = pctChange(current.totalSales, previous.totalSales)
        const avgOrderValueChangePct = pctChange(current.avgTicket, previous.avgTicket)

        let labels = {}
        if (period === "monthly") {
            labels.currentMonthlabel = `${current.from.getFullYear()}-${(current.from.getMonth() + 1)
                .toString()
                .padStart(2, "0")}`

            const previousDate = new Date(current.from)
            previousDate.setMonth(current.from.getMonth() - 1)

            labels.previousMonthLabel = `${previousDate.getFullYear()}-${(previousDate.getMonth() + 1)
                .toString()
                .padStart(2, "0")}`
        }

        const periodKey = period === "weekly" ? current.periodKey : labels.currentMonthlabel
        const comparedTo = period === "weekly" ? previous.periodKey : labels.previousMonthLabel

        const existing = await Insights.findOne({ period, periodKey });
        if (existing) return;
        await Insights.create({


            period,
            periodKey,
            comparedTo,
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
    } catch (error) {
        console.log(error)
    }





}