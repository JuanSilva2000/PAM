import { Link } from 'react-router-dom'
import "../css/components-css/RecipeCard.css"
import { useFavorites } from '../context/FavoritesContext'

const RecipeCard = ({ recipe }) => {
  const { id, name, img } = recipe;
  const { favorites, addFavorite, deleteFavorite } = useFavorites();
  const favoritesId = favorites.map((recipe) => recipe.id);

  const handleAddFavorite = () => {
    if (favoritesId.includes(id)) {
      deleteFavorite(id);
    } else {
      addFavorite(id);
    }
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
        !favoritesId.includes(id) ? "Add to Favorites" : "Delete from Favorites"
      }</button>

    </div>
  )
}

export default RecipeCard;