import React, { useContext, useEffect, useState } from 'react'
import AppContext from '../components/context/AppContext'
import "../css/components-css/SideMenu.css"

const SideMenu = ({ CategorySelected, setCategorySelected }) => {

  const categories = ['All', 'Dessert', 'Pasta', 'Seafood', 'Starter', 'Vegetarian', 'Breakfast']

  const {isMenu} = useContext(AppContext)


  const showMenu = ()=> {
    document.querySelector('.categories-container').classList.toggle('active')
  }

  return (
    <aside className={`aside-container ${isMenu? '' : 'hide'}`}>
      <h1>UNI.COOK</h1>
      <button className="hamburger-menu" onClick={showMenu}>☰</button>
      <ul className='categories-container'>

        {categories.map((category, index) => (
          <li
            key={index}
            className={CategorySelected === category ? 'selected' : ''}
            onClick={() => {
              setCategorySelected(category)
            }}
          >
            {category}
          </li>
        ))}
      </ul>
    </aside>
  )
}

export default SideMenu
