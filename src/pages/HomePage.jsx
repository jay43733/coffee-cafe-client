import React, { useEffect, useState } from "react";
import Logo from "../components/Logo";
import LeftSideBar from "../components/LeftSideBar";
import ProductCard from "../components/ProductCard";
import NavBar from "../components/NavBar";
import RightSideBar from "../components/RightSideBar";
import Carousal from "../components/Carousal";
import useProductStore from "../store/product-store";
import Toggle from "../components/Toggle/Toggle";
import LoadingPage from "./Loading";

export default function HomePage() {
  const actionGetProduct = useProductStore((state) => state.actionGetProduct);
  const products = useProductStore((state) => state.products);
  const [loading, setLoading] = useState(false);
  const [allProducts, setAllProducts] = useState([]);

  useEffect(() => {
    setLoading(true);
    actionGetProduct().finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (products && products.length > 0) {
      setAllProducts(products);
    }
  }, [products]);

  
  const recommendedProducts = allProducts.filter(
    (item) => item.isRecommended === true
  );
  
  console.log(products, "product")
  console.log(recommendedProducts, "pro")
  
  return (
    <div className="flex w-full gap-12 relative">
      {loading && (
        <span className="bg-[#7A5C61] loading loading-dots loading-lg absolute top-1/2 left-1/2 -translate-x-4"></span>
      )}
      {/* Left */}
      <div className="flex flex-[0.2]">
        <LeftSideBar />
      </div>
      {/* Center */}
      <div className="flex flex-col min-w-[1084px] gap-6">
        {recommendedProducts.map((item) => (
          <Carousal key={item.id} item={item} />
        ))}
      </div>
      {/* Right */}
      <div className="flex-[0.2] ">
        <RightSideBar />
      </div>
    </div>
  );
}
