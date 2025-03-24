"use client";
import { useState } from "react";

export default function NewItem({ onAddItem }) {
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [category, setCategory] = useState("dairy");

  const handleSubmit = (event) => {
    event.preventDefault();

    const newItem = {
      id: Math.random().toString(36).substring(2, 15), // generate a random id
      name,
      quantity,
      category,
    };

    // Trigger the onAddItem function passed via props
    onAddItem(newItem);

    // Reset the form
    setName("");
    setQuantity(1);
    setCategory("dairy");
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4 ">
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Item name"
        required
        className="border p-2 mr-2 text-blue-300"
      />
      <input
        type="number"
        value={quantity}
        onChange={(e) => setQuantity(Number(e.target.value))}
        min="1"
        required
        className="border p-2 mr-2 text-blue-300"
      />
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        required
        className="border p-2 mr-2 text-blue-300"
      >
        <option value="dairy">Dairy</option>
        <option value="bakery">Bakery</option>
        <option value="produce">Produce</option>
        <option value="meat">Meat</option>
        <option value="canned goods">Canned Goods</option>
        <option value="dry goods">Dry Goods</option>
        <option value="household">Household</option>
      </select>
      <button type="submit" className="px-4 py-2 bg-blue-500 text-white">
        Add Item
      </button>
    </form>
  );
}
