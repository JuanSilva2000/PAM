// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';
import "../css/components-css/SideMenu.css";

// eslint-disable-next-line react/prop-types
const SideMenu = ({ CategorySelected, setCategorySelected }) => {
  const [categories, setCategories] = useState([])

  const getCategories = async () => {
    try {
      const res = await fetch('http://localhost:3000/categories')
      const data = await res.json()
      setCategories(data)
    } catch (error) {
      console.error(error)
    }
  };

  useEffect(() => {
    getCategories()
  }, [])

  return (
    <aside className='aside-container'>
      <h1>UNI.COOK</h1>
      <ul className='categories-container'>
        {categories.map((category, index) => (
          <li 
            key={index} 
            className={CategorySelected === category ? 'selected' : ''} 
            onClick={() => setCategorySelected(category)}
          >
            {category}
          </li>
        ))}
      </ul>
    </aside>
  )
}

export default SideMenu;
