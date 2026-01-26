import { AiInsights } from "../Models/AiInsights.model.js"
import { Insights } from "../Models/Insights.model.js"
import { SalesSnapshots } from "../Models/SalesSnapshots.model.js"


function getMonthlyPeriodKey(from) {
    const date = new Date(from);
    const year = date.getUTCFullYear();
    const month = date.getUTCMonth() + 1; // 1–12

    return `${year}-m${month}`;
}


export const getLabels = async (req, res) => {
    const period = req.query.period || "weekly"

    try {
        const [weeklyLabels, monthlyLabels] = await Promise.all([SalesSnapshots.find({ period: "weekly" }, { periodKey: true, _id: false }).sort({ periodKey: -1 }),
        SalesSnapshots.find({ period: "monthly" }, { periodKey: true, _id: false }).sort({ periodKey: -1 })
        ])

        res.status(200).json({ weekly: weeklyLabels, monthly: monthlyLabels })

    } catch (error) {
        console.log(error)
    }

}

export const getSnapshots = async (req, res) => {

    const periodKey = req.query.periodKey
    const period = req.query.period


    let filters = {}
    if (period) { filters.period = period } else { filters.period = "weekly" }
    if (periodKey) filters.periodKey = periodKey
    let filtersAi = {}
    if (period) { filtersAi.periodType = period } else { filtersAi.periodType = "weekly" }
    if (periodKey) filtersAi.periodKey = periodKey


    try {

        const [snapshot, insight, aiinsight] = await Promise.all([SalesSnapshots.find(filters).sort({ periodKey: -1 }).limit(1), Insights.find(filters).sort({ periodKey: -1 }).limit(1), AiInsights.find(filtersAi).sort({ periodKey: -1 }).limit(1)])
        res.status(200).json({ snapshot, insight, aiinsight })




    } catch (error) {
        console.log(error)
    }
}

export const getAllSnapshots = async (req, res) => {
    try {

        const response = await SalesSnapshots.find({ period: "weekly" }, { totalRevenue: true, totalSales: true, periodKey: true, avgTicket: true }).sort({ periodKey: 1 })
        res.status(200).json(response)
    } catch (error) {

    }




}