import React from 'react'
import RecipeCard from "./RecipeCard"
import "../css/components-css/RecipeContainer.css"

const RecipeContainer = () => {
    const nameRecipe = "Arrabiata"
    const arrayTemp = [1, 2, 3, 4, 5, 6, 7, 8, 9]

    return (
        <main className='recipes-container'>
            {arrayTemp.map((card,index) => (
                <RecipeCard
                    key={index}
                    name={nameRecipe}
                />
            ))}
        </main>
    )
}

export default RecipeContainer