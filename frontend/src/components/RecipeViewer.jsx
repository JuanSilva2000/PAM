import React, { useEffect, useContext, useState } from 'react'
import { useParams } from 'react-router-dom'
import AppContext from '../components/context/AppContext'
import '../css/components-css/RecipeViewer.css'
import { Assistant } from './Assistant'

const RecipeViewer = () => {
  const { isMenu, setIsMenu } = useContext(AppContext)

  const { name } = useParams()
  const [recipeData, setrecipeData] = useState({
    instrucciones: '',
    youtube: '',
    ingredientes: '',
    img: ''
  })

  useEffect(() => {
    if (isMenu) {
      setIsMenu(false)
    }

    getAllinfo()
    return () => {
      setIsMenu(true)
    }
  }, [])

  const getAllinfo = async () => {
    try {
      const res = await fetch(`http://localhost:3000/allInfo/${name}`)
      const data = await res.json()

      const { instructions, youtubeLink, ingredients, img } = data
      setrecipeData({
        instrucciones: instructions,
        youtube: youtubeLink,
        ingredientes: ingredients,
        img: img
      })

      console.log(recipeData)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className="recipe-container">
      <h1 className="mark">{name}</h1>

      <div className="recipe-container">
        <img src={recipeData.img} alt="" />

        <div className="recipe-ingredients">
          <h3>Ingredients</h3>
          <ul>
            {recipeData.ingredientes && recipeData.ingredientes.map((item, index) => (
              <li key={index}>
                {item.measure} {item.ingredient}
              </li>
            ))}
          </ul>
        </div>

        <div className="recipe-instructions">
          <h3>Instructions:</h3>
          <p>{recipeData.instrucciones}</p>
        </div>

        <div className="recipe-video">
          <h3>Video</h3>
          <iframe
            width="560"
            height="315"
            src={`https://www.youtube.com/embed/${recipeData.youtube.split("v=")[1]}`}
            title="YouTube video player"
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen>
          </iframe>
          <a href={recipeData.youtube}>
            Ver en YouTube
          </a>
        </div>

        <div className='recipe-assistant'>
            <Assistant
              name={name}
            />
        </div>      

      </div>
    </div>
  )
}

export default RecipeViewer