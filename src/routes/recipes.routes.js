import { Router } from "express"
import {getCategories} from "../controllers/recipesController.js"

const router = Router()

router.get("/",(req,res)=>{
    res.send("Testing")
})

router.get("/categories", getCategories)



export default router