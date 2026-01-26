import express from "express"
import { summary } from "../Controller/Analytics.controller.js"

const route = express.Router()
route.get("/summary", summary)

export default route