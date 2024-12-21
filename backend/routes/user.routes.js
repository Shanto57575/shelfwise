import express from 'express'
import { createUser, getAllUser, getUser, removeUser, updateUser } from '../controllers/user.controller.js'
import { verifyAdmin, verifyJWT } from '../middlewares/tokenVerification.js'

const userRouter = express.Router()

userRouter.post('/create-user', createUser); // Create a user (POST)
userRouter.get('/all-users', verifyJWT, verifyAdmin, getAllUser); // Get all users (GET)
userRouter.get('/get-user/:email', verifyJWT, getUser); // Get a specific user by email (GET)
userRouter.put('/:userId', verifyJWT, verifyAdmin, updateUser); // Update a specific user by ID (PUT)
userRouter.delete('/:userId', verifyJWT, verifyAdmin, removeUser); // Delete a specific user by ID (DELETE)

export default userRouter