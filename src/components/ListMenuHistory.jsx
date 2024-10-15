import React from "react";
import Heading from "./Typography/Heading";
import SecondaryButton from "./Button/SecondaryButton";

const ListMenuHistory = ({ item }) => {
  return (
    <div>
      <div className="flex py-4 my-4 justify-between overflow-auto cursor-pointer w-full h-fit bg-white rounded-2xl ">
        <div className="flex items-center">
          <img src={item?.products?.image} alt="product image" width="40px" />
        </div>
        <div className="flex flex-1 pl-4 gap-4 items-center">
          <div className="flex flex-col w-full gap-2">
            <Heading
              text={item?.products?.name}
              fontSize="16"
              fontWeight="bold"
              color="primary"
            />
            <Heading
              text={`${item?.amount * item?.products?.price} baht`}
              fontSize="14"
              fontWeight="semibold"
              color="secondary"
            />
            {item.products?.product_categoryId === 1 && (
              <Heading
                text={item?.roast?.toLowerCase()}
                fontSize="12"
                fontWeight="regular"
                color="primary"
              />
            )}

            <Heading
              text={`${item?.sweetness?.slice(1)} %`}
              fontSize="12"
              fontWeight="regular"
              color="primary"
            />
          </div>
          <div className="flex flex-col gap-3 items-center">
            <div className="px-1 py-[6px] rounded-full h-8 w-8 text-center bg-[#7A5C61]">
              <Heading
                text={item.amount}
                fontSize="14"
                fontWeight="bold"
                color="white"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListMenuHistory;
