// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import "./css/App.css";
import SideMenu from "./components/SideMenu.jsx";
import Search from "./components/Search.jsx";
import RecipeContainer from "./components/RecipeContainer.jsx";

const App = () => {

  const [CategorySelected, setCategorySelected] = useState("All");


  return (
    <div className="app-container">
      <SideMenu
        CategorySelected={CategorySelected}
        setCategorySelected={setCategorySelected}
      />

      <div className="main-container">
        <Search />
        <RecipeContainer />
      </div>
    </div>
  );
}

export default App;
