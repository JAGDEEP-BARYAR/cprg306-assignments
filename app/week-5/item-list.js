"use client";

import Item from "./item.js";
import { useState } from "react";
import itemsData from "./items.json";

export default function ItemList({ items }) {
  const [sortBy, setSortBy] = useState("name");

  const sortItems = () => {
    if (sortBy === "name") {
      return itemsData.slice().sort((a, b) => a.name.localeCompare(b.name));
    }
    if (sortBy === "category") {
      return itemsData.slice().sort((a, b) => a.category.localeCompare(b.category));
    }
    if (sortBy === "groupCategory") {
      const groupedItems = itemsData.reduce((grouping, item) => {
        if (!grouping[item.category]) {
          grouping[item.category] = [];
        }
        grouping[item.category].push(item);
        return grouping;
      }, {});

      const sortedCategories = Object.keys(groupedItems).sort();

      return sortedCategories.map((category) => ({
        category,
        items: groupedItems[category].sort((a, b) => a.name.localeCompare(b.name))
      }));
    }
    // Return itemsData by default
    return itemsData;
  };

  return (
    <div >
      <p class="flex items-center">
        <button
          onClick={() => setSortBy("name")}
          className={`bg-${sortBy === "name" ? "blue-500" : "blue-900"} p-1 m-2 w-20 h-20 text-black rounded-md`}
        >
          Name
        </button>
        <button
           onClick={() => setSortBy("category")}
           className={`bg-${sortBy === "category" ? "blue-500" : "blue-900"} p-1 m-2 w-20 h-20 text-black rounded-md`}
        >
          Category
        </button>
        <button
           onClick={() => setSortBy("groupCategory")}
           className={`bg-${sortBy === "groupCategory" ? "blue-500" : "blue-900"} p-1 m-2 w-20 h-20 text-black rounded-md`}
        >
          Group Category
        </button>
      </p>
      <ul>
      {sortBy === "groupCategory" ? sortItems().map((group) => (
          <div key={group.category}>
            <h2 className="text-xl capitalize mt-2">{group.category}</h2>
            <ul>
              {group.items.map((item) => (
                <li key={item.id}>
                  <Item
                    name={item.name}
                    quantity={item.quantity}
                    category={item.category}
                  />
                </li>
              ))}
            </ul>
          </div>
        )) : sortItems().map((item) => (
          <li key={item.id}>
            <Item
              name={item.name}
              quantity={item.quantity}
              category={item.category}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

