import { Sales } from "../Models/Sales.model.js"

export const summary = async (req, res) => {


    const { from, to } = req.params
    try {
        const response = await Sales.aggregate([
            // { $match: { saleDate: { $gte: new Date(from), $lte: new Date(to) } } },

            {
                $facet: {
                    totals: [
                        {
                            $group: {
                                _id: null,
                                totalRevenue: { $sum: "$total" },
                                totalSales: { $sum: 1 },
                                avgTicket: { $avg: "$total" }
                            }
                        },
                    ],
                    byCategory: [
                        {
                            $group: {
                                _id: "$category",
                                revenue: { $sum: "$total" }
                            }
                        },
                        { $sort: { revenue: -1 } }

                    ],
                    byRegion: [
                        {
                            $group: {
                                _id: "$region",
                                revenue: { $sum: "$total" }
                            }
                        },
                        { $sort: { revenue: -1 } }

                    ]
                }
            }


        ])

        res.status(200).json({ category: response[0].byCategory, region: response[0].byRegion, totals: response[0].totals })
    } catch (error) {

    }
}


