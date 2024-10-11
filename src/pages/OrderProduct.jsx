import React, { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import UserRightSideBar from "../components/UserRightSideBar";
import ProductCard from "../components/ProductCard";
import useProductStore from "../store/product-store";
import { OrderProductForm } from "../components/OrderProductForm";

const OrderProduct = () => {
  const [isOpen, setIsOpen] = useState(false);
  const products = useProductStore((state) => state.products);
  const actionGetAllProduct = useProductStore(
    (state) => state.actionGetAllProduct
  );

  //UseState
  const [selectedCategory, setSelectedCategory] = useState("");
  const [currentItem, setCurrentItem] = useState({});

  useEffect(() => {
    actionGetAllProduct();
  }, []);

  let filteredProducts;
  if (typeof selectedCategory === "number") {
    // console.log("1")
    filteredProducts = products.filter(
      (item) => item.product_categoryId === selectedCategory
    );
  } else if (selectedCategory === true) {
    // console.log("2")
    filteredProducts = products.filter((item) => !!item.isRecommended);
  } else {
    filteredProducts = products;
    // console.log("3")
  }

  const hdlClickProduct = (item) => {
    setCurrentItem(item);
    setIsOpen(true);
    document.getElementById("order-product").showModal();
  };

  // console.log(currentItem)

  return (
    <>
      <div className="flex">
        <div className="flex-[0.8]">
          <NavBar setSelectedCategory={setSelectedCategory} />
          <div className="flex flex-wrap p-4 gap-6 w-full">
            {filteredProducts.map((item, index) => (
              <div key={item.id} onClick={() => hdlClickProduct(item)}>
                <ProductCard key={item.id} item={item} />
              </div>
            ))}
          </div>
        </div>
        <div className="flex-[0.2]">
          <UserRightSideBar />
        </div>
        <dialog
          id="order-product"
          className="modal"
          onClose={() => {
            setIsOpen(false);
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
            {isOpen && <OrderProductForm currentItem={currentItem} />}
          </div>
        </dialog>
      </div>
    </>
  );
};

export default OrderProduct;
