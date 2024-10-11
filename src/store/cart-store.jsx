import axios from "axios";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

const useCartStore = create(
  persist((set) => ({
    carts: [],
    currentCart: null,
    actionAddCart: async (form, token) => {
      const resp = await axios.post("http://localhost:8080/cart/add", form, {
        headers: { Authorization: `Bearer ${token}` },
      });
      set((state) => ({
        carts: [{ ...resp.data }, ...state.carts],
      }));
    },
    actionGetCart: async (token) => {
      const resp = await axios.get("http://localhost:8080/cart/getCart", {
        headers: { Authorization: `Bearer ${token}` },
      });
      // console.log(resp)
      set({ carts: resp.data.getCart });
    },
    actionDeleteCart: async (token, id) => {
      const resp = await axios.delete(`http://localhost:8080/cart/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      set((state) => ({
        carts: state.carts.filter((item) => item.id !== id),
      }));
    },
    actionUpdateCart: async (form, token, id) => {
      console.log(form)
      const resp = await axios.patch(`http://localhost:8080/cart/${id}`, form, {
        headers: { Authorization: `Bearer ${token}` },
      });
    },
    setCurrentCart: (carts) => {
      set({ currentCart: carts });
    },
  }))
);

export default useCartStore;
