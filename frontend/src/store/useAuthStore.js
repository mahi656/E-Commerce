import { create } from "zustand";
import api from "../services/api";

export const useAuthStore = create((set) => ({
    userInfo: JSON.parse(localStorage.getItem("userInfo")) || null,
    loading: false,
    error: null,
    
    login: async (email, password) => {
        set({ loading: true, error: null });
        try {
            const { data } = await api.post("/auth/login", { email, password });
            localStorage.setItem("userInfo", JSON.stringify(data));
            set({ userInfo: data, loading: false });
        } catch (error) {
            set({ error: error.response?.data?.message || "Login failed", loading: false });
            throw error;
        }
    },

    register: async (name, email, password) => {
        set({ loading: true, error: null });
        try {
            const { data } = await api.post("/auth/register", { name, email, password });
            localStorage.setItem("userInfo", JSON.stringify(data));
            set({ userInfo: data, loading: false });
        } catch (error) {
            set({ error: error.response?.data?.message || "Register failed", loading: false });
            throw error;
        }
    },

    logout: () => {
        localStorage.removeItem("userInfo");
        set({ userInfo: null });
    }
}));
