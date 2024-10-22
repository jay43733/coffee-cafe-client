import axios from "../config/axios";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

const useCartStore = create((set) => ({
    carts: [],
    currentCart: null,
    currentItem: null,
    setCurrentItem : (item) =>{
      set({currentItem: item})
    },
    actionAddCart: async (form) => {
      const resp = await axios.post("/cart/add", form);
      set((state) => ({
        carts: [{ ...resp.data }, ...state.carts],
      }));
    },
    actionGetCart: async () => {
      const resp = await axios.get("/cart/getCart");
      // console.log(resp)
      set({ carts: resp.data.getCart });
    },
    actionDeleteCart: async ( id) => {
      const resp = await axios.delete(`/cart/${id}`);
      set((state) => ({
        carts: state.carts.filter((item) => item.id !== id),
      }));
    },
    actionDeleteAllCart: async (id) => {
      const resp = await axios.delete(
        `/cart/deleteCart/${id}`
      );
  
    },
    actionUpdateCart: async (form, id) => {
      // console.log(form);
      const resp = await axios.patch(`/cart/${id}`, form);
    },
    setCurrentCart: (carts) => {
      set({ currentCart: carts });
    },
  }))
;

export default useCartStore;
