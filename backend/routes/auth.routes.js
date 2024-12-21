import express from 'express'
import { tokenGeneration } from '../controllers/auth.controller.js'

const authRouter = express.Router()

authRouter.post('/authetication', tokenGeneration)

export default authRouter