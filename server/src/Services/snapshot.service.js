
import { Sales } from "../Models/Sales.model.js"
import { SalesSnapshots } from "../Models/SalesSnapshots.model.js"
function getMonthlyPeriodKey(from) {
    const date = new Date(from);
    const year = date.getUTCFullYear();
    const month = date.getUTCMonth() + 1; // 1–12

    return `${year}-m${month}`;
}

export const generateSnapshot = async ({ period, from, to }) => {
    try {



        function getWeeklyPeriodKey(from) {
            const date = new Date(from);
            const year = date.getUTCFullYear();
            const firstJan = new Date(Date.UTC(year, 0, 1));
            const dayOfYear = Math.floor((date - firstJan) / (24 * 60 * 60 * 1000)) + 1;
            const week = Math.ceil(dayOfYear / 7);
            return `${year}-w${String(week).padStart(2, '0')}`;
        }

        const result = await Sales.aggregate([


            {
                $match: {
                    saleDate: {
                        $gte: from,
                        $lte: to
                    }
                }
            },
            {


                $facet: {
                    totals: [
                        { $group: { _id: null, totalRevenue: { $sum: "$total" }, totalSales: { $sum: "$quantity" }, avgTicket: { $avg: "$total" } } }
                    ],
                    byCategory: [
                        { $group: { _id: "$category", revenue: { $sum: "$total" } } }
                    ],
                    byRegion: [
                        { $group: { _id: "$region", revenue: { $sum: "$total" } } }
                    ]
                }



            }
        ])

        const totals = result[0].totals[0]

        const periodKey = period === "weekly"
            ? getWeeklyPeriodKey(from)
            : getMonthlyPeriodKey(from);

        return SalesSnapshots.create({
            period, periodKey, from, to,
            totalRevenue: totals?.totalRevenue || 0,
            totalSales: totals?.totalSales || 0,
            avgTicket: totals?.avgTicket || 0,
            salesByCategory: result[0].byCategory.map(c => ({
                category: c._id,
                revenue: c.revenue
            })),
            salesByRegion: result[0].byRegion?.map(r => ({
                region: r._id,
                revenue: r.revenue
            })),


        })
    } catch (error) {
        console.log(error)
    }
}