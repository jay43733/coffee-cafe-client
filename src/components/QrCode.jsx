import React, { useState } from "react";
import Heading from "./Typography/Heading";
import PrimaryButton from "./Button/PrimaryButton";
import { UploadCloudIcon } from "lucide-react";
import SecondaryButton from "./Button/SecondaryButton";
import useOrderStore from "../store/order-store";
import useCartStore from "../store/cart-store";
import useUserStore from "../store/user-store";
import { useNavigate } from "react-router-dom";

const QrCode = ({ totalPrice, uploadImage, setUploadImage }) => {
  const actionAddOrder = useOrderStore((state) => state.actionAddOrder);
  const actionDeleteAllCart = useCartStore(
    (state) => state.actionDeleteAllCart
  );
  const actionGetCart = useCartStore((state) => state.actionGetCart);
  const user = useUserStore((state) => state.user);
  const carts = useCartStore((state) => state.carts);
  const token = useUserStore((state) => state.token);

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const hdFileChange = (e) => {
    // e.stopPropagation();
    setUploadImage(e.target.files[0]);
  };

  // console.log(uploadImage, "Image");

  const hdlAddOrder = async (e) => {
    try {
      setLoading(true);
      const newOrder = { carts, totalPrice: totalPrice };
      const body = new FormData();
      body.append("order", JSON.stringify(newOrder));
      if (uploadImage) {
        body.append("image", uploadImage);
      }
      await actionAddOrder(body, token);
      await actionDeleteAllCart(token, user.user.id);
      await actionGetCart(token);
      await e.target.closest("dialog").close();
      await navigate("/user/order/status");
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const nameImage = uploadImage ? uploadImage?.name : "No Image";

  return (
    <div className="relative">
      {loading && (
        <span className="bg-[#7A5C61] loading loading-dots loading-lg absolute top-1/2 left-1/2 -translate-x-4"></span>
      )}
      <div
        className={`flex flex-col items-center text-center p-2 py-4 gap-6 ${
          loading && "opacity-20"
        }`}
      >
        <img
          className="rounded-xl"
          src="https://res.cloudinary.com/dp7ggau3r/image/upload/v1728632012/nup0k3lggdohjq1ukiup.jpg"
          alt="QRCode"
          width="240px"
        />
        <div className="flex items-baseline gap-2">
          {uploadImage ? (
            <Heading
              text={`${totalPrice.toLocaleString("en-US")}`}
              fontSize="32"
              color="green"
              fontWeight="bold"
            />
          ) : (
            <Heading
              text={`${totalPrice.toLocaleString("en-US")}`}
              fontSize="32"
              color="primary"
              fontWeight="bold"
            />
          )}

          <Heading
            text="baht"
            fontSize="24"
            color="secondary"
            fontWeight="regular"
          />
        </div>
        <div className="flex flex-col gap-2 px-10 py-6 rounded-2xl border-dashed border-[2px] border-opacity-20 border-[#251C1D]">
          <input
            type="file"
            className="opacity-0"
            id="image-file"
            onChange={hdFileChange}
          />
          <SecondaryButton
            func={() => document.getElementById("image-file").click()}
            text="Upload Slip"
            Icon={() => (
              <UploadCloudIcon size="28" color="#251C1D" strokeWidth="2" />
            )}
          />
          {uploadImage ? (
            <Heading
              text={nameImage}
              fontSize="16"
              color="primary"
              fontWeight="bold"
            />
          ) : (
            <Heading
              text="Snap a pic of your receipt to enjoy your drink!"
              fontSize="16"
              color="secondary"
              fontWeight="semiBold"
            />
          )}
        </div>
        {uploadImage && (
          <PrimaryButton onClick={(e) => hdlAddOrder(e)} text="Confirm" />
        )}
      </div>
    </div>
  );
};

export default QrCode;