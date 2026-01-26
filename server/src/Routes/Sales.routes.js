import express from "express"
import { summary } from "../Controller/Sales.controller.js"



const router = express.Router()

router.get("/", summary)


export default router