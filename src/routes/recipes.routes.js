import { Router } from "express"
import {getCategory} from "../controllers/getCategory.js"
import { getRecipeInfo } from "../controllers/getRecipeInfo.js"
import { getAllInfo } from "../controllers/getAllInfo.js"

const router = Router()

router.get("/",(req,res)=>{
    res.send("Testing")
})

router.get("/recipesCategories/:category", getCategory)

router.get("/recipeInfo/:name",getRecipeInfo)

router.get("/allInfo/:nameRecipe", getAllInfo)

export default router