export const getAllInfo = async (req, res) => {
    const { nameRecipe } = req.params

    try {
        const request = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${nameRecipe}`)
        const data = await request.json()

            const meal = data.meals[0]
      
            const ingredients = []
            for (let i = 1; i <= 20; i++) {
                const ingredient = meal[`strIngredient${i}`]
                const measure = meal[`strMeasure${i}`]
                if (ingredient && ingredient.trim() !== "") {
                    ingredients.push({
                        ingredient: ingredient.trim(),
                        measure: measure ? measure.trim() : "",
                    })
                }
            }
            const img = meal['strMealThumb']

            const response = {
                instructions: meal.strInstructions,
                youtubeLink: meal.strYoutube,
                ingredients,
                img: img
            }

           res.json(response)
      
    } catch (error) {
        console.error(error)
    }
}
