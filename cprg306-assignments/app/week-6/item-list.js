"use client";
import { useState } from 'react';
import Item from './item';
import itemsData from './items.json';

export default function ItemList() {
  const [sortBy, setSortBy] = useState('name');
  const [groupByCategory, setGroupByCategory] = useState(false);

  // Sorting and grouping logic
  const sortedItems = itemsData.sort((a, b) => {
    if (sortBy === 'name') {
      return a.name.localeCompare(b.name);
    } else if (sortBy === 'category') {
      return a.category.localeCompare(b.category);
    }
    return 0;
  });

  const groupedItems = groupByCategory
    ? sortedItems.reduce((groups, item) => {
        if (!groups[item.category]) {
          groups[item.category] = [];
        }
        groups[item.category].push(item);
        return groups;
      }, {})
    : { 'All Items': sortedItems };

  return (
    <div>
      <div className="mb-4">
        <button
          onClick={() => setSortBy('name')}
          className={`px-4 py-2 mr-2 ${sortBy === 'name' ? 'bg-blue-500' : 'bg-gray-300'}`}
        >
          Sort by Name
        </button>
        <button
          onClick={() => setSortBy('category')}
          className={`px-4 py-2 mr-2 ${sortBy === 'category' ? 'bg-blue-500' : 'bg-gray-300'}`}
        >
          Sort by Category
        </button>
        <button
          onClick={() => setGroupByCategory(!groupByCategory)}
          className={`px-4 py-2 ${groupByCategory ? 'bg-blue-500' : 'bg-gray-300'}`}
        >
          Group by Category
        </button>
      </div>

      {Object.keys(groupedItems).map((category) => (
        <div key={category} className="mb-6">
          <h2 className="font-semibold capitalize">{category}</h2>
          <ul>
            {groupedItems[category].map((item) => (
              <Item
                key={item.id}
                name={item.name}
                quantity={item.quantity}
                category={item.category}
              />
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}