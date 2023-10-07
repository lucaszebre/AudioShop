import express from 'express'
import router from './routerPrivate'
import morgan from 'morgan'
import cors from 'cors'
import { protect } from './modules/auth'
import { createNewUser, signin } from './handlers/user'
import { getProducts,getOneProduct } from './handlers/product'
import routerer from './routerPublic'
const app = express()

app.use(cors())
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({extended: true}))



app.use( protect, router)
// app.post('/register', createNewUser)
// app.post('/login', signin)
app.use(routerer)
app.use((err, req, res, next) => {
  console.log(err)
  res.json({message: `had an error: ${err.message}`})
})

export default app