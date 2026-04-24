import User from "../models/User.js";

export const getWishlist = async (req, res) => {
    try {
        const user = await User.findById(req.user._id).populate("wishlist");
        if (user) {
            res.json(user.wishlist);
        } else {
            res.status(404).json({ message: "User not found" });
        }
    } catch (error) {
        console.error("GET wishlist error:", error);
        res.status(500).json({ message: error.message });
    }
};

export const addToWishlist = async (req, res) => {
    try {
        const { productId } = req.params;
        const user = await User.findByIdAndUpdate(
            req.user._id,
            { $addToSet: { wishlist: productId } },
            { new: true }
        ).populate("wishlist");

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.json(user.wishlist);
    } catch (error) {
        console.error("POST wishlist error:", error);
        res.status(500).json({ message: error.message });
    }
};

export const removeFromWishlist = async (req, res) => {
    try {
        const { productId } = req.params;
        const user = await User.findByIdAndUpdate(
            req.user._id,
            { $pull: { wishlist: productId } },
            { new: true }
        ).populate("wishlist");

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.json(user.wishlist);
    } catch (error) {
        console.error("DELETE wishlist error:", error);
        res.status(500).json({ message: error.message });
    }
};
