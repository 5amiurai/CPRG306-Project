import Item from "./item";
import {useState} from "react";

export default function ItemList({ items }) {
  const [sortBy, setSortBy] = useState("name");

  // Sorting logic
  const sortedItems = [...items].sort((a, b) => {
    if (sortBy === "name") {
      return a.name.localeCompare(b.name);
    } else if (sortBy === "category") {
      return a.category.localeCompare(b.category);
    }
    return 0;
  });

  return (
    <div>
      <div className="mb-4">
        <button
          onClick={() => setSortBy("name")}
          className={`px-4 py-2 mr-2 ${sortBy === "name" ? "bg-blue-500" : "bg-gray-300"}`}
        >
          Sort by Name
        </button>
        <button
          onClick={() => setSortBy("category")}
          className={`px-4 py-2 ${sortBy === "category" ? "bg-blue-500" : "bg-gray-300"}`}
        >
          Sort by Category
        </button>
      </div>
      <ul>
        {sortedItems.map((item) => (
          <Item
            key={item.id}
            name={item.name}
            quantity={item.quantity}
            category={item.category}
          />
        ))}
      </ul>
    </div>
  );
}