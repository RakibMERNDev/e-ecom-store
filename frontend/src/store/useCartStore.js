import { create } from "zustand";
import axiosInstance from "../lib/axios";

import { toast } from "react-hot-toast";

export const useCartStore = create((set, get) => ({
  cart: [],
  coupon: null,
  total: 0,
  subtotal: 0,

  getCartItems: async () => {
    try {
      const response = await axiosInstance.get("/cart");
      set({ cart: response.data.cart });
    } catch (error) {
      set({ cart: [] });
      toast.error(error.response.data.error || "Failed to fetch cart items");
    }
  },

  addToCart: async (product) => {
    try {
      await axiosInstance.post("/cart", { productId: product._id });
      toast.success("Product added to cart successfully");

      set((prevState) => {
        const existingItem = prevState.cart.find(
          (item) => item._id === product._id,
        );

        const newCart = existingItem
          ? prevState.cart.map((item) =>
              item._id === product._id
                ? { ...item, quantity: item.quantity + 1 }
                : item,
            )
          : [...prevState.cart, { ...product, quantity: 1 }];
        return { cart: newCart };
      });
    } catch (error) {
      toast.error(error.response.data.error || "Failed to add to cart");
    }
  },
}));
