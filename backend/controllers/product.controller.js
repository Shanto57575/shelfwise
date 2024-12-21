import Product from "../models/product.model.js"

const addProduct = async (req, res) => {
    const { productData } = req.body;
    const newProduct = new Product(productData);
    try {
        await newProduct.save();
        res.status(201).json({ message: "Product created successfully", product: newProduct });
    } catch (error) {
        console.error("Error creating product:", error);
        res.status(400).json({ message: "Error creating product", error });
    }
}

const getAllBooks = async (req, res) => {
    const { search, sort, category, page = 1, limit = 9 } = req.query;
    const query = {};

    if (search) {
        query.$or = [
            { title: { $regex: search, $options: "i" } },
            { author: { $regex: search, $options: "i" } },
            { publishedYear: isNaN(search) ? undefined : Number(search) }
        ];
    }

    if (category) {
        query.category = { $regex: category, $options: "i" };
    }

    const sortOptions = sort === 'asc' ? 1 : -1;
    const pageNumber = Number(page);
    const limitInNumber = Number(limit);

    try {
        const [books, totalDocuments] = await Promise.all([
            Product.find(query)
                .sort({ price: sortOptions })
                .skip((pageNumber - 1) * limitInNumber)
                .limit(limitInNumber),
            Product.countDocuments(query)
        ]);

        const BooksInfo = await Product.aggregate([
            { $match: query },
            {
                $group: {
                    _id: null,
                    categories: { $addToSet: "$category" }
                }
            }
        ]);

        const { categories = [] } = BooksInfo[0] || {};
        res.json({ books, categories, totalDocuments });
    } catch (error) {
        console.error("Error fetching books:", error);
        res.status(500).json({ message: "Failed to fetch books", error });
    }
}

const getbook = async (req, res) => {
    const id = req.params.bookId;
    try {
        const book = await Product.findById(id);
        if (!book) {
            return res.status(404).send({ message: "Book not found" });
        }
        res.status(200).json(book);
    } catch (error) {
        console.error("Error fetching book:", error);
        res.status(500).send({ message: "Error fetching book", error });
    }
}

const getProductsBySeller = async (req, res) => {
    const { email } = req.params;

    try {
        const allBooksBySeller = await Product.find({ sellerEmail: email });

        if (allBooksBySeller.length === 0) {
            return res.status(404).send({ message: "No books found for the seller" });
        }

        return res.status(200).send(allBooksBySeller);
    } catch (error) {
        console.error("Error fetching books by seller:", error);
        return res.status(500).send({ message: "Failed to fetch books by seller", error });
    }
};

const updateProduct = async (req, res) => {
    const { bookId } = req.params;
    const { updatedProductData } = req.body;

    try {
        const updateBook = await Product.findByIdAndUpdate(bookId, updatedProductData, { new: true });
        if (!updateBook) {
            return res.status(404).send({ message: "Book Not Found" });
        }
        res.send(updateBook);
    } catch (error) {
        console.error("Error updating book:", error);
        res.status(500).send({ message: "Error updating book", error });
    }
}

const deleteProduct = async (req, res) => {
    const { bookId } = req.params;

    try {
        const deleteBook = await Product.findByIdAndDelete(bookId);
        if (!deleteBook) {
            return res.status(404).send({ message: "Book Not Found" });
        }
        res.status(200).send({ message: "Book Deleted" });
    } catch (error) {
        console.error("Error deleting book:", error);
        res.status(500).send({ message: "Error deleting book", error });
    }
}

export {
    addProduct,
    getAllBooks,
    getbook,
    getProductsBySeller,
    updateProduct,
    deleteProduct
}