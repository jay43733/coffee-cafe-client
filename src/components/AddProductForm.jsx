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


const AddProductForm = () => {
  const actionAddProduct = useProductStore((state) => state.actionAddProduct);
  const actionGetProduct = useProductStore((state) => state.actionGetProduct);
  const actionGetAllProduct = useProductStore(
    (state) => state.actionGetAllProduct
  );
  
  const [form, setForm] = useState({
    name: "",
    price: "",
    description: "",
    isRecommended: false,
    product_categoryId: "",
  });

  
  const hdlChangeForm = (e) => {
    const { name, type, checked, value } = e.target;

    if (name === "price") {
      const regex = /^(?!0)\d+$/;

      if (value !== "" && !regex.test(value)) {
        setFormError({
          ...formError,
          price: "Price cannot start with zero.",
        });
      }
    }
    

    setForm(prev => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
  };

  const [formError, setFormError] = useState({});
  const [formImage, setFormImage] = useState("");

  const [previewImage, setPreviewImage] = useState(null);
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const hdlPreviewImage = (e) => {
    try {
      setLoading(true);
      const file = e.target.files[0];
      if (file) {
        const previewURL = URL.createObjectURL(file);
        setPreviewImage(previewURL);
        setImage(file);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const hdlClearPreviewImage = () => {
    setPreviewImage(null);
    setImage(null);
  };

  const hdlSubmit = async (e) => {
    e.preventDefault();
    const error = validator.validateAddProduct(form);
    if (error) {
      return setFormError(error);
    }
    if (!image) {
      return setFormImage("Image is required");
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
      await actionAddProduct(body);
      await actionGetAllProduct();
      e.target.closest("dialog").close();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  // console.log(form, "Formmmmmmmmmmm")
  return (
    <div className="relative">
      {loading && (
        <span className="bg-[#7A5C61] loading loading-dots loading-lg absolute top-1/2 left-1/2 -translate-x-4"></span>
      )}
      <form
        onSubmit={hdlSubmit}
        className={`flex flex-col ${loading && "opacity-20"}`}
      >
        <div className="flex flex-col relative items-center self-center rounded-2xl gap-2 max-h-[200px] border w-1/2 shadow-sm ">
          {previewImage ? (
            <div className="py-6 w-1/2 h-full bg-cover bg-center">
              <button
                onClick={hdlClearPreviewImage}
                className="absolute top-1 right-2 px-1 w-8 h-8 bg-[#EC0357] text-white rounded-full hover:bg-[#B2004A]"
              >
                ✕
              </button>
              <img
                src={previewImage}
                alt="product-image"
                className="max-h-[100px] w-full"
              />
            </div>
          ) : (
            <img
              src={chocolateDrink}
              className="py-4"
              alt="product-image"
              width="48px"
            />
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
            checked={form?.isRecommended}
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
              className="resize-none overflow-auto textarea placeholder:text-[16px] min-h-20 w-full font-bold placeholder:font-normal hover:opacity-60 focus:border-[#7A5C61]  focus:font-bold focus:placeholder:font-normal focus:bg-[#ECF1F6] py-2 px-4 border-2 border-[rgba(145,149,154,0.56)]"
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
              onChange={(e) => hdlPreviewImage(e)}
            />
            <SecondaryButton
              text="Upload Image"
              type="button"
              func={() => document.getElementById("preview-image").click()}
              Icon={() => (
                <UploadCloud size="28" color="#251C1D" strokeWidth="2" />
              )}
            />
            {formImage && (
              <span className="text-[#EC0357] text-[14px] font-normal">
                {formImage}
              </span>
            )}
          </div>
          <PrimaryButton text="Confirm"  />
          <SecondaryButton
            text="Back"
            type="button"
            func={(e) => e.target.closest("dialog").close()}
          />
        </div>
      </form>
    </div>
  );
};

export default AddProductForm;
