export default function Item({ item }) {
  return (
    <div className="bg-black p-4 rounded-xl shadow-md border-l-4 border-blue-500">
      <h3 className="text-lg font-bold text-white-800">{item.name}</h3>
      <p className="text-white-600"><strong>Quantity:</strong> {item.quantity}</p>
      <p className="text-white-600"><strong>Category:</strong> {item.category}</p>
    </div>
  );
}

