import React from "react";
import Heading from "./Typography/Heading";
import { ChevronLeft, ChevronRight } from "lucide-react";

const OrderHistory = ({ item, hdlGetOrderById, currentOrder }) => {
  let isShow = currentOrder?.id === item.id || currentOrder?.id === undefined

  return (
    <div
      onClick={() => hdlGetOrderById(item.id)}
      className={`w-full px-4 py-2 rounded-2xl bg-white ${
        isShow ? "opacity-100 hover:opacity-70" : "opacity-40"
      }
       flex justify-between items-center`}
    >
      <div className="flex flex-col gap-1 px-4 py-2 ">
        <div className="flex items-center gap-2">
          {/*Order Id */}
          {item.status === "PENDING" ? (
            <div className="w-4 h-4 bg-[#CF9CA5] rounded-lg"></div>
          ) : (
            <div className="w-4 h-4 bg-[#18B473] rounded-lg"></div>
          )}
          <Heading
            text={`Order ${String(item.id).padStart(3, "0")}`}
            color="primary"
            fontSize="20"
            fontWeight="bold"
          />
        </div>
        <div className="flex gap-2 items-center">
          {/*Order Status */}
          <Heading
            text="State:"
            color="primary"
            fontSize="16"
            fontWeight="bold"
          />

          <Heading
            text={`${item?.status?.charAt(0).toUpperCase()}${item?.status
              ?.slice(1)
              ?.toLowerCase()}`}
            color="secondary"
            fontSize="14"
            fontWeight="semiBold"
          />
        </div>
        <div className="flex gap-2 items-center">
          {/* Date */}
          <Heading
            text="Date:"
            color="primary"
            fontSize="16"
            fontWeight="bold"
          />
          <Heading
            text={new Date(item.createdAt)
              .toLocaleString("en-TH", { timeZone: "Asia/Bangkok" })
              .slice(0, 10)}
            color="secondary"
            fontSize="14"
            fontWeight="semiBold"
          />
        </div>
        <div className="flex gap-2 items-center">
          {/* Time */}
          <Heading
            text="Time:"
            color="primary"
            fontSize="16"
            fontWeight="bold"
          />
          <Heading
            text={new Date(item.createdAt)
              .toLocaleString("en-TH", { timeZone: "Asia/Bangkok" })
              .slice(11)}
            color="secondary"
            fontSize="14"
            fontWeight="semiBold"
          />
        </div>
      </div>
      <div>
        {currentOrder?.id === item.id && (
          <ChevronRight size="28" color="#251C1D" strokeWidth="2" />
        )}
      </div>
    </div>
  );
};

export default OrderHistory;