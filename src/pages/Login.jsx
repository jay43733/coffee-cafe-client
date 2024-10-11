import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import chocolateDrink from "../assets/chocolate-drink.svg";
import Input from "../components/Input";
import PrimaryButton from "../components/Button/PrimaryButton";
import SecondaryButton from "../components/Button/SecondaryButton";
import Heading from "../components/Typography/Heading";
import useUserStore from "../store/user-store";
import validator from "../utils/validator"

const Login = () => {
  const actionLogin = useUserStore((state) => state.actionLogin);
  const navigate = useNavigate();

  const initialForm = {
    email: "",
    password: "",
  };

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [formError, setFormError] = useState({});

  const hdlChangeLogin = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  // console.log(form);

  const hdlSubmit = async (e) => {
    e.preventDefault();
    //Validate User
    const error = validator.validateLogin(form);
    if (error) {
      return navigate("/login")
    }

    //Send to Front
    await actionLogin(form);
    // res === "success" ? navigate("/user") : '';
    setForm(initialForm);
    
    navigate("/user")
  };

  function hdlGotoRegister() {
    navigate("/register");
  }

  return (
    <div className="flex flex-col p-20 w-full h-full min-w-[1000px] bg-white gap-6 rounded-[64px] shadow-lg">
      <div className="py-4 flex flex-col gap-6 items-center">
        <img src={chocolateDrink} alt="chocolate-drink" className="w-[100px]" />
        <Heading
          text="Coffee Cafe"
          fontSize="56"
          fontWeight="bold"
          color="brown"
        />
        <form
          className="flex flex-col gap-6 w-full max-w-[800px] px-60"
          onSubmit={hdlSubmit}
        >
          <div>
            <Input
              label="Email"
              name="email"
              placeholder="coffeecafe@gmail.com"
              value={form.email}
              onChange={hdlChangeLogin}
            />
            {formError.email && (
              <span className="text-[#EC0357] text-[14px] font-normal">
                {formError.email}
              </span>
            )}
          </div>
          <div>
            <Input
              type="password"
              name="password"
              label="Password"
              placeholder="Password"
              value={form.password}
              onChange={hdlChangeLogin}
            />
            {formError.password && (
              <span className="text-[#EC0357] text-[14px] font-normal">
                {formError.password}
              </span>
            )}
          </div>
          <PrimaryButton text="LOG IN" />
          <SecondaryButton text="REGISTER" func={hdlGotoRegister} />
        </form>
      </div>
    </div>
  );
};

export default Login;
