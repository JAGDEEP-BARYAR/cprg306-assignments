"use client";
import ItemList from "./item-list";
import NewItem from "./new-item";
import itemsData from "./item.json";
import MealIdeas from "./meal-ideas";
import { useState } from "react";
import { useUserAuth } from "../_utils/auth-context";
import Link from "next/link";

export default function Page() {
  const { user, firebaseSignOut } = useUserAuth();
  const [items, setItems] = useState(itemsData);
  const [selectedItemName, setSelectedItemName] = useState("");


  function handleAddItem(newItem) {
      setItems((prevItems) => {
        return [newItem, ...prevItems];
      });
    }
  function handleItemSelect(name) {
      setSelectedItemName(name.split(",")[0].trim().replace(/([\u2700-\u27BF]|[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|\uD83E[\uDD10-\uDDFF])|/g, ''));
      //console.log(name.split(",")[0].trim().replace(/([\u2700-\u27BF]|[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|\uD83E[\uDD10-\uDDFF])|/g, ''));
    }

  const signOut = async () => {
      await firebaseSignOut();  
  }

      if (!user){
        return (
          <div>
            <h1>User is not signed in.</h1>
            <button>
              <Link href="/week-8">Sign in</Link>
            </button>
          </div>
        );
      }

      return (
      <main>
        <div className="bg-slate-800 flex ">
          <div>
            <h1 className="text-3xl font-bold bg-slate-800 mt-10">Shopping List</h1>
          </div>        
          <div className="flex justify-end mt-10 ml-64">
            <button onClick={signOut}>
              <Link href="/week-8" className="p-2 bg-slate-950 hover:bg-red-700">Sign Out</Link>
            </button>
          </div>
        </div>
        <div className="p-2 bg-slate-800 flex">
          <div>
            <NewItem onAddItem={handleAddItem}/>
            <ItemList items={items} onItemSelect={handleItemSelect} />
          </div>
          <div>
          <h1 className="text-3xl font-bold">Meal Ideas</h1>
            {selectedItemName ? (
              <MealIdeas ingredient={selectedItemName}/>
            ) : (
              <p className="m-2 p-2 bg-slate-800">Click an item to get meal ideas.</p>
            )}
          </div>
        </div>
        </main>
    );
  }