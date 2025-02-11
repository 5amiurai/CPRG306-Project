// item.js
import React from 'react';

const Item = ({ name, category, onSelect }) => {
  return (
    <li onClick={() => onSelect(name)} className="cursor-pointer">
      <h2>{name}</h2>
      <div>{category}</div>
    </li>
  );
};

export default Item;
