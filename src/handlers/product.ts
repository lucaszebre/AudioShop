import prisma from "../db"

// Get all
export const getProducts = async (req, res) => {
  try {
    const products = await prisma.product.findMany()
    res.json({ data: products })
  } catch (error) {
    res.status(500).send(error.message)
  }
}

// Get one
export const getOneProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await prisma.product.findUnique({ where: { id } })
    if (!product) return res.status(404).send('Product not found')
    res.json({ data: product })
  } catch (error) {
    res.status(500).send(error.message)
  }
}

// Create one
export const createProduct = async (req, res) => {
  const { name, description,price,stock } = req.body;
  if (!name || !description) return res.status(400).send('Invalid input');
  
  try {
    const product = await prisma.product.create({
      data: { name, description ,price,stock }
    })
    res.json({ data: product })
  } catch (error) {
    res.status(500).send(error.message)
  }
}

// Update one
export const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  if (!name) return res.status(400).send('Invalid input');
  
  try {
    const updated = await prisma.product.update({
      where: { id },
      data: { name }
    })
    res.json({ data: updated })
  } catch (error) {
    res.status(500).send(error.message)
  }
}

// Delete one
export const deleteProduct = async (req, res) => {
  const { id } = req.params;
  
  try {
    const deleted = await prisma.product.delete({ where: { id } })
    res.json({ data: deleted })
  } catch (error) {
    res.status(500).send(error.message)
  }
}

