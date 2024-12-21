import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ['buyer', 'seller', 'admin'],
        default: "buyer"
    },
    status: {
        type: String,
        enum: ['active', 'pending'],
        required: true
    },
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

export default User;
