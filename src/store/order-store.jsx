import axios from "../config/axios";
import { QrCode } from "lucide-react";
import { toast } from "react-toastify";
import { create } from "zustand";

const useOrderStore = create((set) => ({
  orders: [],
  allOrders: [],
  currentOrder: null,
  actionAddOrder: async (form) => {
    console.log(form,"sdsdsdsd")
    try {
      const resp = await axios.post("/order/add", form,{
        headers: {"Content-Type":"multipart/form-data"}
      });
      set((state) => ({
        orders: [{ ...resp.data }, ...state.orders],
      }));
    } catch (error) {
      console.log(error);
    }
  },
  actionGetOrder: async () => {
    try {
      const resp = await axios.get("/order/getOrder");
      set({ orders: resp.data.allOrder });
    } catch (error) {
      console.log(error);
    }
  },

  actionGetAllOrder: async () => {
    try {
      const resp = await axios.get("/order/getAllOrder");
      set({ allOrders: resp.data.allOrder });
    } catch (error) {
      console.log(error);
    }
  },
  actionGetOrderItemById: async (orderId) => {
    try {
      const resp = await axios.get(`/order/getOrder/${orderId}`);
      return resp.data.orderItem;
    } catch (error) {
      console.log(error);
    }
  },
  actionConfirmOrder: async (orderId) => {
    try {
      const resp = await axios.patch(`/order/confirmOrder/${orderId}`);
      toast.success("Order Completed !");
    } catch (error) {
      toast.error(error.response.data.error);
    }
  },
  actionCancelOrder: async (orderId) => {
    try {
      const resp = await axios.patch(`/order/cancelOrder/${orderId}`);
      console.log(resp);
    } catch (error) {
      toast.error(error.response.data.error);
    }
  },
}));

export default useOrderStore;
