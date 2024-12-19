import { createContext, useContext, useState } from "react";
import {
  addFavoriteRequest,
  deleteFavoriteRequest,
  getFavoritesRequest
} from "../api/favorites";

const FavoritesContext = createContext();

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context) throw new Error("useFavorites must be used within a FavoriteProvider");
  return context;
};

export function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState([]);

  const getFavorites = async () => {
    try {
      const res = await getFavoritesRequest();
      const favoritesList = res.data;
      //console.log(favoritesList, "api favs");
      setFavorites(favoritesList);
    } catch (error) {
      console.error("Error fetching favorites:", error);
    }
  };

  const deleteFavorite = async (id) => {
    try {
      const res = await deleteFavoriteRequest(id);
      if (res.status === 204 || res.status === 200) {
        setFavorites(favorites.filter((favorite) => favorite.id !== id));
      }
    } catch (error) {
      console.error("Error deleting favorite:", error);
    }
  };

  const addFavorite = async (favorite) => {
    console.log(favorite)
    try {
      const res = await addFavoriteRequest(favorite);
      //console.log("Favorite created:", res.data);
      setFavorites((prevFavorites) => [...prevFavorites, res.data]);
    } catch (error) {
      console.error("Error creating favorite:", error);
    }
  };

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        getFavorites,
        deleteFavorite,
        addFavorite,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}
