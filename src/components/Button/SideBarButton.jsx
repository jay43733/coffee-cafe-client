import React from "react";
import { ShoppingBag } from "lucide-react";

export default function SideBarButton({ type,text }) {
  return (
    <div>
      <button
        className="text-start text-white text-lg font-semibold px-10 py-5 w-full"
        type={type}
      >
        {text}
      </button>
    </div>
  );
}
