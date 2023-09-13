import { Category } from '../models/Categoria.js';
import { Product } from '../models/Product.js';

export async function getCategories(req, res) {
  try {
    const categories = await Category.findAll({
      attributes: ['id', 'usuarioId', 'nombre'],
      order: [['id', 'DESC']],
    });
    res.json(categories);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
}

export async function createCategory(req, res) {
  const { nombre, usuarioId } = req.body;
  try {
    const newCategory = await Category.create({
      usuarioId,
      nombre
    });
    res.json(newCategory);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
}

export async function getCategory(req, res) {
  const { id } = req.params;
  try {
    const category = await Category.findOne({
      where: { id },
    });
    return res.json(category);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
}

export async function updateCategory(req, res) {
  const { id } = req.params;

  try {
    const category = await Category.findOne({
      attributes: ['nombre', 'usuarioId'],
      where: { id },
    });

    category.set(req.body);

    await category.save();

    return res.json(category);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
}

export async function deleteCategory(req, res) {
  const { id } = req.params;
  try {
    await Product.destroy({
      where: { categoriaId: id },
    });
    await Category.destroy({
      where: { usuarioId: id },
    });
    return res.sendStatus(204);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
}
