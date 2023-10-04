import prisma from '../db'
import { comparePasswords, createJWT, hashPassword } from '../modules/auth'
export const createNewUser = async (req, res) => {
  const user = await prisma.user.create({
    data: {
      email: req.body.email,
      password: await hashPassword(req.body.password),
      firstName:req.body.firstName,
      lastName:req.body.lastName,
      address:req.body.address,
      phoneNumber:req.body.phoneNumber
    }
  })

  const token = createJWT(user)
  res.json({ token })
}

export const signin = async (req, res) => {
  const user = await prisma.user.findUnique({
    where: {
      email: req.body.email
    }
  })

  const isValid = await comparePasswords(req.body.password, user.password)

  if (!isValid) {
    res.status(401)
    res.json({message: 'nope'})
    return
  }

  const token = createJWT(user)
  res.json({ token })
}