import React, { useEffect, useState } from "react";
import Heading from "./Typography/Heading";
import ListMenu from "./ListMenu";
import PrimaryButton from "./Button/PrimaryButton";
import SecondaryButton from "./Button/SecondaryButton";
import useCartStore from "../store/cart-store";
import useUserStore from "../store/user-store";
import useOrderStore from "../store/order-store";
import QrCode from "./QrCode";

import { ImagePlusIcon } from "lucide-react";
// import qrCode from "../../../Product Image/QRcode"

export default function UserRightSideBar() {
  const carts = useCartStore((state) => state.carts);
  const token = useUserStore((state) => state.token);
  const user = useUserStore((state) => state.user);
  const actionGetCart = useCartStore((state) => state.actionGetCart);
  const actionDeleteAllCart = useCartStore(
    (state) => state.actionDeleteAllCart
  );
  const actionAddOrder = useOrderStore((state) => state.actionAddOrder);

  const totalPrice = carts.reduce(
    (prev, curr) => prev + curr?.amount * curr?.products?.price,
    0
  );

  const [uploadImage, setUploadImage] = useState(null);

  const hdlResetOrder = async (id) => {
    await actionDeleteAllCart(token, id);
    await actionGetCart(token);
  };

  const hdlConfirmOrder = async () => {
    //Need to Pay bill before finish ordering
    document.getElementById("pay-bill").showModal();
  };

  useEffect(() => {
    actionGetCart(token);
  }, []);

  return (
    <div className="h-full">
      <div className="px-8 py-10 flex flex-col bg-white rounded-2xl w-full h-full max-w-[400px] min-w-[364px] justify-between">
        <div className="my-2 min-h-[90vh]">
          <div className="flex flex-col gap-6">
            <Heading
              text="My Cart"
              fontSize="32"
              fontWeight="bold"
              color="Primary"
            />
            <Heading
              text="Menu"
              fontSize="18"
              fontWeight="regular"
              color="primary"
            />
          </div>
          {carts.map((item, index) => (
            <ListMenu key={index} item={item} />
          ))}
        </div>
        <div className="flex flex-col gap-7">
          <div className="flex flex-col gap-2">
            <Heading
              text="Total Price"
              fontSize="18"
              fontWeight="regular"
              color="primary"
            />
            <div className="flex justify-end">
              <Heading
                text={`${totalPrice.toLocaleString("en-US")} baht`}
                fontSize="24"
                fontWeight="bold"
                color="primary"
              />
            </div>
          </div>
          {totalPrice !== 0 && (
            <div className="flex flex-col gap-2">
              <PrimaryButton onClick={hdlConfirmOrder} text="Confirm" />
              <SecondaryButton
                type="button"
                text="Reset Orders"
                func={() => hdlResetOrder(user.user.id)}
              />
            </div>
          )}
        </div>
      </div>
      <dialog
        id="pay-bill"
        className="modal"
        onClose={() => {
          setUploadImage(null);
        }}
      >
        <div className="modal-box">
          <button
            type="button"
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            onClick={(e) => e.target.closest("dialog").close()}
          >
            ✕
          </button>
          <QrCode
            totalPrice={totalPrice}
            uploadImage={uploadImage}
            setUploadImage={setUploadImage}
          />
        </div>
      </dialog>
    </div>
  );
}
