import { DataTypes } from 'sequelize';
import { sequelize } from '../database/database.js';

const FavoriteRecipes = sequelize.define('FavoriteRecipes', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'users', // Cambia esto al nombre real de tu tabla de usuarios
            key: 'id',
        },
    },
    recipe_id: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    tableName: 'favorite_recipes', // Nombre de la tabla en la base de datos
    timestamps: false, // Cambia a true si deseas manejar `createdAt` y `updatedAt`
});

export default FavoriteRecipes;
