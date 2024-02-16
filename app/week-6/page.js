"use client"
import { useState } from "react";
import ItemList from "./item-list.js";
import NewItem from "./new-item.js";
import itemsData from "./items.json";

export default function Page() { 
    
    {
    const [items,setItems] = useState(itemsData);
    const handleSubmit=(items) => setItems([...items, item]);
    }
 
  return (
    <main>
         <h1 class="m-2">Shopping List</h1>
            <NewItem onAddItem={handleAddItem}></NewItem>
            <ItemList items={items}></ItemList>   
    </main>
    
  );
}