import express from "express"
import cors from "cors"
import morgan from "morgan"

const app = express()

app.use(cors())
app.use(morgan('dev'))
app.use(express.json())


const port = 3000
app.listen(port, ()=>{
    console.log(`Server running on http://localhost:${port}`)
})