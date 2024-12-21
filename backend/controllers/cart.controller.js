import Cart from "../models/cart.model.js";
import Product from "../models/product.model.js";

const addToCart = async (req, res) => {
    try {
        const { userId, book } = req.body
        const bookExist = await Product.findById(book._id);
        if (!bookExist) {
            return res.status(404).send({ message: "Book Not Found" });
        }
        const isAlreadyInCart = await Cart.findOne({ user: userId, "book._id": book._id });
        if (isAlreadyInCart) {
            return res.status(409).send({ message: "Book is already in the Cart" });
        }

        const cartBook = new Cart({
            user: userId,
            book,
        });

        await cartBook.save();
        return res.send({ message: "New book added to cart" });
    } catch (error) {
        console.error(error);
        return res.status(500).send({ message: "Error occurred while adding to Cart", error: error.message });
    }

}

const removeFromCart = async (req, res) => {
    const { bookId } = req.params
    try {
        const response = await Cart.findOneAndDelete({ "book._id": bookId })
        if (!response) {
            res.send({ message: "Book Not Found" })
        }
        res.send({ message: "Book Removed successfully" })
    } catch (error) {
        res.send({ message: "Failed to remove from cart" })
    }
}

const getAllCartItems = async (req, res) => {
    try {
        const allItems = await Cart.find({})
        if (!allItems) {
            return res.send({ message: "Failed fetch All cart items" })
        }
        res.send(allItems)
    } catch (error) {
        return res.send({ message: "Failed fetch All cart items" })
    }
}

export { addToCart, removeFromCart, getAllCartItems }