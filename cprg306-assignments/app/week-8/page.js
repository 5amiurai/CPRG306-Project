
import React, { useState } from 'react';
import ItemList from './item-list';
import MealIdeas from './meal-ideas';
import itemsData from './items.json'; // Assuming your items.json contains your shopping list

const Page = () => {
  const [selectedItemName, setSelectedItemName] = useState("");

  // Clean the item name by removing size and emoji
  const cleanItemName = (itemName) => {
    const cleanedName = itemName.split(",")[0].trim();
    return cleanedName.replace(/[^a-zA-Z0-9 ]/g, ""); // Remove emojis and other non-alphanumeric characters
  };

  const handleItemSelect = (itemName) => {
    const cleanedName = cleanItemName(itemName);
    setSelectedItemName(cleanedName);
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
      <div style={{ flex: 1 }}>
        <ItemList items={itemsData} onItemSelect={handleItemSelect} />
      </div>
      <div style={{ flex: 1 }}>
        {selectedItemName && <MealIdeas ingredient={selectedItemName} />}
      </div>
    </div>
  );
};

export default Page;
