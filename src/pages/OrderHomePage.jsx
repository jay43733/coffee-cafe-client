import React, { useEffect, useState } from "react";
import Carousal from "../components/Carousal";
import useProductStore from "../store/product-store";
import UserRightSideBar from "../components/UserRightSideBar";

export default function OrderHomePage() {

  //Import From Zustand
  const actionGetAllProduct = useProductStore(
    (state) => state.actionGetAllProduct
  );
  const products = useProductStore((state) => state.products);
  const recommendedProducts = products.filter((item)=>item.isRecommended===true) 
  
  //First Fetch
  useEffect(() => {
    actionGetAllProduct();
  }, []);
  // console.log(products)
  // console.log(recommendedProducts)
  return (
    <>
      <div className="flex w-full gap-12">
        {/* Center */}
        <div className="flex flex-col gap-6 items-center flex-1">
          {recommendedProducts.map((item, index) => (
            <Carousal key={index} item={item} />
          ))}
        </div>
        {/* Right */}
        <div className="flex-[0.3] ">
          <UserRightSideBar />
        </div>
      </div>
    </>
  );
}
