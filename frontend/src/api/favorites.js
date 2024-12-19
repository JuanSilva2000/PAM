import axios from "../api/axios";

export const getFavoritesRequest = async () => axios.get("/favorites");

export const addFavoriteRequest = async (favorite) => axios.post("/favorites", {recipe_id: favorite});

export const deleteFavoriteRequest = async (id) => axios.delete(`/favorites/${id}`);
