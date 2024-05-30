"use client";

import React from "react";
import {Card, CardBody, CardFooter, Divider, Image} from "@nextui-org/react";

function CardDiscountComponent() {
    function calculateDiscountedPrice(originalPrice: number, discountPercentage: number) {
        const discount = originalPrice * (discountPercentage / 100);
        const discountedPrice = originalPrice - discount;
        return discountedPrice.toFixed(2);
      }
      
      const list = [
        {
          discount: "25%",
          title: "Orange",
          img: "https://i.pinimg.com/564x/a0/d2/a1/a0d2a1454efec129fb3834b14f144f1e.jpg",
          original_price: "$8.00",
          price: calculateDiscountedPrice(8.00, 25),
          discounted_price: calculateDiscountedPrice(8.00, 25)
        },
        {
            discount: "25%",
            title: "Orange",
            img: "https://i.pinimg.com/564x/a0/d2/a1/a0d2a1454efec129fb3834b14f144f1e.jpg",
            original_price: "$8.00",
            price: calculateDiscountedPrice(8.00, 25),
            discounted_price: calculateDiscountedPrice(8.00, 25)
          },
          {
            discount: "25%",
            title: "Orange",
            img: "https://i.pinimg.com/564x/a0/d2/a1/a0d2a1454efec129fb3834b14f144f1e.jpg",
            original_price: "$8.00",
            price: calculateDiscountedPrice(8.00, 25),
            discounted_price: calculateDiscountedPrice(8.00, 25)
          },
          {
            discount: "25%",
            title: "Orange",
            img: "https://i.pinimg.com/564x/a0/d2/a1/a0d2a1454efec129fb3834b14f144f1e.jpg",
            original_price: "$8.00",
            price: calculateDiscountedPrice(8.00, 25),
            discounted_price: calculateDiscountedPrice(8.00, 25)
          },
          {
            discount: "25%",
            title: "Orange",
            img: "https://i.pinimg.com/564x/a0/d2/a1/a0d2a1454efec129fb3834b14f144f1e.jpg",
            original_price: "$8.00",
            price: calculateDiscountedPrice(8.00, 25),
            discounted_price: calculateDiscountedPrice(8.00, 25)
          },
          {
            discount: "25%",
            title: "Orange",
            img: "https://i.pinimg.com/564x/a0/d2/a1/a0d2a1454efec129fb3834b14f144f1e.jpg",
            original_price: "$8.00",
            price: calculateDiscountedPrice(8.00, 25),
            discounted_price: calculateDiscountedPrice(8.00, 25)
          },
            {
            discount: "15%",
            title: "Apple",
            img: "https://i.pinimg.com/564x/06/db/06/06db063f979df8f8825cdc6600f4a474.jpg",
            original_price: "$4.99",
            price: calculateDiscountedPrice(4.99, 15),
            discounted_price: calculateDiscountedPrice(4.99, 15)
            }
      ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
    {list.map((item, index) => (
      <Card shadow="sm" key={index} isPressable onPress={() => console.log("item pressed")}>
        <CardBody className="overflow-visible px-4 h-[265px] w-[220px] rounded-b-lg relative">
          <Image src={item.img} alt={item.title} className="object-cover" />
          <span className="bg-green-500 text-white font-medium text-sm py-1 px-2 rounded-full absolute top-2 right-2 z-20">{item.discount}</span>
          <div className="text-gray-900 font-semibold text-[20px]">{item.title}</div>
          <div className="flex items-center">
          <span className="text-gray-500 font-semibold text-[14px] line-through">{item.original_price}</span>
          <span className="text-gray-900 font-semibold text-[20px] ml-4 mb-2">${item.discounted_price}</span>
          </div>
          <Divider/>  
          </CardBody>
          <CardFooter className="p-4 justify-between h-[5px]">
          <p className="text-[#4C9357] font-medium text-[13px]">Save - ${item.discounted_price}</p>
        </CardFooter>
      </Card>
    ))}
  </div>
  );
}

export default CardDiscountComponent;