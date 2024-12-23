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

    // Build query more efficiently
    if (search) {
        query.$or = [
            { title: new RegExp(search, 'i') },
            { author: new RegExp(search, 'i') }
        ];
        if (!isNaN(search)) query.$or.push({ publishedYear: Number(search) });
    }

    if (category) {
        query.category = new RegExp(category, 'i');
    }

    try {
        // Single aggregation pipeline instead of multiple queries
        const pipeline = [
            { $match: query },
            {
                $facet: {
                    books: [
                        { $sort: { price: sort === 'asc' ? 1 : -1 } },
                        { $skip: (Number(page) - 1) * Number(limit) },
                        { $limit: Number(limit) }
                    ],
                    totalDocuments: [
                        { $count: 'count' }
                    ],
                    categories: [
                        { $group: { _id: null, categories: { $addToSet: '$category' } } }
                    ]
                }
            }
        ];

        const [result] = await Product.aggregate(pipeline);

        res.json({
            books: result.books,
            categories: result.categories[0]?.categories || [],
            totalDocuments: result.totalDocuments[0]?.count || 0
        });
    } catch (error) {
        console.error("Error fetching books:", error);
        res.status(500).json({ message: "Failed to fetch books", error });
    }
};

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
