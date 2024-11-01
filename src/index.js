import express from "express"
import cors from "cors"
import morgan from "morgan"
import router from "./routes/recipes.routes.js"

const app = express()

app.use(cors())
app.use(morgan('dev'))
app.use(express.json())

app.use(router)

const port = 3000
app.listen(port, ()=>{
    console.log(`Server running on http://localhost:${port}`)
})