import React, { useEffect, useState } from "react";
import useOrderStore from "../store/order-store";
import useUserStore from "../store/user-store";
import Heading from "../components/Typography/Heading";
import OrderHistory from "../components/OrderHistory";
import OrderRightSideBar from "../components/OrderRightSideBar";
import NavBar from "../components/NavBar";
import StatusNavBar from "../components/StatusNavBar";

export default function AdminProductStatus() {
  const actionGetAllOrder = useOrderStore((state)=>state.actionGetAllOrder)
  const actionGetOrderItemById = useOrderStore((state)=>state.actionGetOrderItemById)
  const allOrders = useOrderStore((state)=>state.allOrders)
  const [currentOrder, setCurrentOrder] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState("");

  const descOrders = allOrders.sort((a, b) => b.id - a.id);

  useEffect(() => {
    actionGetAllOrder();
  }, []);


  const hdlGetOrderById = async (orderId) => {
    const orderItem = await actionGetOrderItemById(orderId);
    setCurrentOrder(orderItem);
  };
  
  let filteredStatus
  if(selectedStatus === "PENDING"){
    filteredStatus = allOrders.filter((item)=>item.status === selectedStatus)
  } else if(selectedStatus === "COMPLETED"){
    filteredStatus = allOrders.filter((item)=>item.status === selectedStatus)
  } else if(selectedStatus === "CANCELLED"){
    filteredStatus = allOrders.filter((item)=>item.status === selectedStatus)
  } else{
    filteredStatus = allOrders
  }

  
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
