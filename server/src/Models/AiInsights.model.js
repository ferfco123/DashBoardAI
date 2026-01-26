
import mongoose from "mongoose"

const AiInsightsSchema = new mongoose.Schema({

    sourceInsightId: { type: mongoose.Schema.Types.ObjectId, ref: "Insights", required: true, unique: true },
    periodType: { type: String, enum: ["weekly", "monthly"] },
    periodKey: String,
    type: {
        type: String, enum: ["growth", "drop", "info"]
    },
    severity: { type: Number, min: 1, max: 5, required: true },
    summary: String,
    explanation: String,
    recommendation: String,
    risks: { type: [String], default: [] },
    dataContext: { type: mongoose.Schema.Types.Mixed },
    confidence: { type: Number, min: 0, max: 1 },
    model: String


}, {
    timestamps: true
})

export const AiInsights = mongoose.model("AiInsights", AiInsightsSchema)