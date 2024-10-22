import React, { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import useProductStore from "../store/product-store";
import AddProductCard from "../components/AddProductCard";
import AddProductForm from "../components/AddProductForm";
import ProductStoreCard from "../components/ProductStoreCard";

const ProductManagement = () => {
  const allProducts = useProductStore((state)=>state.allProducts)
  const actionGetAllProduct = useProductStore((state)=>state.actionGetAllProduct)
  

  //UseState
  const [selectedCategory, setSelectedCategory] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    actionGetAllProduct();
  }, []);

  let filteredProducts;
  if (typeof selectedCategory === "number") {
    // console.log("1")
    filteredProducts = allProducts.filter(
      (item) => item.product_categoryId === selectedCategory
    );
  } else if (selectedCategory === true) {
    // console.log("2")
    filteredProducts = allProducts.filter((item) => !!item.isRecommended);
  } else {
    filteredProducts = allProducts;
    // console.log("3")
  }

  const sortedProducts = filteredProducts.sort((a,b)=>{
    if(a.product_status === b.product_status){
      return b.id - a.id
    }
    return a.product_status === "INACTIVE" ? 1 : -1;
  })

  const hdClickAdd = () => {
    setIsOpen(true);
    document.getElementById("add-new-product").showModal();
  };


  return (
    <div>
      <div className="flex min-h-[800px]">
        <div className="flex-[0.7] min-w-[1148px] pl-12">
          <NavBar setSelectedCategory={setSelectedCategory} />
          <div className="flex flex-wrap px-6 py-4 gap-4 justify-start items-start w-full">
            <AddProductCard hdClickAdd={hdClickAdd} />
            {filteredProducts.map((item, index) => (
              <div key={item.id}>
                <ProductStoreCard key={item.id} item={item} />
              </div>
            ))}
          </div>
        </div>
      </div>
      <dialog
        id="add-new-product"
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
          {isOpen && <AddProductForm setIsOpen={setIsOpen} />}
        </div>
      </dialog>
    </div>
  );
};

export default ProductManagement;
