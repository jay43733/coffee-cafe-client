import React, { useEffect, useState } from "react";
import useOrderStore from "../store/order-store";
import useUserStore from "../store/user-store";
import Heading from "../components/Typography/Heading";
import OrderHistory from "../components/OrderHistory";
import OrderRightSideBar from "../components/OrderRightSideBar";
import StatusNavBar from "../components/StatusNavBar";

export default function OrderProductStatus() {
  const actionGetOrder = useOrderStore((state) => state.actionGetOrder);
  const orders = useOrderStore((state) => state.orders);
  const actionGetOrderItemById = useOrderStore(
    (state) => state.actionGetOrderItemById
  );
  const [selectedStatus, setSelectedStatus] = useState("");
  const [currentOrder, setCurrentOrder] = useState(null);

  const descOrders = orders.sort((a, b) => b.id - a.id);

  useEffect(() => {
    actionGetOrder();
  }, []);

  
  let filteredStatus
  if(selectedStatus === "PENDING"){
    filteredStatus = orders.filter((item)=>item.status === selectedStatus)
  } else if(selectedStatus === "COMPLETED"){
    filteredStatus = orders.filter((item)=>item.status === selectedStatus)
  } else if(selectedStatus === "CANCELLED"){
    filteredStatus = orders.filter((item)=>item.status === selectedStatus)
  } else{
    filteredStatus = orders
  }
  

  const hdlGetOrderById = async (orderId) => {
    const orderItem = await actionGetOrderItemById(orderId);
    setCurrentOrder(orderItem);
  };
  
  return (
    <div className="flex min-h-[90vh] w-full gap-12">
      <div className="flex pl-12 basis-[0.6] flex-col gap-6 items-center min-w-[1148px] max-w-[1148px]">
        {/* Contain Area */}
        <StatusNavBar setSelectedStatus={setSelectedStatus}/>
        {filteredStatus.map((item, index) => (
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
