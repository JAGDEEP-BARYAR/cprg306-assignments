import Item from "./item.js";
import { useState } from "react";


export default function ItemList({ items }) {
  const [sortBy, setSortBy] = useState("name");
  let sortedItems = [];

    if (sortBy === "Name") {
        sortedItems = items.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === "Category") {
        sortedItems = items.sort((a, b) => a.category.localeCompare(b.category));
    } else if (sortBy === "groupByCategory") {
        sortedItems = Object.groupBy(items, ({ category }) => category);
    }

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

