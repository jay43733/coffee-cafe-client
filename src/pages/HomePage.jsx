import React, { useEffect, useState } from "react";
import Logo from "../components/Logo";
import LeftSideBar from "../components/LeftSideBar";
import ProductCard from "../components/ProductCard";
import NavBar from "../components/NavBar";
import RightSideBar from "../components/RightSideBar";
import Carousal from "../components/Carousal";
import useProductStore from "../store/product-store";

export default function HomePage() {
  const actionGetAllProduct = useProductStore(
    (state) => state.actionGetAllProduct
  );
  const products = useProductStore((state) => state.products);

  useEffect(() => {
    actionGetAllProduct();
  }, []);

  return (
    <div className=" flex w-full gap-12">
      {/* Left */}
      <div className="flex flex-[0.2]">
        <LeftSideBar />
      </div>
      {/* Center */}
      <div className="flex flex-col gap-5 flex-[0.6] flex-grow">
        {products.map((item, index) => (
          <Carousal key={index} item={item} />
        ))}
      </div>
      {/* Right */}
      <div className="flex-[0.3] ">
        <RightSideBar />
      </div>
    </div>
  );
}
