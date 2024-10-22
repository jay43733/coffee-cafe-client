import axios from "../config/axios";
import { create } from "zustand";
import { persist } from "zustand/middleware";

const useProductStore = create((set) => ({
  products: [],
  allProducts: [],
  currentProduct: null,
  actionGetProduct: async () => {
    const resp = await axios.get("/user/product");
    set({
      products: resp.data.allProduct,
    });
  },
  actionGetAllProduct: async () => {
    const resp = await axios.get("/user/product/all");
    set({
      allProducts: resp.data.allProduct,
    });
  },
  actionAddProduct: async (form) => {
    const resp = await axios.post("/user/product/add", form);
    set((state) => ({
      products: [{ ...resp.data }, ...state.products],
    }));
  },
  actionDeleteProduct: async (id) => {
    const resp = await axios.patch(`/user/product/delete/${id}`);

    set((state) => ({
      products: state.products.filter((item) => item.id !== id),
    }));
  },
  actionUpdateProduct: async (form, id) => {
    const resp = await axios.patch(`/user/product/update/${id}`, form);
  },
  actionReactiveProduct: async (id) => {
    const resp = await axios.patch(`/user/product/reactive/${id}`);
  },
  setCurrentProduct: (products) => {
    set({ currentProduct: products });
  },
}));

export default useProductStore;
