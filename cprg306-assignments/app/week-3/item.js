import React from 'react';

export default function Item (name, quantity, category){
  return (
    <li className="flex justify-between items-center border-b py-2">
      <span className="font-semibold">{name}</span>
      <span className="ml-4 text-gray-700">{quantity}</span>
      <span className="ml-4 text-gray-500 italic">{category}</span>
    </li>
  );
};
