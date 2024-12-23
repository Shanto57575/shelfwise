import express from 'express'
import {
    addProduct,
    deleteProduct,
    getAllBooks,
    getbook,
    getProductsBySeller,
    updateProduct
} from '../controllers/product.controller.js'

import { verifyJWT, verifySeller } from '../middlewares/tokenVerification.js'

const productRouter = express.Router()

productRouter.post('/add-product', verifyJWT, verifySeller, addProduct);
productRouter.get('/all-products', getAllBooks);
productRouter.get('/seller/:email', verifyJWT, verifySeller, getProductsBySeller);
productRouter.get('/:bookId', getbook);
productRouter.put('/:bookId', verifyJWT, verifySeller, updateProduct);
productRouter.delete('/:bookId', verifyJWT, verifySeller, deleteProduct);

export default productRouter