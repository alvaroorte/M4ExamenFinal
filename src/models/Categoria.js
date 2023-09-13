import { DataTypes } from 'sequelize';
import { sequelize } from '../database/database.js';
import { Product } from './Product.js';

export const Category = sequelize.define('categorias', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    //autoIncrement: false,
    //defaultValue: () => { }
    //allowNull: false
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
  }
},
{
  timestamps: false,
});

Category.hasMany(Product, {
  foreignKey: 'categoriaId',
  sourceKey: 'id',
});

Product.belongsTo(Category, {
  foreignKey: 'categoriaId',
  targetKey: 'id',
});