import React, { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import UserRightSideBar from "../components/UserRightSideBar";
import ProductCard from "../components/ProductCard";
import useProductStore from "../store/product-store";
import { OrderProductForm } from "../components/OrderProductForm";
import useCartStore from "../store/cart-store";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { useLocation } from "react-router-dom";
import Pagination from "@/components/Pagination";

const OrderProduct = () => {
  const products = useProductStore((state) => state.products);
  const actionGetProduct = useProductStore((state) => state.actionGetProduct);
  const currentItem = useCartStore((state) => state.currentItem);
  const setCurrentItem = useCartStore((state) => state.setCurrentItem);

  //UseState
  const [selectedCategory, setSelectedCategory] = useState("");
  const [allProducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [productPerPage, setProductPerPage] = useState(10);

  useEffect(() => {
    setLoading(true);
    actionGetProduct().finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (products && products.length > 0) {
      setAllProducts(products);
    }
  }, [products]);

  let filteredProducts;
  if (typeof selectedCategory === "number") {
    filteredProducts = allProducts.filter(
      (item) => item.product_categoryId === selectedCategory
    );
  } else if (selectedCategory === true) {
    filteredProducts = allProducts.filter((item) => !!item.isRecommended);
  } else {
    filteredProducts = allProducts;
  }

  const indexOfLastPost = currentPage * productPerPage;

  const indexOfFirstPost = indexOfLastPost - productPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstPost,
    indexOfLastPost
  );

  const hdlClickProduct = (item) => {
    setCurrentItem(item);
    document.getElementById("order-product").showModal();
  };

  const [isClickedPage, setIsClickedPage] = useState(1);

  return (
    <>
      <div className="flex w-full gap-12">
        <div
          className={`flex-[0.7] min-w-[1148px] pl-12 ${
            loading && "relative opacity-30"
          }`}
        >
          {loading && (
            <span className="bg-[#7A5C61] loading loading-dots loading-lg absolute top-1/2 left-1/2 -translate-x-4"></span>
          )}
          <div className="sticky top-28 w-[1100px] bg-[#eef1f4] py-4">
            <NavBar setSelectedCategory={setSelectedCategory} setCurrentPage={setCurrentPage} setIsClickedPage={setIsClickedPage} />
          </div>
          <div className="flex flex-col min-h-[640px] h-full justify-between items-center">
            <div className="flex flex-wrap pt-4 px-6 justify-start gap-4 items-start w-full ">
              {currentProducts.map((item) => (
                <div
                  key={item.id}
                  onClick={() => hdlClickProduct(item)}
                  className="cursor-pointer"
                >
                  <ProductCard key={item.id} item={item} />
                </div>
              ))}
            </div>
            {filteredProducts.length > 10 && (
              <Pagination
                productPerPage={productPerPage}
                totalProduct={filteredProducts.length}
                setCurrentPage={setCurrentPage}
                currentPage={currentPage}
                isClickedPage={isClickedPage}
                setIsClickedPage={setIsClickedPage}
              />
            )}
          </div>
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
