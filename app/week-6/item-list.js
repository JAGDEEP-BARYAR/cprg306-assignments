"use client";

import { useState } from "react";
import Item from "./item";

export default function ItemList({ items }) {
  const [sortBy, setSortBy] = useState("name");

  const sortedItems = [...items].sort((a, b) => {
    if (sortBy === "name") {
      return a.name.localeCompare(b.name);
    } else if (sortBy === "category") {
      return a.category.localeCompare(b.category);
    }
  });

  return (
    <div>
      <label htmlFor="sort">Sort by: </label>

      <button
        className="bg-orange-900 p-1 m-50 w-28 focus:bg-orange-500"
        onClick={() => setSortBy("name")}
      >
        Name
      </button>
      <button
        className="bg-orange-900 p-1 m-50 w-28 focus:bg-orange-500"
        onClick={() => setSortBy("category")}
      >
        Category
      </button>

      <ul>
        {sortedItems.map((item, id) => {
          return (
            <Item
              key={id}
              name={item.name}
              quantity={item.quantity}
              category={item.category}
            />
          );
        })}
      </ul>
    </div>
  );
}