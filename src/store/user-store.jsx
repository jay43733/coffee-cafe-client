import axios from "axios";
import { toast } from "react-toastify";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

const useUserStore = create(
  persist(
    (set) => ({
      user: null,
      token: null,
      actionRegister: async (form) => {
        try {
          const resp = await axios.post("http://localhost:8080/register", form);
          console.log(resp, "Register");
          // toast.success(resp.data.message);
        } catch (error) {
          console.log(error);
          // toast.error(error.message);
        }
      },
      actionLogin: async (form) => {
        try {
          const resp = await axios.post("http://localhost:8080/login", form);
          console.log(resp.data.user, "Login");

          toast.success(`Welcome ${resp.data.user.user.firstName}`);
          set({
            user: resp.data.user,
            token: resp.data.accessToken,
          });
          return "success";
        } catch (error) {
          console.log(error.response.data);
          toast.error(error.response.data.error);
        }
      },

      actionLogout: () => {
        localStorage.clear();
        set({ user: null, token: null });
      },
      actionEditProfile: async (form, token) => {
        try {
          const resp = await axios.patch("http://localhost:8080/edit", form, {
            headers: { Authorization: `Bearer ${token}` },
          });
          // console.log(resp.data.newProfile, "resp")
          set((state) => ({
            user: { ...resp.data?.newProfile },
          }));
        } catch (error) {
          console.log(error);
        }
      },
    }),
    {
      name: "coffee-cafe-store",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useUserStore;
