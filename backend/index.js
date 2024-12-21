import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import dbConnection from './db/connectDB.js'
import authRouter from './routes/auth.routes.js'
import userRouter from './routes/user.routes.js'
import productRouter from './routes/product.routes.js'
import wishlistRouter from './routes/wishlist.routes.js'
import cartRouter from './routes/cart.routes.js'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3001

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api/auth', authRouter)
app.use('/api/user', userRouter)
app.use('/api/wish', wishlistRouter)
app.use('/api/product', productRouter)
app.use('/api/cart', cartRouter)

app.get('/', (req, res) => {
    res.send({ message: "E-commerce API is running Fine" })
})

app.listen(PORT, async () => {
    await dbConnection()
    console.log(`API is running on PORT ${PORT}`)
})