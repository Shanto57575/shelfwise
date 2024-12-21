import mongoose from "mongoose";

const WishlistSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    book: {
        type: Object,
        required: true
    }
});

const Wishlist = mongoose.model("Wishlist", WishlistSchema)

export default Wishlist