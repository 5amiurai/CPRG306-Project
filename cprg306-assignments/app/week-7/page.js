"use client";

import { useState } from "react";
import NewItem from "./new-item";
import ItemList from "./item-list";
import itemsData from "./items.json";

export default function Page() {
  // Initialize the state variable with data from items.json
  const [items, setItems] = useState(itemsData);

  // Event handler for adding a new item
  const handleAddItem = (newItem) => {
    setItems((prevItems) => [...prevItems, newItem]);
  };

  return (
    <main className="p-4">
      <h1 className="text-xl font-bold mb-4">Shopping List</h1>
      {/* Pass the event handler and state as props */}
      <NewItem onAddItem={handleAddItem} />
      <ItemList items={items} />
    </main>
  );
}