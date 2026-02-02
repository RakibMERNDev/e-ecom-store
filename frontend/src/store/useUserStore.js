import { create } from "zustand";
import axiosInstance from "../lib/axios";

import { toast } from "react-hot-toast";

export const useUserStore = create((set, get) => ({
  user: null,
  loading: false,
  checkAuth: true,

  signup: async ({ name, email, password, confirmPassword }) => {
    set({ loading: true });

    if (password !== confirmPassword) {
      set({ loading: false });
      return toast.error("Passwords do not match");
    }

    try {
      const res = await axiosInstance.post("/auth/signup", {
        name,
        email,
        password,
      });
      set({ user: res.data.user, loading: false });

      return toast.success("User created successfully");
    } catch (error) {
      set({ loading: false });
      return toast.error(
        error.response.data.message || "An Error Occurred, Try later",
      );
    }
  },

  login: async ({ email, password }) => {
    set({ loading: true });

    try {
      const res = await axiosInstance.post("/auth/login", { email, password });
      set({ user: res.data.user, loading: false });

      return toast.success("User logged in successfully");
    } catch (error) {
      set({ loading: false });
      return toast.error(
        error.response.data.message || "An Error Occurred, Try later",
      );
    }
  },
}));
