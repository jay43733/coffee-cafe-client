import React, { useEffect, useState } from "react";
import Carousal from "../components/Carousal";
import useProductStore from "../store/product-store";
import UserRightSideBar from "../components/UserRightSideBar";

export default function OrderHomePage() {
  //Import From Zustand
  const actionGetProduct = useProductStore(
    (state) => state.actionGetProduct
  );
  const products = useProductStore((state) => state.products);
  const recommendedProducts = products.filter(
    (item) => item.isRecommended === true
  );

  //First Fetch
  useEffect(() => {
    actionGetProduct();
  }, []);

  return (
    <>
      <div className="flex w-full gap-12">
        {/* Center */}
        <div className="flex pl-12 w-[1148px] basis-[0.6] flex-col gap-6 items-center">
          {recommendedProducts.map((item, index) => (
            <Carousal key={index} item={item} />
          ))}
        </div>
        {/* Right */}
        <div className="basis-[0.3]">
          <div className="sticky top-4">
            <UserRightSideBar />
          </div>
        </div>
      </div>
    </>
  );
}
