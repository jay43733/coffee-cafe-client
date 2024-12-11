import axios from "../config/axios";
export const saveOrder = async (payload) => {
  console.log(payload);
  return await axios.post("/order/add", payload);
};
