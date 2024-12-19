import { Link } from 'react-router-dom'
import "../css/components-css/RecipeCard.css"

const RecipeCard = ({ recipe }) => {
  const { id, name, img } = recipe;

  const handleAddFavorite = () => {
  };

  return (
    <div className='card-container'>
      <div className='header-card'>
        <p>{name}</p>
        <Link to={`/recipes/${id}`}>
          <button>view</button>
        </Link>
      </div>

      <img src={img} alt={name} />
      <button onClick={handleAddFavorite} className='fav-button'>{
        "Add to Favorites"
      }</button>

    </div>
  )
}

export default RecipeCard
