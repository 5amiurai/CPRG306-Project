"use client";
import { useState } from "react";

export default function ShoppingList() {
  const [items, setItems] = useState([
    { name: "Bread 🍞", category: "Bakery", quantity: 2 },
    { name: "Pasta Sauce 🍝", category: "Canned Goods", quantity: 3 },
    { name: "Milk, 4 L 🥛", category: "Dairy", quantity: 1 },
    { name: "Eggs, Dozen 🥚", category: "Dairy", quantity: 2 },
    { name: "Spaghetti, 454 g 🍝", category: "Dry Goods", quantity: 2 },
    { name: "Toilet Paper, 12 Pack 🧻", category: "Household", quantity: 1 },
    { name: "Paper Towels, 6 Pack", category: "Household", quantity: 1 },
    { name: "Dish Soap 🍽️", category: "Household", quantity: 1 },
    { name: "Hand Soap 🧼", category: "Household", quantity: 4 },
    { name: "Chicken Breasts, 1 kg 🍗", category: "Meat", quantity: 1 },
    { name: "Bananas 🍌", category: "Produce", quantity: 6 },
    { name: "Broccoli 🥦", category: "Produce", quantity: 3 },
  ]);

  const [sortBy, setSortBy] = useState("name");
  const [newItem, setNewItem] = useState({ name: "", category: "Produce", quantity: 1 });

  // Handle new item addition
  const addItem = (e) => {
    e.preventDefault();
    if (!newItem.name.trim()) return;
    setItems([...items, newItem]);
    setNewItem({ name: "", category: "Produce", quantity: 1 });
  };

  // Handle sorting logic
  const sortedItems = [...items].sort((a, b) => {
    if (sortBy === "name") return a.name.localeCompare(b.name);
    if (sortBy === "category") return a.category.localeCompare(b.category);
    return 0;
  });

  return (
    <main className="bg-slate-950 p-4 m-2 text-white">
      <div className="max-w-sm w-full">
        <h2 className="text-3xl font-bold mb-4">Shopping List</h2>

        {/* Form for adding new items */}
        <form onSubmit={addItem} className="p-4 bg-slate-900 text-black max-w-sm w-full rounded-lg">
          <div className="mb-2">
            <input
              type="text"
              placeholder="Item name"
              required
              className="w-full mt-1 border-2 border-gray-300 p-2 rounded-lg font-sans"
              value={newItem.name}
              onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
            />
          </div>

          {/* Quantity Selector */}
          <div className="flex justify-between">
            <div className="p-2 bg-white rounded-md w-36 flex justify-between">
              <span className="text-black">{newItem.quantity}</span>
              <div className="flex">
                <button
                  type="button"
                  className="w-8 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-700 disabled:bg-gray-400"
                  onClick={() =>
                    setNewItem({ ...newItem, quantity: Math.max(1, newItem.quantity - 1) })
                  }
                  disabled={newItem.quantity === 1}
                >
                  -
                </button>
                <button
                  type="button"
                  className="w-8 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-700 ml-1"
                  onClick={() => setNewItem({ ...newItem, quantity: newItem.quantity + 1 })}
                >
                  +
                </button>
              </div>
            </div>

            {/* Category Selector */}
            <select
              className="ml-1 border-2 border-gray-300 p-2 rounded-lg font-sans"
              value={newItem.category}
              onChange={(e) => setNewItem({ ...newItem, category: e.target.value })}
            >
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

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full mt-4 py-2 px-4 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-700"
          >
            +
          </button>
        </form>

        {/* Sorting Options */}
        <div className="mt-8">
          <label className="mr-2">Sort by:</label>
          <button
            className={`p-2 mx-2 w-28 rounded-lg ${
              sortBy === "name" ? "bg-orange-500" : "bg-orange-700 hover:bg-orange-600"
            }`}
            onClick={() => setSortBy("name")}
          >
            Name
          </button>
          <button
            className={`p-2 mx-2 w-28 rounded-lg ${
              sortBy === "category" ? "bg-orange-500" : "bg-orange-700 hover:bg-orange-600"
            }`}
            onClick={() => setSortBy("category")}
          >
            Category
          </button>
        </div>

        {/* Shopping List Display */}
        <ul>
          {sortedItems.map((item, index) => (
            <li key={index} className="p-2 my-4 bg-slate-900 max-w-sm rounded-lg">
              <h2 className="text-xl font-bold">{item.name}</h2>
              <div className="text-sm">
                Buy {item.quantity} in {item.category.toLowerCase()}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
