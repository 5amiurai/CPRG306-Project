"user client";
// item-list.js
import React from "react";
import Item from "./item";

const ItemList = ({ items, onItemSelect }) => {
  return (
    <div>
      <ul>
        {items.map((item) => (
          <Item
            key={item.id}
            name={item.name}
            quantity={item.quantity}
            category={item.category}
            onSelect={onItemSelect}
          />
        ))}
      </ul>
    </div>
  );
};

export default ItemList;