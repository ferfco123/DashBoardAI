import mongoose from "mongoose";
import { Sales } from "../Models/Sales.model.js";
import { SalesSnapshots } from "../Models/SalesSnapshots.model.js";


function getPeriodKeyFromDate(fromDate) {
    const date = new Date(fromDate);
    const tmpDate = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
    const dayNum = tmpDate.getUTCDay() || 7;
    tmpDate.setUTCDate(tmpDate.getUTCDate() + 4 - dayNum);
    const yearStart = new Date(Date.UTC(tmpDate.getUTCFullYear(), 0, 1));
    const week = Math.ceil((((tmpDate - yearStart) / 86400000) + 1) / 7);
    return `${tmpDate.getUTCFullYear()}-w${String(week).padStart(2, "0")}`;
}

async function run() {
    await mongoose.connect(process.env.MONGO);

    const lastSnapshot = await SalesSnapshots
        .findOne({ period: "weekly" })
        .sort({ from: -1 });

    const fromDate = lastSnapshot ? lastSnapshot.to : new Date("2026-01-01T00:00:00.000Z");
    const toDate = new Date();




    const weeks = await Sales.aggregate([
        {
            $match: {
                saleDate: {
                    $gt: fromDate,
                    $lte: toDate
                }
            }
        },
        {
            $project: {
                saleDate: 1,
                isoYear: { $isoWeekYear: "$saleDate" },
                isoWeek: { $isoWeek: "$saleDate" }
            }
        },
        {
            $group: {
                _id: {
                    year: "$isoYear",
                    week: "$isoWeek"
                },
            }
        },
        { $sort: { "_id.year": 1, "_id.week": 1 } }
    ]);

    for (const w of weeks) {
        const result = await Sales.aggregate([
            {
                $match: {
                    saleDate: {
                        $gt: fromDate,
                        $lte: toDate
                    }
                }
            },
            {
                $project: {
                    total: 1,
                    category: 1,
                    region: 1,
                    saleDate: 1,
                    isoYear: { $isoWeekYear: "$saleDate" },
                    isoWeek: { $isoWeek: "$saleDate" }
                }
            },
            { $match: { isoYear: w._id.year, isoWeek: w._id.week } },
            {
                $facet: {
                    totals: [
                        {
                            $group: {
                                _id: null,
                                revenue: { $sum: "$total" },
                                orders: { $sum: 1 },
                                from: { $min: "$saleDate" },
                                to: { $max: "$saleDate" }
                            }
                        }
                    ],
                    salesByCategory: [
                        {
                            $group: {
                                _id: "$category",
                                revenue: { $sum: "$total" },
                                orders: { $sum: 1 }
                            }
                        }
                    ],
                    salesByRegion: [
                        {
                            $group: {
                                _id: "$region",
                                revenue: { $sum: "$total" },
                                orders: { $sum: 1 }
                            }
                        }
                    ]
                }
            }
        ]);

        const agg = result[0];
        if (!agg.totals.length) {
            console.warn(`Semana ${w._id.year}-W${w._id.week} sin ventas, se omite`);
            continue;
        }

        const totals = agg.totals[0];
        const periodKey = getPeriodKeyFromDate(totals.from); // <-- Generamos periodKey a partir de 'from'

        await SalesSnapshots.create({
            period: "weekly",
            from: totals.from,
            to: totals.to,
            periodKey, // <-- Usamos periodKey en lugar de weekLabel

            totalRevenue: totals.revenue,
            totalSales: totals.orders,
            avgTicket: totals.orders > 0 ? totals.revenue / totals.orders : 0,

            saleByCategory: agg.salesByCategory.map(c => ({
                category: c._id,
                revenue: c.revenue
            })),

            salesByRegion: agg.salesByRegion.map(r => ({
                region: r._id,
                revenue: r.revenue
            }))
        });
    }

    console.log("Snapshots semanales generados con periodKey");
    process.exit();
}

run();


