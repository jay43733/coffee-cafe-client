import axios from "../config/axios";
import { toast } from "react-toastify";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

const useUserStore = create(
  persist(
    (set) => ({
      user: null,
      token: null,
      allUser: [],
      currentUser: null,
      actionRegister: async (form) => {
        try {
          const resp = await axios.post("/register", form);

          console.log(resp, "Register");
          // toast.success(resp.data.message);
        } catch (error) {
          console.log(error);
          // toast.error(error.message);
        }
      },
      actionLogin: async (form) => {
        try {
          const resp = await axios.post("/login", form);

          toast.success(`Welcome ${resp.data.user.firstName}`);
          set({
            user: resp?.data.user,
            token: resp?.data.accessToken,
          });
          return "success";
        } catch (error) {
          console.log(error?.response?.data);
          toast.error(error?.response?.data.error);
        }
      },

      actionLogout: () => {
        localStorage.clear();
        set({ user: null, token: null });
      },
      actionEditProfile: async (form) => {
        try {
          const resp = await axios.patch("/edit", form);

          set((state) => ({
            user: { ...resp?.data?.newProfile },
          }));
        } catch (error) {
          console.log(error);
        }
      },
      actionGetAllUSer: async () => {
        try {
          const resp = await axios.get("/getAllUser");
          set({ allUser: resp.data.allUser });
        } catch (error) {
          console.log(error);
        }
      },
      actionChangeRole: async (id, body) => {
        try {
          const resp = await axios.patch(`/role/${id}`, body);
        } catch (error) {
          console.log(error);
        }
      },
      actionDeleteUser: async (id) => {
        try {
          const resp = await axios.patch(`/delete/${id}`);
        } catch (error) {
          console.log(error);
        }
      },
      actionActivateUser: async (id) => {
        try {
          const resp = await axios.patch(`/activateUser/${id}`);
        } catch (error) {
          console.log(error);
        }
      },

      setCurrentUser: (user) => {
        set({ currentUser: user });
      },
    }),
    {
      name: "coffee-cafe-store",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ user: state.user, token: state.token }),
    }
  )
);

export default useUserStore;
