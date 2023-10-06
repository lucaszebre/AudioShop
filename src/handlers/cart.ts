import prisma from "../db";

export const addItemToCart = async (req, res) => {
    const { userId, productId, quantity } = req.body;
  
    try {
      const newItem = await prisma.cart.create({
        data: {
          userId,
          productId,
          quantity
        }
      });
  
      res.json({ data: newItem });
    } catch (error) {
      res.status(500).send(error.message);
    }
  };
  

export const getUserCart = async (req, res) => {
    const { userId } = req.params;
  
    try {
      const cartItems = await prisma.cart.findMany({
        where: { userId: userId },
        include: { product: true }
      });
  
      res.json({ data: cartItems });
    } catch (error) {
      res.status(500).send(error.message);
    }
  }

  export const updateCartItem = async (req, res) => {
    const { cartId } = req.params;
    const { quantity } = req.body;
  
    try {
      const updatedItem = await prisma.cart.update({
        where: { id: cartId },
        data: { quantity }
      });
  
      res.json({ data: updatedItem });
    } catch (error) {
      res.status(500).send(error.message);
    }
  };

  export const removeItemFromCart = async (req, res) => {
    const { cartId } = req.params;
  
    try {
      const deletedItem = await prisma.cart.delete({
        where: { id: cartId }
      });
  
      res.json({ data: deletedItem });
    } catch (error) {
      res.status(500).send(error.message);
    }
  };
  
  export const clearUserCart = async (req, res) => {
    const { userId } = req.params;
  
    try {
      await prisma.cart.deleteMany({
        where: { userId: userId }
      });
  
      res.json({ data: "All items removed from cart." });
    } catch (error) {
      res.status(500).send(error.message);
    }
  };
  