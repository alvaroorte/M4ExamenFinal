import { User } from '../models/User.js';
import { Category } from '../models/Categoria.js';
import { Product } from '../models/Product.js';
import jwt from 'jsonwebtoken';
import { token } from 'morgan';

export async function login(req, res) {
  const { correo, contrasena } = req.body;
  try {
    const user = await User.findOne({
      where: { correo, contrasena},
    });
    if (user) {
      jwt.sign( {user}, 'secretkey', (err, token) => {
        return res.json({user, token});
      })
    } else {
      return res.status(401).json({message: 'usuario incorrecto'})
    }
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
}

export async function getUsers(req, res) {
  try {
    const users = await User.findAll({
      attributes: ['id', 'nombre', 'correo', 'contrasena', 'estado'],
    });
    res.json(users);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
}

export async function createUser(req, res) {
  const { nombre, correo, contrasena, estado } = req.body;
  try {
    const newUser = await User.create(
      { 
        nombre, 
        correo, 
        contrasena, 
        estado 
      },
      {
        fields: ['nombre', 'correo', 'contrasena', 'estado'],
      }
    );
    return res.json(newUser);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
}

export async function getUser(req, res) {
  const { id } = req.params;
  try {
    const user = await User.findOne({
      where: { id },
    });
    return res.json(user);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
}

export async function updateUser(req, res) {
  const { id } = req.params;
  const { nombre, correo, contrasena, estado } = req.body;

  try {
    const user = await User.findByPk(id);
    user.nombre = nombre;
    user.correo = correo;
    user.contrasena = contrasena;
    user.estado = estado;

    await user.save();

    return res.json(user);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
}

export async function deleteUser(req, res) {
  const { id } = req.params;
  try {
    await Category.destroy({
      where: { usuarioId: id },
    });
    await Product.destroy({
      where: { usuarioId: id },
    });
    await User.destroy({
      where: { id },
    });
    return res.sendStatus(204);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
}

export async function getUserCategories(req, res) {
  const { id } = req.params;
  try {
    const tasks = await Category.findAll({
      attributes: ['id', 'usuarioId', 'nombre'],
      where: { usuarioId: id },
    });
    return res.json(tasks);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
}

export async function getUsersCategories(req, res) {
  try {
    const users = await User.findAll({
      attributes: ['id', 'nombre', 'correo', 'estado'],
      include: [
        {
          model: Category,
          attributes: ['id', 'nombre'],
          required: true,
        },
      ],
    });
    res.json(users);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
}
