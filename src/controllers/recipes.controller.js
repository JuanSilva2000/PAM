import { getRecipeInfo } from '../middlewares/getRecipe.middleware.js';

export const getInfoById = async (req, res) => {
    const { id } = req.params;
    try {
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
        const data = await response.json()

        const meal = data.meals[0];
        //console.log(response.data);
        const { strArea, strMeal, strMealThumb, strInstructions, strYoutube } = meal;
        if (!meal) {
            return res.status(400).json({ error: "Recipe not found" });
        }
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

        res.json({ id, name: strMeal, area: strArea, img: strMealThumb, ingredients, instructions: strInstructions, ytLink: strYoutube });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};

export const getRecipeByName = async (req, res) => {
    const { name } = req.params

    try {
        const request = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`)
        const data = await request.json()

        if (!data.meals || data.meals.length === 0) {
            return res.status(401).json({ message: "No meal found with the given ID" });
        }
        const { strMeal, strMealThumb } = data.meals[0]
        return res.json({ strMeal, strMealThumb })

    } catch (error) {
        console.log(error)
    }

}

export const getCategory = async (req, res) => {
    const { category } = req.params;
    let recipes;
    try {
        if (category === 'All') {
            const recipesId = ['52978', '53049', '53071', '52855', '52776', '52785', '52907', '52791', '52802'];
            recipes = await Promise.all(
                recipesId.map(async (id_num) => {
                    const res = await getRecipeInfo(id_num);
                    const { id, name, img } = res;
                    return {
                        id, name, img
                    }
                })
            );
        } else {
            const response = await fetch(`http://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`)
            //console.log(response);
            const data = await response.json()
            recipes = data.meals.map((meal) => {
                return {
                    id: meal.idMeal,
                    name: meal.strMeal,
                    img: meal.strMealThumb
                }
            })
        }
        // console.log(data.meals[0].strMeal,data.meals[0].strMealThumb)
        res.json(recipes)

    } catch (error) {
        console.error(error)
    }
}