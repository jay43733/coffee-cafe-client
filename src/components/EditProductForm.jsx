import React, { useState } from "react";
import Heading from "./Typography/Heading";
import chocolateDrink from "../assets/chocolate-drink.svg";
import Input from "./Input";
import SecondaryButton from "./Button/SecondaryButton";
import { UploadCloud } from "lucide-react";
import validator from "../utils/validator";
import PrimaryButton from "./Button/PrimaryButton";
import useProductStore from "../store/product-store";
import Toggle from "./Toggle/Toggle";

const EditProductForm = ({ hdlCloseEditModal }) => {
  const currentProduct = useProductStore((state) => state.currentProduct);
  const actionUpdateProduct = useProductStore(
    (state) => state.actionUpdateProduct
  );

  const actionGetAllProduct = useProductStore(
    (state) => state.actionGetAllProduct
  );

  const [form, setForm] = useState({
    name: currentProduct?.name,
    price: currentProduct?.price,
    description: currentProduct?.description,
    isRecommended: currentProduct?.isRecommended,
    product_categoryId: currentProduct?.product_categoryId,
  });

  const hdlChangeForm = (e) => {
    const { name, type, checked, value } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
  };

  const [formError, setFormError] = useState({});
  const [previewImage, setPreviewImage] = useState(currentProduct.image);
  const [image, setImage] = useState(currentProduct.image);
  const [loading, setLoading] = useState(false);

  const hdlPreviewImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      const previewURL = URL.createObjectURL(file);
      setPreviewImage(previewURL);
      setImage(file);
    }
  };

  console.log(formError, "FormmmErorr")

  const hdlSubmit = async (e, id) => {
    e.preventDefault();
    const error = validator.validateEditProduct(form);
    if (error) {
      return setFormError(error);
    }
    try {
      setLoading(true);
      const body = new FormData();
      body.append("name", form?.name);
      body.append("price", form?.price);
      body.append("description", form?.description);
      body.append("isRecommended", form?.isRecommended);
      body.append("product_categoryId", form?.product_categoryId);
      if (image) {
        body.append("image", image);
      }
      await actionUpdateProduct(body, id);
      await actionGetAllProduct();
      e.target.closest("dialog").close();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative">
      {loading && (
        <span className="bg-[#7A5C61] loading loading-dots loading-lg absolute top-1/2 left-1/2 -translate-x-4"></span>
      )}
      <form
        onSubmit={(e) => hdlSubmit(e, currentProduct.id)}
        className={`flex flex-col ${loading && "opacity-20"}`}
      >
        <div className="flex flex-col relative items-center self-center rounded-2xl gap-2 h-full border w-2/5 shadow-sm ">
          {previewImage ? (
            <div className="p-4 w-1/2 bg-cover bg-center px-6">
              <img
                src={previewImage}
                alt="product-image"
                className="max-h-[80px]"
              />
            </div>
          ) : (
            <img src={chocolateDrink} alt="product-image" width="48px" />
          )}
          <Heading
            text="Preview"
            color="secondary"
            fontSize={16}
            fontWeight="semiBold"
          />
        </div>
        <div className="flex flex-col gap-2 px-6 py-4">
          <Toggle
            text="Recommended"
            name="isRecommended"
            id="isRecommended"
            checked={form?.isRecommended ? true : false}
            onChange={hdlChangeForm}
          />
          <div>
            <Input
              label="Name"
              name="name"
              placeholder="Enter menu name"
              value={form.name}
              onChange={hdlChangeForm}
            />
            {formError.name && (
              <span className="text-[#EC0357] text-[14px] font-normal">
                {formError.name}
              </span>
            )}
          </div>
          <div>
            <Input
              label="Price"
              name="price"
              placeholder="Enter price"
              value={form.price}
              onChange={hdlChangeForm}
            />
            {formError.price && (
              <span className="text-[#EC0357] text-[14px] font-normal">
                {formError.price}
              </span>
            )}
          </div>
          <label>
            Description
            <textarea
              value={form.description}
              rows={form.description.split("\n").length}
              onChange={hdlChangeForm}
              name="description"
              placeholder="Tell us more about it"
              className="resize-none rounded-lg overflow-hidden min-h-[100px] max-h-[500px] w-full font-bold placeholder:font-normal hover:opacity-60 focus:border-[#7A5C61]  focus:font-bold focus:placeholder:font-normal focus:bg-[#ECF1F6] py-2 px-4 border-2 border-[rgba(145,149,154,0.56)]"
            ></textarea>
            {formError.description && (
              <span className="text-[#EC0357] text-[14px] font-normal">
                {formError.description}
              </span>
            )}
          </label>
          <div className="flex flex-col gap-1">
            <select
              className=" py-4 px-4 text-center font-bold rounded-lg border-2 border-[rgba(145,149,154,0.56)] text-lg focus:font-bold focus:bg-[#ECF1F6]"
              name="product_categoryId"
              id="product_categoryId"
              value={form.product_categoryId}
              onChange={hdlChangeForm}
            >
              <option disabled hidden value="">
                Select Category
              </option>
              <option value="1" className="hover:bg-[#7A5C61]">
                Coffee
              </option>
              <option value="2" className="hover:bg-[#433335]">
                Non-Coffee
              </option>
            </select>
            {formError.product_categoryId && (
              <span className="text-[#EC0357] text-[14px] font-normal">
                {formError.product_categoryId}
              </span>
            )}
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <div className="px-28 py-4">
            <input
              type="file"
              name="image"
              className="opacity-0"
              id="preview-image"
              onChange={hdlPreviewImage}
            />
            <SecondaryButton
              text="Upload Image"
              type="button"
              func={() => document.getElementById("preview-image").click()}
              Icon={() => (
                <UploadCloud size="28" color="#251C1D" strokeWidth="2" />
              )}
            />
          </div>
          <PrimaryButton text="Confirm" />
          <SecondaryButton text="Back" type="button" func={hdlCloseEditModal} />
        </div>
      </form>
    </div>
  );
};

export default EditProductForm;
