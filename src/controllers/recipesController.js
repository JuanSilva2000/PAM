export const getCategories = async (req, res) => {
    try {
        const request = await fetch("https://www.themealdb.com/api/json/v1/1/categories.php")
        const data = await request.json()

        const IDs = ["10", "13", "6", "8", "3", "12"]

        const filteredCategories = data.categories
            .filter(category => IDs.includes(category.idCategory))
            .map(category => category.strCategory)

        filteredCategories.unshift("All")
        res.json(filteredCategories)

    } catch (error) {
        console.error(error)
    }
}



