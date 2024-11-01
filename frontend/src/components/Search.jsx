import React from 'react'
import { useForm } from '../hooks/useForm'
import "../css/components-css/Search.css"

const Search = () => {
    const initialForm = {
        recipe: ''
    }

    const {formState,onInputChange} = useForm(initialForm)

    const {recipe} = formState

    const onSubmit = (e) => {
        e.preventDefault()
        console.log(formState)
    }

  return (
    <form onSubmit={onSubmit} className='form-container'>
        <div className='input-container'>
            <input
                type='text'
                className='input-recipe'
                name = "recipe"
                placeholder='Type a recipe ...'
                value={recipe}
                onChange={onInputChange}
            />
        </div>
    </form>
  )
}

export default Search