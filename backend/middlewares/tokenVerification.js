import jwt from "jsonwebtoken"
import User from "../models/user.model.js"

const verifyJWT = async (req, res, next) => {
    const authorization = req.headers.authorization
    if (!authorization) {
        return res.status(401).send({ message: "unauthorized access" })
    }
    const token = authorization.split(" ")[1]
    if (!token) {
        return res.status(401).send({ message: "unauthorized access" })
    }
    jwt.verify(token, process.env.ACCESS_TOKEN, (err, decoded) => {
        if (err) {
            return res.status(500).send({ message: "Invalid Token" })
        }
        req.decoded = decoded
        next()
    })
}

const verifySeller = async (req, res, next) => {
    const email = req.decoded.data.email
    const query = { email: email }
    const user = await User.findOne(query)
    if (user?.role !== 'seller') {
        return res.status(403).send({ message: "Forbidden Access" })
    }
    next()
}

const verifyBuyer = async (req, res, next) => {
    const email = req.decoded.data.email
    const query = { email: email }
    const user = await User.findOne(query)
    if (user?.role !== 'buyer') {
        return res.status(403).send({ message: "Forbidden Access" })
    }
    next()
}

const verifyAdmin = async (req, res, next) => {
    const email = req.decoded.data.email
    const query = { email: email }
    const user = await User.findOne(query)
    if (user?.role !== 'admin') {
        return res.status(403).send({ message: "Forbidden Access" })
    }
    next()
}

export {
    verifyJWT,
    verifySeller,
    verifyBuyer,
    verifyAdmin
}