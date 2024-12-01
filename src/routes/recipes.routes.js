import { Router } from "express"
import {getCategory} from "../controllers/getCategory.js"
import { getRecipeInfo } from "../controllers/getRecipeInfo.js"

const router = Router()

router.get("/",(req,res)=>{
    res.send("Testing")
})

router.get("/recipesCategories/:category", getCategory)

router.get("/recipeInfo/:name",getRecipeInfo)

export default router