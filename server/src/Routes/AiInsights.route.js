import express from "express"
import { getAiInsights } from "../Controller/AiInsights.controller.js"

const router = express.Router()

router.get("/", getAiInsights)



export default router