import { create } from "zustand";
import api from "../services/api";
import { toast } from "react-hot-toast";

export const useWishlistStore = create((set, get) => ({
    wishlist: [],
    loading: false,

    fetchWishlist: async () => {
        try {
            const { data } = await api.get("/wishlist");
            set({ wishlist: data });
        } catch (error) {
            console.error("Fetch wishlist error", error);
            // Don't show toast on fetch error to avoid spamming if not logged in
        }
    },

    toggleWishlist: async (product) => {
        const { wishlist } = get();
        const isInWishlist = wishlist.some((item) => item._id === product._id);
        
        try {
            if (isInWishlist) {
                const { data } = await api.delete(`/wishlist/${product._id}`);
                set({ wishlist: data });
                toast.success("Removed from wishlist");
            } else {
                const { data } = await api.post(`/wishlist/${product._id}`);
                set({ wishlist: data });
                toast.success("Added to wishlist");
            }
        } catch (error) {
            const message = error.response?.data?.message || "Failed to update wishlist";
            toast.error(message);
        }
    },

    isInWishlist: (productId) => {
        const { wishlist } = get();
        return wishlist.some((item) => item._id === productId);
    }
}));
