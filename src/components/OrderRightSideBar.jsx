import React, { useEffect } from "react";
import useUserStore from "../store/user-store";
import Heading from "./Typography/Heading";
import useOrderStore from "../store/order-store";
import ListMenuHistory from "./ListMenuHistory";

const OrderRightSideBar = ({ currentOrder, setCurrentOrder }) => {
  const token = useUserStore((state) => state.token);
  const user = useUserStore((state) => state.user);
  const orders = useOrderStore((state) => state.orders);
  const actionGetOrderItemById = useOrderStore(
    (state) => state.actionGetOrderItemById
  );

  //   console.log(currentOrder, "Right Side");
  return (
    <div className="h-full">
      <div className="px-8 relative py-10 flex flex-col bg-white rounded-2xl w-full h-full max-w-[400px] min-w-[364px] justify-between">
        <button onClick={()=>setCurrentOrder(null)} className="absolute right-2 top-2 px-2 py-1 rounded-xl hover:bg-[#ECF1F6] font-bold">✕</button>

        <div className="my-2 min-h-[90vh]">
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
          {currentOrder &&
            currentOrder.order_items.map((item, index) => (
              <ListMenuHistory key={index} item={item} />
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
        </div>
      </div>
    </div>
  );
};

export default OrderRightSideBar;
