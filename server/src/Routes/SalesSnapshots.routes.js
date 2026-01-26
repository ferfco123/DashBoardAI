import express from "express"
import { getAllSnapshots, getLabels, getSnapshots } from "../Controller/SalesSnapshots.controller.js"

const router = express.Router()

router.get("/labels", getLabels)
router.get("/snapshots", getSnapshots)
router.get("/allsnapshots", getAllSnapshots)

export default router