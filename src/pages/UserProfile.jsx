import React, { useState } from "react";
import Input from "../components/Input";
import PrimaryButton from "../components/Button/PrimaryButton";
import chocolateDrink from "../assets/chocolate-drink.svg";
import Heading from "../components/Typography/Heading";
import useUserStore from "../store/user-store";
import validator from "../utils/validator";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import SecondaryButton from "../components/Button/SecondaryButton";

const UserProfile = () => {
  const user = useUserStore((state) => state.user);
  const actionEditProfile = useUserStore((state) => state.actionEditProfile);

  const navigate = useNavigate();
  // console.log(user);
  const [form, setForm] = useState({
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    phoneNumber: user?.phoneNumber || "",
  });

  const hdlChangeForm = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const hdlSubmit = async (e) => {
    e.preventDefault();
    const error = validator.validateEditProfile(form);
    if (error) {
      return setFormError(error);
    }
    await actionEditProfile(form);
    setFormError(null)
    setIsActive(false)
    toast.success("Edit Profile Successfully");
  };

  const [isActive, setIsActive] = useState(false);
  const [formError, setFormError] = useState({});

  return (
    <div className="h-full flex justify-start pl-12 flex-[0.6] items-start">
      <div className="min-w-[1148px] flex-col px-10 py-10 bg-white rounded-[64px] flex">
        <div className="flex flex-col gap-6 justify-center items-center flex-1">
          <img
            src={chocolateDrink}
            alt="chocolate-drink"
            className="w-[80px]"
          />
          <Heading
            text="Coffee Cafe"
            fontSize="48"
            fontWeight="bold"
            color="brown"
          />
        </div>
        <form onSubmit={hdlSubmit} className="flex flex-col gap-4 px-7 py-6">
          <div>
            <Input
              label="Firstname"
              placeholder="Firstname"
              name="firstName"
              value={form?.firstName}
              onChange={hdlChangeForm}
              disabled={!isActive}
            />
            {formError?.firstName && (
              <span className="text-[#EC0357] text-[14px] font-normal">
                {formError?.firstName}
              </span>
            )}
          </div>
          <div>
            <Input
              label="Lastname"
              placeholder="Lastname"
              name="lastName"
              value={form?.lastName}
              onChange={hdlChangeForm}
              disabled={!isActive}
            />
            {formError?.lastName && (
              <span className="text-[#EC0357] text-[14px] font-normal">
                {formError?.lastName}
              </span>
            )}
          </div>
          <div>
            <Input
              label="Phone number (optional)"
              placeholder="08X-XXX-XXXX"
              name="phoneNumber"
              value={form?.phoneNumber}
              onChange={hdlChangeForm}
              disabled={!isActive}
            />
            {formError?.phoneNumber && (
              <span className="text-[#EC0357] text-[14px] font-normal">
                {formError?.phoneNumber}
              </span>
            )}
          </div>
          {isActive === false && (
            <SecondaryButton
              text="Edit"
              type="button"
              func={() => setIsActive(true)}
            />
          )}
          {isActive === true && <PrimaryButton type="submit" text="CONFIRM" />}
        </form>
      </div>
    </div>
  );
};

export default UserProfile;
