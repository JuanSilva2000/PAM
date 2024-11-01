import React from 'react'
import "../css/components-css/RecipeCard.css"

const RecipeCard = ({name}) => {
  return (
    <div className='card-container'>
        <div className='header-card'>
            <p>{name}</p>
            <button>view</button>
        </div>

        <img src="/img/arrabiata-example.jpg" alt="" />
    </div>
  )
}

export default RecipeCard
