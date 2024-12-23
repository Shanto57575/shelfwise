import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import dbConnection from './db/connectDB.js';
import authRouter from './routes/auth.routes.js';
import userRouter from './routes/user.routes.js';
import productRouter from './routes/product.routes.js';
import wishlistRouter from './routes/wishlist.routes.js';
import cartRouter from './routes/cart.routes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

const allowedOrigins = [
    'https://e-commerce-5e036.web.app',
    'http://localhost:5173'
];

const corsOptions = {
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
};

app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/auth', authRouter);
app.use('/api/user', userRouter);
app.use('/api/wish', wishlistRouter);
app.use('/api/product', productRouter);
app.use('/api/cart', cartRouter);

app.get('/', (req, res) => {
    res.send({ message: 'E-commerce API is running fine' });
});

app.listen(PORT, async () => {
    try {
        await dbConnection();
        console.log(`API is running on PORT ${PORT}`);
    } catch (error) {
        console.error('Database connection failed:', error.message);
        process.exit(1);
    }
});
