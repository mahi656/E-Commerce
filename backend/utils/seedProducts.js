import axios from "axios";
import Product from "../models/Product.js";

const fetchFakeStoreProducts = async () => {
    try {
        const { data } = await axios.get("https://fakestoreapi.com/products");
        return data.map((item) => ({
            title: item.title,
            price: item.price,
            description: item.description,
            images: [item.image],
            category: item.category,
            brand: "Generic", // Fake store doesn't have brands
            rating: item.rating?.rate || 0,
            reviewCount: item.rating?.count || 0,
            stock: Math.floor(Math.random() * 100) + 10, // Simulated stock
        }));
    } catch (error) {
        console.error("Error fetching FakeStore APIs:", error.message);
        return [];
    }
};

const fetchDummyJsonProducts = async () => {
    try {
        const { data } = await axios.get("https://dummyjson.com/products?limit=100");
        return data.products.map((item) => ({
            title: item.title,
            price: item.price,
            description: item.description,
            images: item.images.length > 0 ? item.images : [item.thumbnail],
            category: item.category,
            brand: item.brand || "Generic",
            rating: item.rating || 0,
            reviewCount: Math.floor(Math.random() * 500) + 10, // Simulated count
            stock: item.stock || 10,
        }));
    } catch (error) {
        console.error("Error fetching DummyJSON APIs:", error.message);
        return [];
    }
};

const seedProducts = async () => {
    try {
        const count = await Product.countDocuments();
        if (count === 0) {
            console.log("No products found in DB. Seeding products...");
            const [fakeStoreProducts, dummyJsonProducts] = await Promise.all([
                fetchFakeStoreProducts(),
                fetchDummyJsonProducts(),
            ]);

            const allProducts = [...fakeStoreProducts, ...dummyJsonProducts];
            await Product.insertMany(allProducts);
            console.log(`Successfully seeded ${allProducts.length} products.`);
        } else {
            console.log("Products already exist in DB. Skipping seeding.");
        }
    } catch (error) {
        console.error("Error seeding products:", error.message);
    }
};

export default seedProducts;
