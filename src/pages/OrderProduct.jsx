import React, { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import UserRightSideBar from "../components/UserRightSideBar";
import ProductCard from "../components/ProductCard";
import useProductStore from "../store/product-store";
import { OrderProductForm } from "../components/OrderProductForm";
import useCartStore from "../store/cart-store";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

const OrderProduct = () => {
  const products = useProductStore((state) => state.products);
  const actionGetProduct = useProductStore((state) => state.actionGetProduct);
  const currentItem = useCartStore((state) => state.currentItem);
  const setCurrentItem = useCartStore((state) => state.setCurrentItem);

  //UseState
  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    actionGetProduct();
  }, []);

  let filteredProducts;
  if (typeof selectedCategory === "number") {
    filteredProducts = products.filter(
      (item) => item.product_categoryId === selectedCategory
    );
  } else if (selectedCategory === true) {
    filteredProducts = products.filter((item) => !!item.isRecommended);
  } else {
    filteredProducts = products;
  }

  const hdlClickProduct = (item) => {
    setCurrentItem(item);
    document.getElementById("order-product").showModal();
  };

  return (
    <>
      <div className="flex w-full gap-12 min-h-[800px]  ">
        <div className="flex-[0.7] min-w-[1148px] pl-12 sticky top-32 ">
          <div className="fixed w-[1100px]">
            <NavBar setSelectedCategory={setSelectedCategory} />
          </div>
          <ScrollArea className="h-[1000px] mt-14">
            <div className="flex flex-wrap pt-4 px-6 justify-start gap-4 items-start w-full ">
              {filteredProducts.map((item, index) => (
                <div key={item.id} onClick={() => hdlClickProduct(item)}>
                  <ProductCard key={item.id} item={item} />
                </div>
              ))}
            </div>
          </ScrollArea>
        </div>
        <div className="flex-[0.3] ">
          <UserRightSideBar />
        </div>
        <dialog
          id="order-product"
          className="modal"
          onClose={() => {
            setCurrentItem(null);
          }}
        >
          <div className="modal-box">
            <button
              type="button"
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
              onClick={(e) => e.target.closest("dialog").close()}
            >
              ✕
            </button>
            {currentItem && <OrderProductForm />}
          </div>
        </dialog>
      </div>
    </>
  );
};

export default OrderProduct;
