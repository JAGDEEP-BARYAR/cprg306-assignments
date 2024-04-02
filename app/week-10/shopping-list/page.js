"use client";

import { useState, useEffect } from "react";
import { getItems, addItem } from "../_services/shopping-list-service";
import ItemList from "./item-list";
import NewItem from "./new-item";
import MealIdeas from "./meal-ideas";
import { useUserAuth } from "../_utils/auth-context";

export default function Page() {
  const [items, setItems] = useState([]);
  const [selectedItemName, setSelectedItem] = useState("");
  const { user } = useUserAuth();

  const handleAddItem = async (item) => {
    try {
      const userId = user.uid;
      await addItem(userId, item);
      setItems([...items, item]);
      loadItems();
    } catch (error) {
      console.error("Error adding item: ", error);
    }
  };

  const handleItemSelect = (id) => {
    const selectedIngredient = items.find((ingredient) => ingredient.id === id);
    console.log("selectedIngredient", selectedIngredient);
    const separatedSymbols = selectedIngredient.name.split(",")[0];
    console.log("separatedSymbols", separatedSymbols);
    const cleanedIngredient = separatedSymbols.replace(
      /[\p{Emoji_Presentation}\p{Emoji}\p{Emoji_Modifier_Base}\p{Emoji_Modifier}\p{Emoji_Component}]/gu,
      ""
    );
    console.log("item selected", cleanedIngredient);
    setSelectedItem(cleanedIngredient);
  };

  const loadItems = async () => {
    try {
      const userId = user.uid;
      const items = await getItems(userId);
      setItems(items);
    } catch (error) {
      console.error("Error loading items: ", error);
    }
  };

  useEffect(() => {
    if (user) {
      console.log("Logged in as : ", user.email);
      loadItems();
      console.log("pre-load");
    }
  }, [user]);

  if (!user) {
    return (
      <div className="flex justify-center bg-slate-700 min-h-screen">
        <h3 className="text-5xl text-yellow-500">Hey Look!</h3>
        <p>You haven't logged in yet</p>
        <button
          className="p-2 m-4 bg-slate-800 border-2 max-h-32 max-w-52 border-slate-800 hover:bg-green-800 rounded-3xl"
          onClick={() => (location.href = "week-8")}
        >
          Get to the login!
        </button>
      </div>
    );
  }

  return (
    <div className="bg-slate-600 min-h-screen">
      <h1 className="border-slate-800 bg-slate-700 border-2 text-5xl text-center p-4 mb-4 rounded-2xl">
        Shopping List
      </h1>
      <div className="flex justify-center">
        <div className="flex flex-row w-9/12 p-8 bg-slate-800 border-2 border-slate-800 rounded-2xl">
          <div className="mb-6">
            <NewItem onAddItem={handleAddItem} />
            <div className="flex border-0 border-double justify-center align-middle max-h-56 mt-5 rounded-md p-3 text-white bg-slate-950 w-80">
              <MealIdeas ingredient={selectedItemName} />
            </div>
          </div>
          <div className="flex justify-center ml-12">
            <ItemList items={items} onSelect={handleItemSelect} />
          </div>
        </div>
      </div>
    </div>
  );
}