const TodoItem = ({ id, title, description, importance, deadline, onSelect, onDelete }) => {
  // Function to determine the importance badge color
  const getImportanceColor = (importance) => {
    switch (importance) {
      case 'high':
        return 'bg-red-100 text-red-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'low':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // Format the deadline date
  const formatDate = (dateString) => {
    if (!dateString) return 'No deadline';
    
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <li className="p-4 mb-4 bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition duration-200">
      <div className="flex items-center justify-between">
        <div className="flex-1" onClick={() => onSelect(id)}>
          <div className="flex items-center space-x-2">
            <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
            <span className={`px-2 py-1 text-xs font-medium rounded-full ${getImportanceColor(importance)}`}>
              {importance}
            </span>
          </div>
          {description && <p className="mt-1 text-sm text-gray-600">{description}</p>}
          <p className="mt-2 text-xs text-gray-500">Deadline: {formatDate(deadline)}</p>
        </div>
        <button 
          onClick={() => onDelete(id)} 
          className="ml-2 p-1 text-red-600 hover:text-red-800 hover:bg-red-100 rounded-full transition-colors"
          aria-label="Delete todo"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </button>
      </div>
    </li>
  );
};

export default TodoItem;
