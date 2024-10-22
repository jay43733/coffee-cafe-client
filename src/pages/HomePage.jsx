import React, { useEffect, useState } from "react";
import Logo from "../components/Logo";
import LeftSideBar from "../components/LeftSideBar";
import ProductCard from "../components/ProductCard";
import NavBar from "../components/NavBar";
import RightSideBar from "../components/RightSideBar";
import Carousal from "../components/Carousal";
import useProductStore from "../store/product-store";
import Toggle from "../components/Toggle/Toggle";

export default function HomePage() {
  const actionGetProduct = useProductStore(
    (state) => state.actionGetProduct
  );
  const products = useProductStore((state) => state.products);

  let recommendedProducts = products.filter((item)=>item.isRecommended === true)

  useEffect(() => {
    actionGetProduct();
  }, []);

  return (
    <div className="flex w-full gap-12">
      {/* Left */}
      <div className="flex flex-[0.2]">
        <LeftSideBar />
      </div>
      {/* Center */}
      <div className="flex flex-col min-w-[1084px] gap-6">
        {recommendedProducts.map((item, index) => (
          <Carousal key={index} item={item} />
        ))}
      </div>
      {/* Right */}
      <div className="flex-[0.2] ">
        <RightSideBar />
      </div>
    </div>
  );
}
