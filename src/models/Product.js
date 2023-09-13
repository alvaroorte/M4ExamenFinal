import { DataTypes } from 'sequelize';
import { sequelize } from '../database/database.js';

export const Product = sequelize.define('productos',
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
      allowNull: false
    },
    precioUnitario: {
      type: DataTypes.INTEGER
    },
    estado: {
      type: DataTypes.BOOLEAN,
    },
  },
  {
    timestamps: false,
  }
);


