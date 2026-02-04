import { create } from "zustand";
import axiosInstance from "../lib/axios";
import toast from "react-hot-toast";

export const useProductStore = create((set, get) => ({
  products: [],
  loading: false,
  setProducts: (products) => set({ products }),

  createProduct: async (productData) => {
    set({ loading: true });
    try {
      const res = await axiosInstance.post("/products", productData);

      set((prevState) => ({
        products: [...prevState.products, res.data.product],
        loading: false,
      }));
      toast.success("Product created successfully");
    } catch (error) {
      set({ loading: false });
      toast.error(error.response.data.error || "An Error Occurred, Try later");
    }
  },

  fetchAllProducts: async () => {
    set({ loading: true });

    try {
      const response = await axiosInstance.get("/products");

      set({ products: response.data.products, loading: false });
    } catch (error) {
      toast.error(error.response.data.error || "Failed to fetch products");
      set({ error: "Failed to fetch products", loading: false });
    }
  },

  deleteProduct: async (productId) => {
    set({ loading: true });
    try {
      const response = await axiosInstance.delete(`/products/${productId}`);

      set((prevState) => ({
        products: prevState.products.filter((product) => product._id !== productId),
        loading: false,
      }));
      toast.success(response.data.message);
    } catch (error) {
      set({ loading: false });
      toast.error(error.response.data.error || "Error deleting product");
    }
  },
  toggleFeaturedProduct: async (productId) => {
    set({ loading: true });

    try {
      const response = await axiosInstance.patch(`/products/${productId}`);

      set((prevState) => ({
        products: prevState.products.map((product) => {
          if (product._id === productId) {
            return { ...product, isFeatured: !product.isFeatured };
          }
          return product;
        }),
        loading: false,
      }));
      toast.success(response.data.message);
    } catch (error) {
      set({ loading: false });
      toast.error(
        error.response.data.error || "Error changing featured status",
      );
    }
  },
}));
