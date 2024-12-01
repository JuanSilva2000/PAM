import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import "../css/components-css/RecipeCard.css"

const RecipeCard = ({name}) => {
  const [recipes, setRecipes] = useState({
    name: '',
    img: ''
  })

  const getRecipesInfo= async () => {
    try {
      const res = await fetch(`http://localhost:3000/recipeInfo/${name}`)
      const data = await res.json()
      const {strMeal, strMealThumb} = data
      setRecipes({
        name: strMeal,
        img: strMealThumb
      })

    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    getRecipesInfo()
  }, [])

  return (
    <div className='card-container'>
        <div className='header-card'>
            <p>{recipes.name}</p>
            <Link to={`/recipe/${recipes.name}`}>
              <button>view</button>
            </Link>
        </div>

        <img src={recipes.img} alt="" />
    </div>
  )
}

export default RecipeCard
