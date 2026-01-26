
import cron from "node-cron"
import { generateSnapshot } from "../Services/snapshot.service.js"
import { generatePeriodAiInsight } from "../Services/generate.periodinsight.js"
import { generateInsight } from "../Services/insight.service.js"
import { generateSales } from "../Services/generate.sales.js"





const getMonthRange = () => {
    const now = new Date()

    const from = new Date(now.getFullYear(), now.getMonth(), 1)
    const to = new Date(now.getFullYear(), now.getMonth(), + 1, 0, 23, 59, 59, 999)

    return { from, to }

}

const getPreviousWeekRange = () => {
    const now = new Date()


    const end = new Date(now)
    end.setDate(now.getDate() - 1)
    end.setHours(23, 59, 59, 999)


    const start = new Date(end)
    start.setDate(end.getDate() - 6)
    start.setHours(0, 0, 0, 0)

    return { from: start, to: end }
}

cron.schedule("0 2 * * 5", async () => {



    await generateSales()
})

cron.schedule("0 2 * * 1", async () => {

    const { from, to } = getPreviousWeekRange()
    try {

        await generateSnapshot({
            period: "weekly",
            from,
            to
        })
        await generateInsight({ period: "weekly" })
        await generatePeriodAiInsight("weekly")
    } catch (error) {

    }
})

cron.schedule("10 0 1 * *", async () => {
    try {

        const { from, to } = getMonthRange()
        await generateSnapshot({
            period: "monthly",
            from,
            to
        })
        await generateInsight({ period: "monthly" })
        await generatePeriodAiInsight("monthly")
    } catch (error) {

    }
})

