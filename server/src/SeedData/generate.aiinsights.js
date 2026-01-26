
import mongoose from "mongoose"

import dotenv from "dotenv"
dotenv.config()
import { generateAiInsights } from "../Services/aiInsights.services.js"
import { Insights } from "../Models/Insights.model.js"
import { AiInsights } from "../Models/AiInsights.model.js"




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
    if (flags.revenueDrop || flags.orderDrop) return "drop"
    return "info"

}
const sleep = (ms) => new Promise(res => setTimeout(res, ms))










async function processInsight(insight) {
    try {





        const exists = await AiInsights.findOne({
            sourceInsightId: insight._id
        })

        if (exists) {
            console.log("↩️  Ya existe:", insight.periodKey)
            return
        }

        const severity = calculateSeverity(insight.metrics)
        const type = insightType(insight.flags)

        const aiData = await generateAiInsights({
            periodKey: insight.periodKey,
            metrics: insight.metrics,
            type,
            severity,
            retries: 5
        })
        const normalizedConfidence = Math.min(
            1,
            Math.max(0, aiData.confidence)
        )

        await AiInsights.create({
            periodType: insight.period,
            periodKey: insight.periodKey,
            type,
            severity: aiData.severity,
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

    console.log("✅ Generado:", insight.periodKey)
}




async function run() {
    try {
        await mongoose.connect(process.env.MONGO)
        console.log("🟢 Mongo conectado")


        const insights = await Insights.find({ period: "weekly" })
            .sort({ periodKey: 1 })

        console.log("📊 Insights encontrados:", insights.length)

        for (const insight of insights) {
            try {
                console.log("▶️ Procesando:", insight.periodKey)

                // ⚡ retries ya se manejan dentro de generateAiInsights
                await processInsight(insight)

                // ⏱️ Gemini free tier: 5 req / min → espera 12s entre cada insight
                await sleep(12_000)

            } catch (err) {
                console.error(`❌ Error en ${insight.periodKey}:`, err.message)
                // no hacemos retry aquí, ya lo hace la función
            }
        }

        console.log("🏁 Proceso terminado")
        process.exit(0)

    } catch (fatal) {
        console.error("💥 Error fatal:", fatal)
        process.exit(1)
    }
}



run()







