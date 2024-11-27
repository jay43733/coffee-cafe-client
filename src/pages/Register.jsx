import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import chocolateDrink from "../assets/chocolate-drink.svg";
import Input from "../components/Input";
import PrimaryButton from "../components/Button/PrimaryButton";
import SecondaryButton from "../components/Button/SecondaryButton";
import Heading from "../components/Typography/Heading";
import useUserStore from "../store/user-store";
import validator from "../utils/validator";
import { toast } from "react-toastify";

const Register = () => {
  //From Zustand
  const actionRegister = useUserStore((state) => state.actionRegister);

  const navigate = useNavigate();
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const initialForm = {
    firstName: "",
    lastName: "",
    phoneNumber: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const hdlChangeForm = (e) => {
    // console.log(e.target.name, e.target.value);
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const hdlSubmitForm = (e) => {
    e.preventDefault();

    //1 Validate form with Joi
    const error = validator.validateRegister(form);
    if (error) {
      return setFormError(error);
    }

    //2 Post with Axios to Front-end
    actionRegister(form);
    setForm(initialForm);
    toast.success("Register Successfully");
    setFormError(initialForm);
    navigate("/login");
  };

  const [formError, setFormError] = useState({});

  function hdlGotoLogin() {
    navigate("/login");
  }

  return (
    <div className="flex p-10 w-[94%] h-full bg-white rounded-[64px] shadow-lg">
      <div className="flex flex-col gap-6 justify-center items-center flex-1">
        <img src={chocolateDrink} alt="chocolate-drink" className="w-[100px]" />
        <Heading
          text="Coffee Cafe"
          fontSize="56"
          fontWeight="bold"
          color="brown"
        />
      </div>
      <form
        onSubmit={hdlSubmitForm}
        className="flex flex-col gap-4 px-7 py-6 max-w-[800px] flex-1"
      >
        <div>
          <Input
            label="Firstname"
            placeholder="Firstname"
            name="firstName"
            value={form.firstName}
            onChange={hdlChangeForm}
          />
          {formError.firstName && (
            <span className="text-[#EC0357] text-[14px] font-normal">
              {formError.firstName}
            </span>
          )}
        </div>
        <div>
          <Input
            label="Lastname"
            placeholder="Lastname"
            name="lastName"
            value={form.lastName}
            onChange={hdlChangeForm}
          />
          {formError.lastName && (
            <span className="text-[#EC0357] text-[14px] font-normal">
              {formError.lastName}
            </span>
          )}
        </div>
        <div>
          <Input
            label="Phone number (optional)"
            placeholder="08X-XXX-XXXX"
            name="phoneNumber"
            value={form.phoneNumber}
            onChange={hdlChangeForm}
          />
          {formError.phoneNumber && (
            <span className="text-[#EC0357] text-[14px] font-normal">
              {formError.phoneNumber}
            </span>
          )}
        </div>
        <div>
          <Input
            label="Email"
            placeholder="coffeecafe@gmail.com"
            name="email"
            value={form.email}
            onChange={hdlChangeForm}
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
            label="Password"
            placeholder="Password"
            name="password"
            value={form.password}
            onChange={hdlChangeForm}
          />
          {formError.password && (
            <span className="text-[#EC0357] text-[14px] font-normal">
              {formError.password}
            </span>
          )}
        </div>
        <div>
          <Input
            type="password"
            label="Confirm Password"
            placeholder="Type Password Again"
            name="confirmPassword"
            value={form.confirmPassword}
            onChange={hdlChangeForm}
          />
          {formError.confirmPassword && (
            <span className="text-[#EC0357] text-[14px] font-normal">
              {formError.confirmPassword}
            </span>
          )}
        </div>

        <PrimaryButton type="submit" text="CONFIRM" />
        <SecondaryButton text="BACK" func={hdlGotoLogin} />
      </form>
    </div>
  );
};

export default Register;
