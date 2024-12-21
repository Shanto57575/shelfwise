import jwt from "jsonwebtoken"

const tokenGeneration = async (req, res) => {
    const userData = req.body
    const token = jwt.sign({
        data: userData
    }, process.env.ACCESS_TOKEN, { expiresIn: '7d' });
    res.send({ token })
}

export { tokenGeneration }