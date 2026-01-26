import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import SalesRoute from "./src/Routes/Sales.routes.js"
import SalesSnapshotsRoute from "./src/Routes/SalesSnapshots.routes.js"
import AiInsightsRoute from "./src/Routes/AiInsights.route.js"
import AnalyticsRoute from "./src/Routes/Analytics.route.js"



const app = express()

dotenv.config()
app.set("trust proxy", 1);
app.use(cors());
app.use(express.json())






app.use("/api/sales", SalesRoute)
app.use("/api/salesSnapshots", SalesSnapshotsRoute)
app.use("/api/aiInsights", AiInsightsRoute)
app.use("/api/analytics", AnalyticsRoute)




export default app