import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
    {
        title: { type: String, required: true },
        price: { type: Number, required: true },
        description: { type: String, required: true },
        images: [{ type: String, required: true }],
        category: { type: String, required: true },
        brand: { type: String, required: true },
        rating: { type: Number, required: true, default: 0 },
        reviewCount: { type: Number, required: true, default: 0 },
        stock: { type: Number, required: true, default: 10 },
    },
    { timestamps: true }
);

productSchema.index({ title: "text", category: "text", brand: "text" });

const Product = mongoose.model("Product", productSchema);
export default Product;
