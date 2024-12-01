export const getCategory = async (req, res) => {
    const {category} = req.params

    try {
        const response = await fetch(`http://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`)
        const data = await response.json()

        const recipes = data.meals.map((meal) => {
            return {
                name: meal.strMeal,
                img: meal.strMealThumb
            }
        })
        
        // console.log(data.meals[0].strMeal,data.meals[0].strMealThumb)


        res.json(recipes)

    } catch (error) {
        console.error(error)
    }
}



