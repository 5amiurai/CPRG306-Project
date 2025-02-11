export default function Item({ name, quantity, category }) {
    return (
      <li className="p-2 mb-2 border">
        <span>{name} - Quantity: {quantity} - Category: {category}</span>
      </li>
    );
  }