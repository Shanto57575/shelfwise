import express from 'express'
import { addToWishlist, getAllWishlistBooks, removeFromWishlist, wishlistBooksByIds } from '../controllers/wishlist.controller.js'
import { verifyBuyer, verifyJWT } from '../middlewares/tokenVerification.js'

const wishlistRouter = express.Router()

wishlistRouter.post('/add-wishlist', verifyJWT, verifyBuyer, addToWishlist); // Add a book to wishlist (POST)
wishlistRouter.post('/wishlist-Ids', verifyJWT, verifyBuyer, wishlistBooksByIds); // Get wishlist books by IDs (POST)
wishlistRouter.get('/all-wishlist-books', verifyJWT, verifyBuyer, getAllWishlistBooks); // Get all wishlist books (GET)
wishlistRouter.delete('/:bookId', verifyJWT, verifyBuyer, removeFromWishlist); // Remove a book from wishlist (DELETE)

export default wishlistRouter