import User from "../models/user.model.js";
import bcrypt from "bcrypt";

const createUser = async (req, res) => {
    const { name, email, password, role, status } = req.body.userData;

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User with this email already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            name,
            email,
            password: hashedPassword,
            role,
            status,
        });

        await newUser.save();

        res.status(201).json({
            message: 'User created successfully',
            user: newUser,
        });
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ message: 'Failed to create user', error: error.message });
    }
};

const getUser = async (req, res) => {
    const email = req.params.email;
    try {
        const user = await User.findOne({ email }).select('-password');
        if (!user) {
            return res.status(404).send({ message: "User Not Found" });
        }
        res.send(user);
    } catch (error) {
        console.error("Error fetching user:", error);
        return res.status(500).json({ message: `${error.message}` });
    }
};

const removeUser = async (req, res) => {
    const { userId } = req.params;
    try {
        const user = await User.findByIdAndDelete(userId);
        if (!user) {
            return res.status(404).send({ message: "User Not Found" });
        }
        res.send({ message: "User deleted successfully" });
    } catch (error) {
        console.error("Error deleting user:", error);
        return res.status(500).json({ message: `${error.message}` });
    }
};

const updateUser = async (req, res) => {
    const { userId } = req.params;
    const { status, role } = req.body;

    try {
        const updatedFields = {};

        if (status) {
            updatedFields.status = status;
        }

        if (role) {
            updatedFields.role = role;
        }

        const user = await User.findByIdAndUpdate(userId, updatedFields, { new: true });

        if (!user) {
            return res.status(404).send({ message: "User Not Found" });
        }

        res.send({ message: "User updated successfully", user });
    } catch (error) {
        console.error("Error updating user:", error);
        return res.status(500).json({ message: `${error.message}` });
    }
};

const getAllUser = async (req, res) => {
    try {
        const users = await User.find({}).select('-password');
        if (!users || users.length === 0) {
            return res.status(404).send({ message: "Users Not Found" });
        }
        res.send(users);
    } catch (error) {
        console.error("Error fetching users:", error);
        return res.status(500).json({ message: `${error.message}` });
    }
};

export {
    getUser,
    createUser,
    getAllUser,
    removeUser,
    updateUser
};
