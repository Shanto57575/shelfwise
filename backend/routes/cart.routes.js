import express from 'express';
import { verifyJWT, verifyBuyer } from '../middlewares/tokenVerification.js';
import { addToCart, getAllCartItems, removeFromCart } from '../controllers/cart.controller.js';

const cartRouter = express.Router();

cartRouter.delete('/:bookId', verifyJWT, verifyBuyer, removeFromCart);
cartRouter.post('/add-cart', verifyJWT, verifyBuyer, addToCart);
cartRouter.get('/all-cart', verifyJWT, verifyBuyer, getAllCartItems);

export default cartRouter;
