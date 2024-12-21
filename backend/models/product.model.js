import mongoose from 'mongoose';

const { Schema } = mongoose;

const productSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    author: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    sellerEmail: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    imageURL: {
        type: String,
        required: false,
    },
    stock: {
        type: Number,
        required: true,
    },
    publishedYear: {
        type: Number,
        required: true,
    },
});

export default mongoose.model('Product', productSchema);
