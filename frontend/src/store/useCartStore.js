import { create } from "zustand";
import api from "../services/api";
import { toast } from "react-hot-toast";

export const useCartStore = create((set, get) => ({
    cart: { items: [] },
    loading: false,

    fetchCart: async () => {
        try {
            const { data } = await api.get("/cart");
            set({ cart: data });
        } catch (error) {
            console.error("Fetch cart error", error);
        }
    },

    addToCart: async (productId, quantity = 1) => {
        set({ loading: true });
        try {
            const { data } = await api.post("/cart", { productId, quantity });
            set({ cart: data, loading: false });
            toast.success("Added to cart!");
        } catch (error) {
            set({ loading: false });
            toast.error("Failed to add to cart");
        }
    },

    updateQuantity: async (productId, quantity) => {
        if (quantity < 1) return get().removeFromCart(productId);
        
        try {
            const { data } = await api.put(`/cart/${productId}`, { quantity });
            set({ cart: data });
        } catch (error) {
            toast.error("Failed to update quantity");
        }
    },

    removeFromCart: async (productId) => {
        try {
            const { data } = await api.delete(`/cart/${productId}`);
            set({ cart: data });
            toast.success("Item removed");
        } catch (error) {
            toast.error("Failed to remove item");
        }
    },

    clearCart: async () => {
        try {
            await api.delete("/cart");
            set({ cart: { items: [] } });
        } catch (error) {
            console.error("Failed to clear cart");
        }
    },

    cartTotals: () => {
        const { cart } = get();
        if (!cart.items) return { itemsPrice: 0, taxPrice: 0, totalPrice: 0 };
        
        const itemsPrice = cart.items.reduce((acc, item) => acc + (item.product?.price || 0) * item.quantity, 0);
        const taxPrice = Number((0.15 * itemsPrice).toFixed(2));
        const totalPrice = Number((itemsPrice + taxPrice).toFixed(2));

        return { itemsPrice: itemsPrice.toFixed(2), taxPrice, totalPrice };
    }
}));
