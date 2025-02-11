"use client";
import { useState } from "react";

export default function NewItem() {
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [category, setCategory] = useState("produce");

  const increment = () => {
    setQuantity(quantity + 1);
  };
  const decrement = () => {
    setQuantity(quantity - 1);
  };

  return (
    <form className="p-2 m-4 bg-slate-900 text-black max-w-sm w-full rounded-lg shadow-md">
      <div className="mb-2">
        <input
          type="text"
          placeholder="Item Name"
          required
          className="w-full mt-1 border-2 border-gray-300 p-2 rounded-lg font-sans text-black"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <div className="flex justify-between">
        <div className="p-2 mt-1 mb-1 rounded-md bg-white text-white w-36">
          <div className="flex justify-between">
            <span className="text-black">{quantity}</span>
            <div className="flex">
              
              <button
                type="button"
                className="w-8 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 ml-1 disabled:bg-gray-400"
                onClick={increment}
                disabled={quantity >= 20}
              >
                +
              </button>
              <button
                type="button"
                className="w-8 bg-red-500 text-white font-semibold rounded-lg shadow-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-75 ml-1 disabled:bg-gray-400"
                onClick={decrement}
                disabled={quantity <= 1}
              >
                -
              </button>
            </div>
          </div>
        </div>

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="ml-1 border-2 border-gray-300 p-2 rounded-lg font-sans text-black"
        >
          <option value="produce">Produce</option>
          <option value="dairy">dairy</option>
          <option value="bakery">Bakery</option>
          <option value="meat">Meat</option>
          <option value="frozen foods">Frozen Foods</option>
          <option value="canned goods">Canned goods</option>
          <option value="dry goods">Dry Goods</option>
          <option value="beverages">Beverages</option>
          <option value="snacks">Snacks</option>
          <option value="household">Houshold</option>
          <option value="other">Other</option>
        </select>
      </div>
      
<button
            type="submit"
            className="w-full mt-4 py-2 px-4 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
         >
            +
        </button>
    </form>
  );
}

