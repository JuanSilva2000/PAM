// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import "./css/App.css";
import SideMenu from "./components/SideMenu.jsx";

const App = () => {

  const [CategorySelected, setCategorySelected] = useState("All");


  return (
    <div className="app-container">
      <SideMenu 
        CategorySelected={CategorySelected} 
        setCategorySelected={setCategorySelected} 
      /> 
    </div>
  );
}

export default App;
