import { AiInsights } from "../Models/AiInsights.model.js"


export const getAiInsights = async (req, res) => {
    console.log("insights")

    try {




        const { period, periodKey, type, minSeverity } = req.query
        const filters = {}
        console.log("minseverity", minSeverity)
        const severityMap = {
            low: { $lte: 2 },
            medium: 3,
            high: { $gte: 4 }
        }
        if (period) filters.periodType = period
        if (periodKey) filters.periodKey = periodKey
        if (type) filters.type = type
        if (minSeverity) filters.severity = severityMap[minSeverity]

        const response = await AiInsights.find(filters).sort({ periodKey: -1 })

        res.status(200).json(response)
    } catch (error) {
        console.log(error)
    }

}