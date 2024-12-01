import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import "../css/components-css/RecipeCard.css"

const RecipeSearch = ({name,img}) => {

  return (
    <div className='card-container'>
        <div className='header-card'>
            <p>{name}</p>
            <Link to={`/recipe/${name}`}>
              <button>view</button>
            </Link>
        </div>

        <img src={img} alt="" />
    </div>
  )
}

export default RecipeSearch
