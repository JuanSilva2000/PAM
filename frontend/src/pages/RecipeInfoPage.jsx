import { useEffect, useContext, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import '../css/components-css/RecipeViewer.css';
import AppContext from '../components/context/AppContext';
import { useRecipes } from '../context/RecipesContext';
import { Assistant } from '../components/Assistant';

const RecipeInfoPage = () => {
    const { isMenu, setIsMenu } = useContext(AppContext)
    const { getOneRecipe } = useRecipes();

    const { id } = useParams()
    const [recipeData, setrecipeData] = useState({
        name: '',
        instrucciones: '',
        youtube: '',
        ingredientes: '',
        img: ''
    })

    useEffect(() => {
        setIsMenu(false)
        getAllinfo()
        if (isMenu) {
            setIsMenu(false)
        }
        getAllinfo()
        return () => {
            setIsMenu(true)
        }
    }, [])

    const getAllinfo = async () => {
        const { name, instructions, ytLink, ingredients, img } = await getOneRecipe(id);
        console.log({ name, instructions, ytLink, ingredients, img });
        setrecipeData({
            name: name,
            instrucciones: instructions,
            youtube: ytLink,
            ingredientes: ingredients,
            img: img
        });
    }

    return (
        <div className="info-container">
            <p>
                <Link to='/' className='back-link'>Volver</Link>
            </p>
            <h1 className="mark">{recipeData.name}</h1>

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
                        src={`https://www.youtube.com/embed/${recipeData.youtube ? recipeData.youtube.split("v=")[1] : " "}`}
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
                        name={recipeData.name}
                    />
                </div>

            </div>
        </div>
    )
}

export default RecipeInfoPage;