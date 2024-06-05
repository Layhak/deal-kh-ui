"use client"
import { Image, Link } from "@nextui-org/react";
import React, { useState } from "react";

const cartItems = [
  {
    id: 1,
    imageSrc: "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=830&q=80",
    title: "Basic Tee 6-Packgkhiuhjkjh",
    collection: "TenTen New Collection",
    price: "$500"
  },
  {
      id: 2,
      imageSrc: "https://i.pinimg.com/236x/fe/c2/a4/fec2a4eab17950d22e69f563b45fbed5.jpg",
      title: "Another Productghjkl;",
      collection: "Spring Collection",
      price: "$700"
    },
    {
      id: 3,
      imageSrc: "https://i.pinimg.com/236x/bb/01/90/bb019063cc6846ab0f10586de0be035a.jpg",
      title: "Yet Another Product",
      collection: "Summer Collection",
      price: "$600"
    },
];

export default function CartComponent() {
  
    const [items, setItems] = useState(cartItems);
    const [selectedOptions, setSelectedOptions] = useState<{ [key: number]: string }>({});

    const handleRemoveItem = (itemId: number) => {
        setItems(items.filter(cartItems => cartItems.id !== itemId));
        setSelectedOptions(prevState => {
            const newState = { ...prevState };
            delete newState[itemId];
            return newState;
        });
    };

return(
      <section className="flex justify-between">
  <div className=" px-4 py-8 sm:px-6 lg:px-8 w-[800px]">
    <div className="mx-auto">
      <div className="mb-4">
        <header>
          <h1 className="text-xl font-bold text-gray-900 sm:text-3xl">Your Cart</h1>
        </header>
        <div className="border bg-orange-600 w-[120px] h-2 mb-4"></div>
      </div>

      <div className="mt-8">
        <div className="border h-12 rounded-lg flex text-center items-center justify-between text-lg font-semibold">
          <p className="pl-5">Product</p>
          <p>Shop</p>
          <p className="pr-36">Price</p>
        </div>
    <ul className="space-y-4 mt-5  h-[30px]">
      {items.map((item) => (
          <li key={item.id} className="flex items-center gap-4 ">
          <Image
              src={item.imageSrc}
              alt=""
              className="size-12 rounded object-cover"
          />

          <div className=" w-[450px]">
              <h3 className="text-base text-gray-900">{item.title}</h3>
          </div>  

          <div className=" w-[400px]">
              <h3 className="text-base text-gray-900">{item.collection}</h3>
          </div>

          <div className=" w-[400px] text-center">
              <h3 className="text-base text-gray-900">{item.price}</h3>
          </div>

          <div className="flex flex-1 items-center justify-end gap-2 mr-5 ">
              <button className="transition text-red-600" 
                      onClick={() => handleRemoveItem(item.id)}
              >

              <span className="sr-only">Remove item</span>
              <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="h-6 w-6"
              >
                  <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                  />
              </svg>
              </button>
          </div>
          </li>
      ))}
      </ul>

      </div>
    </div>
  </div>


  <div className="mt-24 flex justify-end border rounded-lg p-7 border-gray-100 pt-8 w-[320px] h-[380px]">
          <div className="w-screen max-w-lg space-y-4">
            <dl className="space-y-0.5 text-sm text-gray-700">
              <h1 className="text-xl pb-5 font-semibold">Order summary</h1>
              <div className="flex justify-between text-lg pb-3 pt-3 border-b">  
                <dt className="text-slate-500">Subtotal</dt>
                <dd>$250</dd>
              </div>

              <div className="flex justify-between text-lg pb-3 pt-3 border-b">
                <dt className="text-slate-500">Shipping estimate</dt>
                <dd>$120</dd>
              </div>

              <div className="flex justify-between text-lg pb-3 pt-3 border-b">
                <dt className="text-slate-500">Tax</dt>
                <dd>$30</dd>
              </div>

              <div className="flex justify-between text-lg font-medium pb-3 pt-3">
                <dt>Order total</dt>
                <dd>$500</dd>
              </div>
            </dl>


            <div className="flex justify-end pt-10">
              <Link
                href="#"
                className="block text-center rounded-lg w-full border px-5 py-2 text-lg font-semibold text-amber-700 transition "
              >
                Checkout
              </Link>
            </div>
          </div>
  </div>
</section> 

)
}






