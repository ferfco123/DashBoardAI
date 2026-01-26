import { Sales } from "../Models/Sales.model.js"

export const summary = async (req, res) => {



    try {
        const response = await Sales.aggregate([


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

        res.status(200).json(response)
    } catch (error) {
        console.log(error)
    }
}