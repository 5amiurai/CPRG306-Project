// item.js
const Item = ({ name, quantity, category, onSelect }) => {
  return (
    <li
      onClick={() => onSelect(name)}
      className="p-4 mb-4 bg-gray-100 hover:bg-gray-200 rounded-lg cursor-pointer transition duration-200"
    >
      <div className="flex items-center justify-between">
        <strong className="text-lg">{name}</strong>
        <span className="text-sm text-gray-600">({category})</span>
      </div>
      <p className="text-sm text-gray-500">{quantity}</p>
    </li>
  );
};

export default Item;
