import Product from "../models/Product.js";

// @desc    Fetch all products with pagination and filtering
// @route   GET /api/products
// @access  Public
export const getProducts = async (req, res) => {
    try {
        const pageSize = Number(req.query.limit) || 12;
        const page = Number(req.query.page) || 1;

        const keyword = req.query.keyword
            ? {
                  $or: [
                      { title: { $regex: req.query.keyword, $options: "i" } },
                      { category: { $regex: req.query.keyword, $options: "i" } },
                      { brand: { $regex: req.query.keyword, $options: "i" } },
                  ]
              }
            : {};

        const category = req.query.category 
            ? { category: { $regex: `^${req.query.category}$`, $options: "i" } } 
            : {};

        let sort = {};
        if (req.query.sort) {
            if (req.query.sort === "price_asc") sort = { price: 1 };
            if (req.query.sort === "price_desc") sort = { price: -1 };
            if (req.query.sort === "rating") sort = { rating: -1 };
        }

        const query = { ...keyword, ...category };

        const count = await Product.countDocuments(query);
        const products = await Product.find(query)
            .sort(sort)
            .limit(pageSize)
            .skip(pageSize * (page - 1));

        res.json({ products, page, pages: Math.ceil(count / pageSize), count });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Fetch single product
// @route   GET /api/products/:id
// @access  Public
export const getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (product) {
            res.json(product);
        } else {
            res.status(404).json({ message: "Product not found" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Smart Search for products
// @route   GET /api/products/search/suggestions
// @access  Public
export const getSearchSuggestions = async (req, res) => {
    try {
        const keyword = req.query.q;
        if (!keyword) return res.json([]);

        // We try text search first, but if it fails or returns 0, we fallback.
        let products = [];
        try {
            products = await Product.find(
                { $text: { $search: keyword } },
                { score: { $meta: "textScore" } }
            )
                .sort({ score: { $meta: "textScore" } })
                .limit(5)
                .select("title _id category images price");
        } catch(err) {
            // Text index might not exist, ignore and use regex
            products = [];
        }

        // Fallback to regex if text search yields nothing
        if (products.length === 0) {
            const regexProducts = await Product.find({
                $or: [
                    { title: { $regex: keyword, $options: "i" } },
                    { category: { $regex: keyword, $options: "i" } },
                    { brand: { $regex: keyword, $options: "i" } },
                ],
            })
                .limit(5)
                .select("title _id category images price");
            return res.json(regexProducts);
        }

        res.json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get categories
// @route   GET /api/products/info/categories
// @access  Public
export const getCategories = async (req, res) => {
    try {
        const categories = await Product.distinct("category");
        res.json(categories);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
