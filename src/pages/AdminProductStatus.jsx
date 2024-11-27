import React, { useEffect, useState } from "react";
import useOrderStore from "../store/order-store";
import useUserStore from "../store/user-store";
import Heading from "../components/Typography/Heading";
import OrderHistory from "../components/OrderHistory";
import OrderRightSideBar from "../components/OrderRightSideBar";
import NavBar from "../components/NavBar";
import StatusNavBar from "../components/StatusNavBar";
import Pagination from "@/components/Pagination";
import LoadingRightSideBar from "@/components/LoadingRightSideBar";

export default function AdminProductStatus() {
  const actionGetAllOrder = useOrderStore((state) => state.actionGetAllOrder);
  const actionGetOrderItemById = useOrderStore(
    (state) => state.actionGetOrderItemById
  );
  const allOrders = useOrderStore((state) => state.allOrders);
  const [currentOrder, setCurrentOrder] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState("");
  const descOrders = allOrders.sort((a, b) => b.id - a.id);
  const [currentPage, setCurrentPage] = useState(1);
  const [statusPerPage, setStatusPerPage] = useState(3);
  const [allStatus, setAllStatus] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    actionGetAllOrder().finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (allOrders && allOrders.length > 0) {
      setAllStatus(allOrders);
    }
  }, [allOrders]);

  const hdlGetOrderById = async (orderId) => {
    setIsLoading(true);
    const orderItem = await actionGetOrderItemById(orderId).finally(() =>
      setIsLoading(false)
    );
    setCurrentOrder(orderItem);
  };

  const [isClickedPage, setIsClickedPage] = useState(1);

  let filteredStatus;
  if (selectedStatus === "PENDING") {
    filteredStatus = allOrders.filter((item) => item.status === selectedStatus);
  } else if (selectedStatus === "COMPLETED") {
    filteredStatus = allOrders.filter((item) => item.status === selectedStatus);
  } else if (selectedStatus === "CANCELLED") {
    filteredStatus = allOrders.filter((item) => item.status === selectedStatus);
  } else {
    filteredStatus = allOrders;
  }

  const indexOfLastPost = currentPage * statusPerPage;
  const indexOfFirstPost = indexOfLastPost - statusPerPage;
  const currentStatus = filteredStatus.slice(indexOfFirstPost, indexOfLastPost);
  console.log(isLoading, "load");
  console.log(currentOrder, "order");

  return (
    <div className="flex w-full gap-12">
      <div className="flex pl-12 basis-[0.6] flex-col justify-between max-w-[1148px] w-full items-center min-h-[800px]">
        <div className="flex flex-col gap-4 items-center w-full justify-between">
          {/* Contain Area */}
          <StatusNavBar
            setSelectedStatus={setSelectedStatus}
            setCurrentPage={setCurrentPage}
            setIsClickedPage={setCurrentPage}
          />
          {currentStatus.map((item, index) => (
            <OrderHistory
              key={index}
              item={item}
              hdlGetOrderById={hdlGetOrderById}
              currentOrder={currentOrder}
            />
          ))}
        </div>
        {filteredStatus.length > 10 && (
          <Pagination
            productPerPage={statusPerPage}
            totalProduct={filteredStatus.length}
            setCurrentPage={setCurrentPage}
            currentPage={currentPage}
            isClickedPage={isClickedPage}
            setIsClickedPage={setIsClickedPage}
          />
        )}
      </div>

      <div className="flex-[0.3]">
        {/* Right SideBar */}
        {!isLoading && currentOrder ? (
          <OrderRightSideBar
            currentOrder={currentOrder}
            setCurrentOrder={setCurrentOrder}
            isLoading={isLoading}
          />
        ) : (
          isLoading && <LoadingRightSideBar />
        )}
      </div>
    </div>
  );
}
