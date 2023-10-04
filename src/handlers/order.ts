import prisma  from "../db"

export const getOneOrder= async (req, res) => {
  const order = await prisma.order.findUnique({
    where: {
      id: req.params.id
    }
  })

  res.json({data: order})
}

export const getOrders = async (req, res) => {
  const orders = await prisma.order.findMany({
    where: {
      userId: req.user.id
    }
  })


  res.json({data: orders})
}
export const createOrder = async (req, res) => {
  

  const order = await prisma.order.findUnique({
    where: {
      id: req.body.orderId
    }
  })

  if (!order) {
    // does not belong to user
    return res.json({message: 'nope'})
  }

  const newOrder = await prisma.order.create({
    data: {
      totalPrice:req.body.price,
      orderStatus:req.body.orderStatus,
      paymentMethod:req.body.method,
      user: {connect: {id: order.id}}
    }
  })

  res.json({data: newOrder})
}

export const updateOrder = async (req, res) => {
  
  const updatedUpdate = await prisma.order.update({
    where: {
      id: req.params.id
    },
    data: req.body
  })

  res.json({data: updatedUpdate})
}

export const deleteOrder = async (req, res) => {

  const deleted = await prisma.order.delete({
    where: {
      id: req.params.id
    }
  })

  res.json({data: deleted})
}