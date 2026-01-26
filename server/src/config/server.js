import app from "../../index.js"
import { connection } from "./db.connection.js"
import "../cron/snapshots.cron.js"


const port = process.env.PORT || 5000


app.listen(port, () => {
    console.log("port", port)
    connection()
    console.log("Backend is connected")
})