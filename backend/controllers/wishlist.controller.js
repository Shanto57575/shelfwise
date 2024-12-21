import Product from "../models/product.model.js"
import User from "../models/user.model.js"
import Wishlist from "../models/wishlist.model.js"

const addToWishlist = async (req, res) => {
    const { userId, book } = req.body;
    try {
        const userExist = await User.findById(userId);
        if (!userExist) {
            return res.status(404).send({ message: "User Not Found" });
        }

        const bookExist = await Product.findById(book._id);
        if (!bookExist) {
            return res.status(404).send({ message: "Book Not Found" });
        }

        const isAlreadyInWishlist = await Wishlist.findOne({ user: userId, "book.id": book.id });
        if (isAlreadyInWishlist) {
            return res.status(409).send({ message: "Book is already in the wishlist" });
        }

        const wishlistBook = new Wishlist({
            user: userId,
            book,
        });

        await wishlistBook.save();
        return res.send({ message: "New book added to wishlist" });
    } catch (error) {
        console.error(error);
        return res.status(500).send({ message: "Error occurred while adding to wishlist", error: error.message });
    }
};

const removeFromWishlist = async (req, res) => {
    const { bookId } = req.params;
    try {
        const book = await Wishlist.findOneAndDelete({ "book._id": bookId });
        if (!book) {
            return res.status(404).send({ message: "Book not found" });
        }
        return res.status(200).json({ message: "Book removed from wishlist" });
    } catch (error) {
        console.error("Error:", error);
        return res.status(500).send({ message: "Internal server error" });
    }
};

const getAllWishlistBooks = async (req, res) => {
    try {
        const allBooks = await Wishlist.find({})
        res.send(allBooks)
    } catch (error) {
        return res.status(500).json({ messsage: "Failed to get the wishlist books" })
    }
}

const wishlistBooksByIds = async (req, res) => {
    const { bookIds } = req.body;

    try {
        const allBooks = await Product.find({ _id: { $in: bookIds } })
        res.send(allBooks)
    } catch (error) {
        return res.status(500).json({ messsage: "Failed to get the wishlist books" })
    }
}

export {
    addToWishlist,
    removeFromWishlist,
    getAllWishlistBooks,
    wishlistBooksByIds
}