

import { getAiProvider } from "../ai/index.js"



const sleep = (ms) => new Promise(res => setTimeout(res, ms))

const extractJsonSafe = (text) => {
    const match = text.match(/\{[\s\S]*\}/)
    if (!match) {
        throw new Error("No se encontró JSON válido en la respuesta del AI")
    }
    return JSON.parse(match[0])
}



export const generateAiInsights = async ({
    periodKey,
    metrics,
    type,
    severity,
    retries = 3
}) => {

    const prompt = `
Sos un analista senior de negocios especializado en dashboards de ventas.
Analizás insights ya validados, no los cuestionás.

CONTEXTO:
- Tipo: ${type}
- Periodo: ${periodKey}
- Severidad (1-5): ${severity}

MÉTRICAS:
- Variación de ingresos (%): ${metrics.revenueChangePct}
- Variación de órdenes (%): ${metrics.ordersChangePct}
- Variación del ticket promedio (%): ${metrics.avgOrderValueChangePct}

INSTRUCCIONES:
Devolvé EXCLUSIVAMENTE JSON válido con esta estructura exacta:

{
  "summary": "string",
  "explanation": "string",
  "recommendation": "string",
  "risks": ["string"],
  "confidence": number,
   "severity":number
}

REGLAS:
- No inventes métricas
- No repitas números
- No menciones AI ni modelos
- Sé claro y conciso
`

    const aiProvider = getAiProvider()

    try {
        const rawResponse = await aiProvider.generate(prompt)
        return extractJsonSafe(rawResponse)

    } catch (err) {
        const status = err?.status || err?.response?.status


        const retryDetail = err?.response?.data?.error?.details
            ?.find(d => d["@type"]?.includes("RetryInfo"))

        let retryMs = null

        if (retryDetail?.retryDelay) {
            retryMs = Number(retryDetail.retryDelay.replace("s", "")) * 1000
        }


        if (status === 503) {
            retryMs = 30_000
        }

        if (retries > 0 && retryMs) {
            console.warn(
                `⏳ Retry ${periodKey} en ${retryMs / 1000}s (${retries} restantes)`
            )

            await sleep(retryMs)

            return generateAiInsights({
                periodKey,
                metrics,
                type,
                severity,
                retries: retries - 1
            })
        }

        throw err
    }
}
