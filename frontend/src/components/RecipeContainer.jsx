import { useState, useEffect, useContext } from 'react'
import RecipeCard from "./RecipeCard"
//import SearchCard from "./SearchCard"
import "../css/components-css/RecipeContainer.css"
import { useRecipes } from '../context/RecipesContext'
import AppContext from './context/AppContext'

const RecipeContainer = ({ recipeSearch = '', CategorySelected, setCategorySelected }) => {
    const [recipesSearched, setRecipesSearched] = useState({
        name: '',
        img: ''
    })
    const { isMenu, setIsMenu } = useContext(AppContext);
    const { recipes, getRecipesByCategory, getRecipeByName } = useRecipes();

    useEffect(() => {
        if (!isMenu) {
            setIsMenu(true)
        }
        if (recipeSearch === '') {
            setRecipesSearched({
                name: '',
                img: ''
            });
        } else {
            const getRecipeSearched = async () => {
                const recipe = await getRecipeByName(recipeSearch);
                const { strMeal, strMealThumb } = recipe;
                setRecipesSearched({
                    name: strMeal,
                    img: strMealThumb
                });
            }

            const handleEnter = (e) => {
                if (e.key === 'Enter') {
                    getRecipeSearched()
                }
            }

            window.addEventListener('keydown', handleEnter)

            return () => {
                window.removeEventListener('keydown', handleEnter)
            }
        }

    }, [recipeSearch]);

    useEffect(() => {
        getRecipesByCategory(CategorySelected);
    }, [CategorySelected]);

    if (recipeSearch === '' && CategorySelected === 'All') {
        return (
            <main className='recipes-container'>
                {
                    recipes.map((recipe, index) => (
                        <RecipeCard
                            key={index}
                            recipe={recipe}
                        />
                    ))
                }
            </main>
        )
    } else if (recipeSearch !== '') {
        setCategorySelected('All');
        return (
            <main className='recipes-container'>
                <RecipeCard recipe={recipesSearched} />
            </main>
        );
    } else {
        return (
            <main className='recipes-container'>
                {recipes.map((o, index) => (
                    <RecipeCard key={index} recipe={o} />
                ))}
            </main>
        )
    }
}

export default RecipeContainer;