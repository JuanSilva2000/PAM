export const getRecipeInfo = async(req,res) => {
    const {name} = req.params
    
    try {
        const request = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`)
        const data = await request.json()

        const { strMeal, strMealThumb } = data.meals[0]
        return res.json({ strMeal, strMealThumb })

    } catch(error){
        console.log(error)
    }

}

