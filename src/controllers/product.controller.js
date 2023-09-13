import { Product } from '../models/Product.js';

export async function getProducts(req, res) {
  try {
    const products = await Product.findAll({
      attributes: ['id', 'nombre', 'correo', 'estado'],
      order: [['id', 'DESC']],
    });
    res.json(products);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
}

export async function createProduct(req, res) {
  const { nombre, precioUnitario, estado, userId, categoriaId } = req.body;
  try {
    const newProduct = await Product.create({
      nombre, 
      precioUnitario, 
      estado, 
      userId, 
      categoriaId
    });
    res.json(newProduct);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
}

export async function getProduct(req, res) {
  const { id } = req.params;
  try {
    const product = await Product.findOne({
      where: { id },
    });
    return res.json(product);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
}

export async function updateProduct(req, res) {
  const { id } = req.params;

  try {
    const product = await Product.findOne({
      attributes: ['nombre', 'userId'],
      where: { id },
    });

    product.set(req.body);

    await product.save();

    return res.json(product);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
}

export async function deleteProduct(req, res) {
  const { id } = req.params;
  try {
    await Product.destroy({
      where: { userId: id },
    });
    return res.sendStatus(204);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
}
