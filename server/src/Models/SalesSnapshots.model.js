
import mongoose from "mongoose"

const SalesSnapshotsSchema = new mongoose.Schema({


    period: { type: String, enum: ["daily", "weekly", "monthly"] },
    from: { type: Date, required: true },
    to: { type: Date, required: true },
    periodKey: { type: String },
    totalRevenue: { type: Number },
    totalSales: { type: Number },
    avgTicket: { type: Number },

    saleByCategory: [{
        _id: false,
        category: String,
        revenue: Number
    }],
    salesByRegion: [{
        _id: false,
        region: String,
        revenue: Number
    }],


}, {
    timestamps: true
})

export const SalesSnapshots = mongoose.model("SalesSnapshots", SalesSnapshotsSchema)