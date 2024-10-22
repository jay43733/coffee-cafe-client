import React from "react";
import Heading from "./Typography/Heading";
import useProductStore from "../store/product-store";
import SecondaryButton from "./Button/SecondaryButton";
import DeleteButton from "./Button/DeleteButton";
import RedButton from "./Button/RedButton";
import { toast } from "react-toastify";
import useUserStore from "../store/user-store";

const ConfirmDeleteProduct = ({ hdlCloseDeleteModal }) => {
  const currentProduct = useProductStore((state) => state.currentProduct);
  const actionDeleteProduct = useProductStore(
    (state) => state.actionDeleteProduct
  );
  const actionGetAllProduct = useProductStore(
    (state) => state.actionGetAllProduct
  );


  const hdlDeleteProduct = async (id) => {
    try {
      await actionDeleteProduct(id);
      document.getElementById("delete-product").close()
      await actionGetAllProduct();
    } catch (error) {
      toast.error(error);
    }
  };

  return (
    <div>
      <div className="flex flex-col gap-10 text-center">
        <div className="justify-center flex">
          <div className="flex flex-col gap-5 rounded-3xl py-4 h-[224px] w-[228px] ">
            <div className="basis-2/3 min-w-full px-24 items-center justify-center">
              <img
                src={currentProduct?.image}
                alt="product"
                className="h-full object-contain"
              />
            </div>
            <div className="flex basis-1/3 min-w-full flex-col gap-1 text-center ">
              <Heading
                text={currentProduct?.name}
                fontSize="20"
                fontWeight="bold"
                color="primary"
              />
              <Heading
                text={`${currentProduct?.price} baht`}
                fontSize="18"
                fontWeight="normal"
                color="primary"
              />
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <Heading
            text="Are you sure you want to delete it?"
            fontSize="20"
            fontWeight="bold"
            color="primary"
          />
          <Heading
            text="This information cannot be recovered once again."
            fontSize="14"
            fontWeight="regular"
            color="red"
          />
        </div>
        <div className="flex flex-col gap-4">
          <SecondaryButton
            func={hdlCloseDeleteModal}
            text="Maybe, later"
            type="button"
          />
          <RedButton
            text="Delete"
            type="button"
            onClick={() => hdlDeleteProduct(currentProduct.id)}
          />
        </div>
      </div>
    </div>
  );
};

export default ConfirmDeleteProduct;
