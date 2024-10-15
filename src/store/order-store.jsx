import axios from "axios";
import { QrCode } from "lucide-react";
import { create } from "zustand";

const useOrderStore = create((set) => ({
  orders: [],
  currentOrder: null,
  actionAddOrder: async (form, token) => {
    try {
      const resp = await axios.post("http://localhost:8080/order/add", form, {
        headers: { Authorization: `Bearer ${token}` },
      });
      set((state) => ({
        orders: [{ ...resp.data }, ...state.orders],
      }));
    } catch (error) {
      console.log(error);
    }
  },
  actionGetOrder: async (token) => {
    try {
      const resp = await axios.get("http://localhost:8080/order/getOrder", {
        headers: { Authorization: `Bearer ${token}` },
      });
      set({ orders: resp.data.allOrder });
    } catch (error) {
      console.log(error);
    }
  },
  actionGetOrderItemById: async (orderId, token) => {
    try {
      const resp = await axios.get(
        `http://localhost:8080/order/getOrder/${orderId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return resp.data.orderItem;
    } catch (error) {
      console.log(error);
    }
  },
}));

export default useOrderStore;
