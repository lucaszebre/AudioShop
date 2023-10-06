import prisma  from "../db"

export const getOneOrder= async (req, res) => {
  try {
    // Check if Order Exists
    if(req.params.id){
      console.log(req.params.id)
      const order = await prisma.order.findUnique({ where: { id: req.params.id } });
      if (!order) {
        return res.status(404).json({ error: 'Order not found' });
      }else{
        res.json({data: order})

      }
    }else{
      return res.status(404).json({ error: 'Need an id' });
    }
    
  
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
 
}

export const getOrders = async (req, res) => {
  try {
    const orders = await prisma.order.findMany({
      where: {
        userId: req.user.id
      }
})
res.json({data: orders})
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
  
}
export const createOrder = async (req, res) => {
  try {
    // Validate request body
    const { price, orderStatus, method } = req.body;
    // Validate user
    const userId = req.user.id;
    const userExists = await prisma.user.findUnique({ where: { id: userId } });
    if (!userExists) {
      return res.status(400).json({ error: 'User not found' });
    }

    // Create order
    const newOrder = await prisma.order.create({
      data: {
        totalPrice: price,
        orderStatus,
        paymentMethod: method,
        userId  // Connecting the user using userId directly
      }
    });

    res.json({ data: newOrder });
  } catch (error) {
    console.error(error);  // Log the error details for debugging
    res.status(500).json({ error: 'Server error' });
  }
};

export const updateOrder = async (req, res) => {
  try {
    const { price, method, ...otherData } = req.body;
    const updateData = {
      ...otherData,
      ...(price && { totalPrice: price }),  // Use the correct field name and only add if price is provided
      ...(method && { paymentMethod: method }) // Use the correct field name and only add if method is provided
    };

    // Rest of your logic stays the same

    // Check if Order Exists
    if(req.params.id){
      console.log(req.params.id)
      const order = await prisma.order.findUnique({ where: { id: req.params.id } });
      if (!order) {
        return res.status(404).json({ error: 'Order not found' });
      }
    }else{
      return res.status(404).json({ error: 'Need an id' });
    }

    // Update Order
    const updatedOrder = await prisma.order.update({
      where: { id: req.params.id },
      data: updateData,
    });

    res.json({ data: updatedOrder });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};


export const deleteOrder = async (req, res) => {
  try {
    const deleted = await prisma.order.delete({
      where: {
        id: req.params.id
      }
    })
  
    res.json({data: deleted})
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }

  
}