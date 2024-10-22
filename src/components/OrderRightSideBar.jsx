import React, { useEffect } from "react";
import useUserStore from "../store/user-store";
import Heading from "./Typography/Heading";
import useOrderStore from "../store/order-store";
import ListMenuHistory from "./ListMenuHistory";
import PrimaryButton from "./Button/PrimaryButton";
import TertiaryButton from "./Button/TertiaryButton";
import { FileImage } from "lucide-react";
import SecondaryButton from "./Button/SecondaryButton";

const OrderRightSideBar = ({ currentOrder, setCurrentOrder }) => {
  const user = useUserStore((state) => state.user);
  const actionConfirmOrder = useOrderStore((state) => state.actionConfirmOrder);
  const actionCancelOrder = useOrderStore((state) => state.actionCancelOrder);
  const actionGetAllOrder = useOrderStore((state) => state.actionGetAllOrder);

  const hdlConfirmOrder = async (id) => {
    await actionConfirmOrder(id);
    await setCurrentOrder(null);
    await actionGetAllOrder()
  };
  const hdlCancelOrder = async (id) => {
    await actionCancelOrder(id);
    await setCurrentOrder(null);
    await actionGetAllOrder()
  };

  const hdlShowImage = () => {
    document.getElementById("image-modal").showModal();
  };
  return (
    <div className="h-full fixed max-h-[828px]">
      <div className="sticky top-4 z-10 px-8 py-10 flex flex-col bg-white rounded-2xl w-full h-full max-w-[400px] min-w-[364px] justify-between shadow-md">
        <button
          onClick={() => setCurrentOrder(null)}
          className="absolute right-2 top-2 px-2 py-1 rounded-xl hover:bg-[#ECF1F6] font-bold"
        >
          ✕
        </button>

        <div className="my-2 min-h-[400px] max-h-[540px]">
          <div className="flex flex-col gap-6">
            <Heading
              text={`Order ${String(currentOrder.id).padStart(3, "0")}`}
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
          {currentOrder && (
            <div className="min-h-[400px] max-h-[400px] overflow-auto">
              {currentOrder.order_items.map((item, index) => (
                <ListMenuHistory key={index} item={item} />
              ))}
            </div>
          )}
        </div>
        <div className="flex flex-col gap-7">
          {(user.role === "ADMIN" || user.role === "SUPERADMIN") && currentOrder.paymentUrl !== "" && (
            <div>
              <SecondaryButton
                text="Attached Image"
                Icon={() => <FileImage size={24} />}
                color="flex rounded-xl justify-center underline hover:text-[#251C1D] border-none hover:font-bold duration-200"
                type="button"
                func={hdlShowImage}
              />

              <dialog
                id="image-modal"
                className="modal bg-transparent backdrop:bg-black/60"
                // onClose={() => setCurrentOrder(null)}
              >
                <div className="modal-box bg-transparent border-none p-0">
                  <button
                    className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                    onClick={() =>
                      document.getElementById("image-modal").close()
                    }
                  >
                    ✕
                  </button>
                  <img
                    src={currentOrder.paymentUrl}
                    alt="Image"
                    className="rounded-lg w-full max-w-[1000px]"
                  />
                </div>
              </dialog>
            </div>
          )}

          <div className="flex flex-col gap-2">
            <Heading
              text="Total Price"
              fontSize="18"
              fontWeight="regular"
              color="primary"
            />
            <div className="flex justify-end">
              <Heading
                text={`${currentOrder.total_price.toLocaleString(
                  "en-US"
                )} baht`}
                // text={`${currentOrder?.total_price.toLocalString("en-US")} baht`}
                fontSize="24"
                fontWeight="bold"
                color="primary"
              />
            </div>
          </div>
          {(user.role === "ADMIN" || user.role === "SUPERADMIN") && currentOrder.status === "PENDING" && (
            <div className="flex flex-col gap-2">
              <PrimaryButton
                text="Complete"
                type="button"
                onClick={() => hdlConfirmOrder(currentOrder.id)}
              />
              <TertiaryButton
                text="Cancel"
                type="button"
                func={() => hdlCancelOrder(currentOrder.id)}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderRightSideBar;
