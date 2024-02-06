"use client";
import React, { useState } from "react";
export default function NewItem() {
    const [name, setName] = useState("");
    const [quantity, setQuantity] = useState("1");
    const [category, setCategory] = useState("Produce");

    const handleSubmit = (event) => {
        event.preventDefault();
        const item = { name, quantity, category };
        console.log(item);
        alert(`Added item: ${name}, quantity: ${quantity}, category: ${category}`);
        setName("");
        setQuantity("1");
        setCategory("Produce");
    };
    return (
        <div className="flex items-center justify-center h-screen">
            <form onSubmit={handleSubmit} className="flex flex-col items-center">
                <div className="flex flex-col items-center mb-4">
                    <label className="text-white mb-2">Item Name</label>
                    <input className="custom-input" type="text" value={name} onChange={(e) => setName(e.target.value)} required />
                </div>
                <div className="flex flex-col items-center mb-4">
                    <label className="text-white mb-2">Quantity</label>
                    <input className="custom-input" type="number" value={quantity} onChange={(e) => setQuantity(e.target.value)} min="1" max="99" required />
                    <select className="custom-select mt-2" value={category} onChange={(e) => setCategory(e.target.value)}>
                        <option value="Produce">Produce</option>
                        <option value="Dairy">Dairy</option>
                        <option value="Bakery">Bakery</option>
                        <option value="Meat">Meat</option>
                        <option value="Frozen Foods">Frozen Foods</option>
                        <option value="Canned Goods">Canned Goods</option>
                        <option value="Dry Goods">Dry Goods</option>
                        <option value="Beverages">Beverages</option>
                        <option value="Snacks">Snacks</option>
                        <option value="Household">Household</option>
                        <option value="Other">Other</option>
                    </select>
                </div>
                <div className="flex flex-row items-center justify-center">
                    <button className="custom-button bg-blue-500 text-white px-4 py-2 rounded-md mt-4">+</button>
                </div>
            </form>
        </div>
    );
}
