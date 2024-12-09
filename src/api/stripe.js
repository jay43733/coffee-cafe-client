import axios from "../config/axios";
export const saveOrder = async (payload) => {
  return axios.post("/order/add", payload);
};
