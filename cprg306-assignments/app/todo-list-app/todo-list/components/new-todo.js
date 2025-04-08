"use client";
import { useState } from "react";

export default function NewTodo({ onAddItem }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [importance, setImportance] = useState("medium");
  const [deadline, setDeadline] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    const newItem = {
      id: Math.random().toString(36).substring(2, 15), // generate a random id
      title,
      description,
      importance,
      deadline,
    };

    // Trigger the onAddItem function passed via props
    onAddItem(newItem);

    // Reset the form
    setTitle("");
    setDescription("");
    setImportance("medium");
    setDeadline("");
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4 space-y-3">
      <div>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Todo title"
          required
          className="w-full border p-2 rounded text-gray-700"
        />
      </div>
      <div>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
          className="w-full border p-2 rounded text-gray-700"
          rows="2"
        />
      </div>
      <div className="flex space-x-4">
        <div className="w-1/2">
          <label className="block text-sm font-medium text-gray-700 mb-1">Importance</label>
          <select
            value={importance}
            onChange={(e) => setImportance(e.target.value)}
            required
            className="w-full border p-2 rounded text-gray-700"
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>
        <div className="w-1/2">
          <label className="block text-sm font-medium text-gray-700 mb-1">Deadline</label>
          <input
            type="date"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
            className="w-full border p-2 rounded text-gray-700"
          />
        </div>
      </div>
      <button type="submit" className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors">
        Add Todo
      </button>
    </form>
  );
}
