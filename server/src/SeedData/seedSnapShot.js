
import mongoose from "mongoose"
import { generateSnapshot } from "../Services/snapshot.service.js"
import { Sales } from "../Models/Sales.model.js"
import { SalesSnapshots } from "../Models/SalesSnapshots.model.js"


await mongoose.connect(process.env.MONGO)


const pipeline = [
    {
        $addFields: {
            year: { $year: "$saleDate" },
            month: { $month: "$saleDate" }
        }
    },


    {
        $group: {
            _id: {
                year: "$year",
                month: "$month"
            },
            totalRevenue: { $sum: "$total" },
            totalSales: { $sum: "$quantity" },
            avgTicket: { $avg: "$total" },

            sales: {
                $push: {
                    category: "$category",
                    region: "$region",
                    total: "$total"
                }
            }
        }
    },


    {
        $addFields: {
            period: "monthly",
            periodKey: {
                $concat: [
                    { $toString: "$_id.year" },
                    "-m",
                    { $toString: "$_id.month" }
                ]
            },
            from: {
                $dateFromParts: {
                    year: "$_id.year",
                    month: "$_id.month",
                    day: 1
                }
            },
            to: {
                $dateSubtract: {
                    startDate: {
                        $dateAdd: {
                            startDate: {
                                $dateFromParts: {
                                    year: "$_id.year",
                                    month: "$_id.month",
                                    day: 1
                                }
                            },
                            unit: "month",
                            amount: 1
                        }
                    },
                    unit: "millisecond",
                    amount: 1
                }
            }
        }
    },

    {
        $addFields: {
            saleByCategory: {
                $map: {
                    input: { $setUnion: ["$sales.category", []] },
                    as: "cat",
                    in: {
                        category: "$$cat",
                        revenue: {
                            $sum: {
                                $map: {
                                    input: {
                                        $filter: {
                                            input: "$sales",
                                            as: "s",
                                            cond: { $eq: ["$$s.category", "$$cat"] }
                                        }
                                    },
                                    as: "f",
                                    in: "$$f.total"
                                }
                            }
                        }
                    }
                }
            }
        }
    },


    {
        $addFields: {
            salesByRegion: {
                $map: {
                    input: { $setUnion: ["$sales.region", []] },
                    as: "reg",
                    in: {
                        region: "$$reg",
                        revenue: {
                            $sum: {
                                $map: {
                                    input: {
                                        $filter: {
                                            input: "$sales",
                                            as: "s",
                                            cond: { $eq: ["$$s.region", "$$reg"] }
                                        }
                                    },
                                    as: "f",
                                    in: "$$f.total"
                                }
                            }
                        }
                    }
                }
            }

        }
    },


    {
        $project: {
            _id: 0,
            sales: 0
        }
    }
]

const preview = await Sales.aggregate(pipeline)
await SalesSnapshots.insertMany(preview)
console.log("PREVIEW SNAPSHOTS")
console.dir(preview, { depth: null })