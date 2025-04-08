"use client";

import React, { useState } from "react";
import TodoItem from "./todo-item";

const TodoList = ({ items, onItemSelect, onItemDelete }) => {
  const [sortBy, setSortBy] = useState("none");
  
  // Function to sort items based on selected criteria
  const getSortedItems = () => {
    if (!items || items.length === 0) return [];
    
    let sortedItems = [...items];
    
    switch (sortBy) {
      case "importance":
        // Sort by importance (high > medium > low)
        return sortedItems.sort((a, b) => {
          const importanceOrder = { high: 3, medium: 2, low: 1 };
          return importanceOrder[b.importance] - importanceOrder[a.importance];
        });
      case "deadline":
        // Sort by deadline (earliest first)
        return sortedItems.sort((a, b) => {
          if (!a.deadline) return 1;
          if (!b.deadline) return -1;
          return new Date(a.deadline) - new Date(b.deadline);
        });
      default:
        return sortedItems;
    }
  };

  return (
    <div>
      <div className="mb-4 flex justify-end">
        <label className="mr-2 text-sm font-medium text-gray-700">Sort by:</label>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="border rounded p-1 text-sm text-gray-700"
        >
          <option value="none">None</option>
          <option value="importance">Importance</option>
          <option value="deadline">Deadline</option>
        </select>
      </div>
      
      {items.length === 0 ? (
        <p className="text-center text-gray-500 py-4">No todos yet. Add one to get started!</p>
      ) : (
        <ul>
          {getSortedItems().map((item) => (
            <TodoItem
              key={item.id}
              id={item.id}
              title={item.title}
              description={item.description}
              importance={item.importance}
              deadline={item.deadline}
              onSelect={onItemSelect}
              onDelete={onItemDelete}
            />
          ))}
        </ul>
      )}
    </div>
  );
};

export default TodoList;
