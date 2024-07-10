import React from "react";
import {Chip, Link} from "@nextui-org/react";
import { useGetCategoryQuery } from "@/redux/service/category";
import { CategoryType } from "@/types/category";

export default function Filter() {
  const { data, isLoading, error } = useGetCategoryQuery();
  console.log('data car=t', data?.payload[0]);
  return (
    <div className="flex gap-2 my-4 overflow-x-scroll scrollbar-hide">
    {data?.payload.map((category: CategoryType) => (
      <Link key={category.slug} href={`/${category.name.toLowerCase()}`}>
        <Chip
          classNames={{
            base: "bg-gradient-to-br from-pink-500 to-yellow-500 cursor-pointer",
            content: "drop-shadow  text-white",
          }}
        >
          {category.name}
        </Chip>
      </Link>
    ))}
</div>
  );
}
