
import { AiInsights } from "../Models/AiInsights.model.js"
import { Insights } from "../Models/Insights.model.js"
import { generateAiInsights } from "./aiInsights.services.js"


const calculateSeverity = (metrics) => {
    const revenue = Math.abs(metrics.revenueChangePct || 0)
    const orders = Math.abs(metrics.ordersChangePct || 0)
    const impact = Math.max(revenue, orders)
    if (impact >= 40) return 5
    if (impact >= 30) return 4
    if (impact >= 20) return 3
    if (impact >= 10) return 2
    return 1
}

const insightType = (flags) => {
    if (flags.revenueSpike || flags.orderSpike) return "growth"
    if (flags.revenueDrop || flags.orderdrop) return "drop"
    return "info"

}

export const generatePeriodAiInsight = async (period) => {

    try {

        if (!["weekly", "monthly"].includes(period)) return
        const insight = await Insights.findOne({ period }).sort({ periodKey: -1 })
        if (!insight) return

        const insightExists = await AiInsights.exists({ periodType: period, periodKey: insight.periodKey })
        if (insightExists) return

        const severity = calculateSeverity(insight.metrics)
        const type = insightType(insight.flags)

        const aiData = await generateAiInsights({
            periodKey: insight.periodKey, metrics: insight.metrics, type, severity
        })

        const normalizedConfidence = Math.min(1, Math.max(0, aiData.confidence))
        await AiInsights.create({
            periodType: period,
            periodKey: insight.periodKey,
            type, severity,
            summary: aiData.summary,
            explanation: aiData.explanation,
            recommendation: aiData.recommendation,
            risks: aiData.risks,
            confidence: normalizedConfidence,
            dataContent: insight.metrics,
            sourceInsightId: insight._id
        })
    } catch (error) {
        console.log(error)
    }





}