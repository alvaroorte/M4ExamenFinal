import { DataTypes } from 'sequelize';
import { sequelize } from '../database/database.js';
import { Category } from './Categoria.js';
import { Product } from './Product.js';

export const User = sequelize.define('usuarios',
  {
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
      comment: 'nombre del usuario',
    },
    correo: {
      type: DataTypes.STRING,
      allowNull: false,
      comment: 'correo del usuario',
    },
    contrasena: {
      type: DataTypes.STRING,
      comment: 'contraseña del usuario',
    },
    estado: {
      type: DataTypes.BOOLEAN,
    },
  },
  {
    timestamps: false,
  }
);

User.hasMany(Category, {
  foreignKey: 'usuarioId',
  sourceKey: 'id',
});

Category.belongsTo(User, {
  foreignKey: 'usuarioId',
  targetKey: 'id',
});

User.hasMany(Product, {
  foreignKey: 'usuarioId',
  sourceKey: 'id',
});

Product.belongsTo(User, {
  foreignKey: 'usuarioId',
  targetKey: 'id',
});
