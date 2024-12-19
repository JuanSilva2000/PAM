export const getRecipeInfo = async (id) => {
    try {
        const request = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
        //console.log(request);
        const data = await request.json()
        if (!data) {
            return null;
        } 
        const { idMeal, strMeal, strMealThumb } = data.meals[0]
        return { id: idMeal, name: strMeal, img: strMealThumb };
    }catch(error){
        console.log(error)
    }

}
