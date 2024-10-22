import React, { useState } from "react";
import Heading from "./Typography/Heading";
import { LockOpenIcon, PencilIcon, Trash2 } from "lucide-react";
import useProductStore from "../store/product-store";
import { toast } from "react-toastify";
import ConfirmDeleteProduct from "./ConfirmDeleteProduct";
import EditProductForm from "./EditProductForm";
import SecondaryButton from "./Button/SecondaryButton";

export default function ProductStoreCard({ item }) {
  const setCurrentProduct = useProductStore((state) => state.setCurrentProduct);
  const currentProduct = useProductStore((state) => state.currentProduct);
  const actionReactiveProduct = useProductStore(
    (state) => state.actionReactiveProduct
  );
  const actionGetAllProduct = useProductStore(
    (state) => state.actionGetAllProduct
  );
  
  const hdlDeleteModal = (item) => {
    setCurrentProduct(item);
    document.getElementById("delete-product").showModal();
  };

  const hdlUpdateModal = (item) => {
    setCurrentProduct(item);
    document.getElementById("update-product").showModal();
  };

  const hdlCloseDeleteModal = () => {
    document.getElementById("delete-product").close();
  };

  const hdlCloseEditModal = () => {
    document.getElementById("update-product").close();
  };

  const hdlReactiveUser = async(id,item) =>{
    try{
      await actionReactiveProduct(id);
      await actionGetAllProduct();
      toast.success(`${item.name} reactivated`);
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  }

  return (
    <div
      className={`group flex flex-col gap-5 bg-white relative rounded-3xl py-4 h-[264px] w-[196px] shadow-md ${
        item.product_status === "INACTIVE" && "bg-[#91959A]"
      }`}
    >
      <div className="flex basis-2/3 min-w-full group items-center justify-center">
        <img
          src={item.image}
          alt="product"
          className="h-full object-contain min-w-[40px] max-w-[48px] "
        />
      </div>
      <div
        className={`flex basis-1/3 min-w-full flex-col gap-1 text-center ${
          item.product_status === "INACTIVE" && "opacity-40"
        } `}
      >
        <Heading
          text={item.name}
          fontSize="20"
          fontWeight="bold"
          color="primary"
        />
        <Heading
          text={`${item.price} baht`}
          fontSize="18"
          fontWeight="normal"
          color="primary"
        />
      </div>
      {item.product_status === "ACTIVE" ? (
        <button
          onClick={() => hdlDeleteModal(item)}
          className="bg-[#EC0357] hover:duration-200 hover:bg-[#b2004a] absolute top-2  right-2 p-2 rounded-full w-fit"
        >
          <Trash2 color="white" size={18} />
        </button>
      ) : (
        <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <SecondaryButton
            color="absolute top-1/2 right-4 max-w-[160px]"
            Icon={() => <LockOpenIcon size={20} />}
            text="Reactive"
            func={() => hdlReactiveUser(item.id, item)}
          />
        </div>
      )}

      {item.product_status === "ACTIVE" && (
        <button
          onClick={() => hdlUpdateModal(item)}
          className="bg-[#7A5C61] hover:duration-200 hover:bg-[#574145] hover:shadow-md  absolute top-2 left-2 p-2 rounded-full w-fit"
        >
          <PencilIcon color="white" size={18} />
        </button>
      )}
      <dialog
        id="delete-product"
        className="modal"
        onClose={() => {
          setCurrentProduct(null);
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
          {currentProduct && (
            <ConfirmDeleteProduct hdlCloseDeleteModal={hdlCloseDeleteModal} />
          )}
        </div>
      </dialog>
      <dialog
        id="update-product"
        className="modal"
        onClose={() => {
          setCurrentProduct(null);
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
          {currentProduct && (
            <EditProductForm hdlCloseEditModal={hdlCloseEditModal} />
          )}
        </div>
      </dialog>
    </div>
  );
}
