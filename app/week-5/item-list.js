"use client";

import Item from './item.js';
import { useState } from 'react';
import items from './items.json';

export default function ItemList() {
    
  const [sortBy, setSortBy] = useState('name');



  if (sortBy === 'name') {
    items.sort((a, b) => a.name.localeCompare(b.name));
  }
  if (sortBy === 'category') {
    items.sort((a, b) => a.category.localeCompare(b.category));
  }

 
  let categories = items.map((item) => item.category);
  categories.sort();
  let uniqueCategories = [...new Set(categories)];
  categories = uniqueCategories;

  return (
    <main>

      <div className="flex justify-center space-x-4">
        <button className={"p-2 m-2 rounded-lg " + (sortBy === 'name' ? 'bg-red-500' : 'bg-orange-500')} onClick={() => setSortBy('name')}>Name</button>
        <button className={"p-2 m-2 rounded-lg " + (sortBy === 'category' ? 'bg-red-500' : 'bg-orange-500')} onClick={() => setSortBy('category')}>Category</button>
        <button className={"p-2 m-2 rounded-lg " + (sortBy === 'Grouped Category' ? 'bg-red-500' : 'bg-orange-500')} onClick={() => setSortBy('Grouped Category')}>Grouped Category</button>
      </div>
      
        
          {sortBy != 'Group By Category' ? 
            items.map((item) => (
              <Item key={item.id} name={item.name} quantity={item.quantity} category={item.category} />
            )) :
            categories.map((category, index) => (
              <ul key={index}>
                <li className="text-xl capitalize" >{category}</li>
                <li>

                  {(items.filter((item) => item.category === category)).map((item) => (
                    <Item key={item.id} name={item.name} quantity={item.quantity} category={item.category} />
                  ))}

                </li>
              </ul>
            ))}

    </main>
  );
}