import "dotenv/config"
import mongoose from "mongoose"
import { generateAiInsights } from "../Services/aiInsights.services.js"
import { SalesSnapshots } from "../Models/SalesSnapshots.model.js" // CORREGIDO: Importamos el modelo correcto
import { AiInsights } from "../Models/AiInsights.model.js"

const calculateSeverity = (metrics) => {
    // Si tus snapshots no traen metrics.revenueChangePct, usamos por defecto 0
    const revenue = Math.abs(metrics?.revenueChangePct || 0)
    const orders = Math.abs(metrics?.ordersChangePct || 0)
    const impact = Math.max(revenue, orders)
    if (impact >= 40) return 5
    if (impact >= 30) return 4
    if (impact >= 20) return 3
    if (impact >= 10) return 2
    return 1
}

const insightType = (flags) => {
    if (!flags) return "info"
    if (flags.revenueSpike || flags.orderSpike) return "growth"
    if (flags.revenueDrop || flags.orderDrop) return "drop"
    return "info"
}

const sleep = (ms) => new Promise(res => setTimeout(res, ms))

async function processInsight(snapshot) {
    // 🔒 Idempotencia controlada por la clave única del snapshot de origen
    const exists = await AiInsights.findOne({
        sourceInsightId: snapshot._id
    })

    if (exists) {
        console.log("↩️  Ya existe insight para el período:", snapshot.periodKey)
        return false // No se procesó nada nuevo
    }

    // Armamos un objeto mapeado para que la IA entienda la estructura de datos que recibe
    const structuredMetrics = {
        totalRevenue: snapshot.totalRevenue,
        totalSales: snapshot.totalSales,
        avgTicket: snapshot.avgTicket,
        saleByCategory: snapshot.saleByCategory,
        salesByRegion: snapshot.salesByRegion
    }

    const severity = calculateSeverity(structuredMetrics)
    const type = insightType(snapshot.flags)

    console.log(`🤖 Solicitando análisis a la IA para ${snapshot.periodKey}...`)

    const aiData = await generateAiInsights({
        periodKey: snapshot.periodKey,
        metrics: structuredMetrics,
        type,
        severity,
        retries: 5
    })

    const normalizedConfidence = Math.min(
        1,
        Math.max(0, aiData.confidence)
    )

    await AiInsights.create({
        periodType: snapshot.period,
        periodKey: snapshot.periodKey,
        type,
        severity: aiData.severity || severity,
        summary: aiData.summary,
        explanation: aiData.explanation,
        recommendation: aiData.recommendation,
        risks: aiData.risks,
        confidence: normalizedConfidence,
        dataContent: structuredMetrics,
        sourceInsightId: snapshot._id // Vinculado al ID del SalesSnapshot
    })

    console.log("✅ Generado exitosamente:", snapshot.periodKey)
    return true // CORREGIDO: Retorna true para activar el delay de cuota
}

async function run() {
    try {
        await mongoose.connect(process.env.MONGO)
        console.log("🟢 Mongo conectado con éxito")

        // CORREGIDO: Buscamos en SalesSnapshots los 5 meses generados del 2026
        const snapshotsRecientes = await SalesSnapshots.find({ period: "monthly" })
            .sort({ periodKey: -1 }) // Trae primero 2026-m5, luego 2026-m4, etc.
            .limit(5)

        // Damos vuelta el array para procesarlos cronológicamente (Ene -> Feb -> Mar -> Abr -> May)
        const snapshots = snapshotsRecientes.reverse()

        console.log("📌 SNAPSHOTS ENCONTRADOS EN MONGO:", snapshots.map(s => s.periodKey))
        console.log("📌 IDS DE ORIGEN A PROCESAR:", snapshots.map(s => s._id))
        console.log("📊 Total de períodos a evaluar:", snapshots.length)

        for (const snapshot of snapshots) {
            try {
                console.log("▶️ Procesando período:", snapshot.periodKey)

                const didProcess = await processInsight(snapshot)

                // ⏱️ Espera 12s ÚNICAMENTE si realmente llamó a la API de Gemini
                if (didProcess) {
                    console.log("⏱️ Esperando 12 segundos para cuidar la cuota de la API...")
                    await sleep(12_000)
                }

            } catch (err) {
                console.error(`❌ Error en procesamiento de ${snapshot.periodKey}:`, err.message)
            }
        }

        console.log("🏁 Proceso de Insights finalizado por completo")
        process.exit(0)

    } catch (fatal) {
        console.error("💥 Error fatal en el hilo de ejecución:", fatal)
        process.exit(1)
    }
}

run()