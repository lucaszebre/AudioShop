import prisma  from "../db"

export const getOneOrderItem= async (req, res) => {
  const orderItem = await prisma.orderItem.findUnique({
    where: {
      id: req.params.id
    }
  })

  res.json({data: orderItem})
}

export const getOrderItems = async (req, res) => {
  const orderItems = await prisma.orderItem.findMany({
    where: {
      orderId: req.body.id
    }
  })


  res.json({data: orderItems})
}
export const createOrderItem = async (req, res) => {
  
    const { productId,connectId } = req.body;

  const orderItem = await prisma.orderItem.findUnique({
    where: {
      id: req.body.orderItemId
    }
  })

  if (!orderItem) {
    // does not belong to user
    return res.json({message: 'nope'})
  }

  const neworderItem = await prisma.orderItem.create({
    data: {
        quantity:req.body.quantity,
        price:req.body.price,
        order:{connect:{id:connectId}},
        product:{connect:{id:productId}}
    }
  })

  res.json({data: neworderItem})
}

export const updateOrderItem = async (req, res) => {
  
  const updatedUpdate = await prisma.orderItem.update({
    where: {
      id: req.params.id
    },
    data: req.body
  })

  res.json({data: updatedUpdate})
}

export const deleteOrderItem = async (req, res) => {

  const deleted = await prisma.orderItem.delete({
    where: {
      id: req.params.id
    }
  })

  res.json({data: deleted})
}