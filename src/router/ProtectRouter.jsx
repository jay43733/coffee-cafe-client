import React, { Children, useEffect, useState } from "react";
import useUserStore from "../store/user-store";
import axios from "../config/axios";
import { Navigate } from "react-router-dom";
import LoadingPage from "@/pages/Loading";

const ProtectRouter = ({ element, allow }) => {
  const [isAllowed, setIsAllowed] = useState(null);
  const user = useUserStore((state) => state.user);
  useEffect(() => {
    checkRole();
  }, []);

  const checkRole = async () => {
    //Step 3
    try {
      const resp = await axios.post("/me");
      let role = resp?.data?.user?.role;

      if (allow.includes(role)) {
        setIsAllowed(true);
      } else {
        setIsAllowed(false);
      }
    } catch (error) {
      console.log(error);
      setIsAllowed(false);
    }
  };

  //Step 1
  if (isAllowed === null) {
    return <LoadingPage />;
  }

  if (!isAllowed) {
    if (user) {
      return <Navigate to="user" />;
    }
    return <Navigate to="/login" />;
  }

  return element;
};

export default ProtectRouter;
