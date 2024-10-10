import axios from "axios";
import { create } from "zustand";
import { persist } from "zustand/middleware";

const useProductStore = create((set) => ({
  products: [],
  actionGetAllProduct: async () => {
    const resp = await axios.get("http://localhost:8080/user/product");
    // console.log(resp.data.allProduct);
    set({
      products: resp.data.allProduct,
  });
  },
}));

export default useProductStore;
