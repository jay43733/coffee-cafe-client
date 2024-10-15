import React, { useEffect, useState } from "react";
import useOrderStore from "../store/order-store";
import useUserStore from "../store/user-store";
import Heading from "../components/Typography/Heading";
import OrderHistory from "../components/OrderHistory";
import OrderRightSideBar from "../components/OrderRightSideBar";

export default function OrderProductStatus() {
  const actionGetOrder = useOrderStore((state) => state.actionGetOrder);
  const orders = useOrderStore((state) => state.orders);
  const token = useUserStore((state) => state.token);
  const actionGetOrderItemById = useOrderStore(
    (state) => state.actionGetOrderItemById
  );

  const [currentOrder, setCurrentOrder] = useState(null);

  const descOrders = orders.sort((a, b) => b.id - a.id);

  useEffect(() => {
    actionGetOrder(token);
  }, []);

  const hdlGetOrderById = async (orderId) => {
    const orderItem = await actionGetOrderItemById(orderId, token);
    setCurrentOrder(orderItem);
  };
  
  return (
    <div className="flex min-h-[90vh] w-full gap-28">
      <div className="flex px-12 basis-[0.6] flex-col gap-6 items-center min-w-[1084px]">
        {/* Contain Area */}
        {descOrders.map((item, index) => (
          <OrderHistory
            key={index}
            item={item}
            hdlGetOrderById={hdlGetOrderById}
            currentOrder = {currentOrder}
          />
        ))}
      </div>
      <div className="flex-[0.3]">
        {/* Right SideBar */}
        {currentOrder && <OrderRightSideBar currentOrder={currentOrder} setCurrentOrder={setCurrentOrder} />}
      </div>
    </div>
  );
}
