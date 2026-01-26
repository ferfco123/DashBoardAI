
import mongoose from "mongoose"

const InsightsSchema = new mongoose.Schema({


    period: { type: String, enum: ["weekly", "monthly"], required: true },
    periodKey: { type: String, required: true },
    comparedTo: { type: String, required: true },
    metrics: { revenueChangePct: Number, ordersChangePct: Number, avgOrderValueChangePct: Number },
    flags: {
        revenueSpike: Boolean,
        revenueDrop: Boolean, orderSpike: Boolean, orderdrop: Boolean,
    },




}, {
    timestamps: true
})

export const Insights = mongoose.model("Insights", InsightsSchema)