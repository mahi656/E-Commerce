import express from "express";
import { getProducts, getProductById, getSearchSuggestions, getCategories } from "../controllers/productController.js";

const router = express.Router();

router.get("/search/suggestions", getSearchSuggestions);
router.get("/info/categories", getCategories);
router.get("/", getProducts);
router.get("/:id", getProductById);

export default router;
