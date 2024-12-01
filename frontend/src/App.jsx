import React, { useState,useContext } from 'react'
import SideMenu from "./components/SideMenu.jsx"
import Search from "./components/Search.jsx"
import RecipeContainer from "./components/RecipeContainer.jsx"
import { useForm } from "./hooks/useForm"
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AppState } from './components/context/AppState.jsx'
import "./css/App.css"

const App = () => {
  const [CategorySelected, setCategorySelected] = useState("All")
  const { formState, onInputChange } = useForm({ recipe: '' })


  return (
    <AppState>
      <Router>
        <div className='app-container'>
          <SideMenu 
            CategorySelected={CategorySelected} 
            setCategorySelected={setCategorySelected} 
          />


          <div className="main-container">
            <Routes>
              <Route
                path='/'
                element={
                  <>
                    <Search 
                        formState={formState} 
                        onInputChange={onInputChange} 
                        />
                    
                    <RecipeContainer 
                        recipeSearch = {formState.recipe}
                        CategorySelected={CategorySelected} 
                        setCategorySelected={setCategorySelected} 
                        />
                  </>
                }
              />
            </Routes>
          </div>
        </div>
      </Router>
    </AppState>
  )
}

export default App