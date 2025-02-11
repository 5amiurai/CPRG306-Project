// page.js
"use client";
import React, { useState } from "react";
import NewItem from "./new-item";
import ItemList from "./item-list";
import MealIdeas from "./meal-ideas";
import itemsData from "./items.json";

const Page = () => {
  const [items, setItems] = useState(itemsData);
  const [selectedItemName, setSelectedItemName] = useState("");

  // Event handler for item selection
  const handleItemSelect = (itemName) => {
    const cleanedName = itemName.split(",")[0].replace(/[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{1F700}-\u{1F77F}\u{1F780}-\u{1F7FF}\u{1F800}-\u{1F8FF}\u{1F900}-\u{1F9FF}\u{1FA00}-\u{1FA6F}\u{1FA70}-\u{1FAFF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{2300}-\u{23FF}\u{2B50}\u{2764}\u{1F49C}\u{1F495}\u{1F49D}\u{1F49B}\u{1F49A}\u{1F493}\u{1F498}\u{1F49E}\u{1F497}\u{1F496}\u{1F495}\u{1F495}\u{1F49F}\u{1F49F}\u{1F9E0}\u{1F9F1}\u{1F9E1}\u{1F9EB}\u{1F9E2}\u{1F9EC}\u{1F9ED}\u{1F9F5}\u{1F9F4}\u{1F9F6}\u{1F9F7}\u{1F9F8}\u{1F9F9}\u{1F9FA}\u{1F9FB}\u{1F9FC}\u{1F9FD}\u{1F9FE}\u{1F9FF}]/gu, "");
    setSelectedItemName(cleanedName);
  };

  return (
    <div className="flex p-8 space-x-8">
      <div className="w-1/3 bg-white shadow-lg rounded-lg p-6 text-blue-300">
        <h2 className="text-2xl font-semibold mb-4">Add New Item</h2>
        <NewItem />
        <h2 className="text-2xl font-semibold mt-8 mb-4 text-blue-300">Shopping List</h2>
        <ItemList items={items} onItemSelect={handleItemSelect} />
      </div>
      <div className="w-2/3 bg-white shadow-lg rounded-lg p-6 text-blue-300">
        {selectedItemName && (
          <>
            <h2 className="text-2xl font-semibold mb-4">Meal Ideas for {selectedItemName}</h2>
            <MealIdeas ingredient={selectedItemName} />
          </>
        )}
      </div>
    </div>
  );
};

export default Page;