import express from "express"
import cors from "cors"
import morgan from "morgan"
import cookieParser from "cookie-parser";
import recipesRoutes from "./routes/recipes.routes.js"
import favoritesRoutes from "./routes/favorites.routes.js"
import chatRoutes from "./routes/chat.routes.js"
import authRoutes from "./routes/auth.routes.js";
import { sequelize } from "./database/database.js";
import { FRONTEND_URL } from "./config.js";

const app = express()

app.use(cors({
    origin: FRONTEND_URL,
    credentials: true,
}))
app.use(cookieParser());
app.use(morgan('dev'))
app.use(express.json())

app.use("/api/auth", authRoutes);
app.use("/api", recipesRoutes);
app.use("/api", favoritesRoutes);
app.use("/api", chatRoutes);

await sequelize.sync({force: false});

const port = 4000
app.listen(port, ()=>{
    console.log(`Server running on http://localhost:${port}`)
})