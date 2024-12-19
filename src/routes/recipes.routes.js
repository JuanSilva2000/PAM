import { Router } from "express"
import {  getCategory, getRecipeByName, getInfoById } from "../controllers/recipes.controller.js"

const router = Router()

router.get("/",(req,res)=>{
    res.send("Testing")
})

router.get("/recipesCategories/:category", getCategory)
//router.get("/recipesCategories/:category", getCategory)

router.get("/recipeInfo/:name", getRecipeByName)

router.get("/recipes/:id", getInfoById)

//router.get("/allInfo/:nameRecipe", getAllInfo)

export default router