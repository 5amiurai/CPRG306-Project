"use client";
import { useState, useEffect } from "react";
import { useUserAuth } from "../_utils/auth-context";
import Link from "next/link";
import NewTodo from "./components/new-todo";
import TodoList from "./components/todo-list";
import { getItems, addItem, deleteItem } from "../_services/todo-list-service";

export default function Page() {
  const { user, gitHubSignIn, firebaseSignOut } = useUserAuth();
  const [todos, setTodos] = useState([]);
  const [selectedTodoId, setSelectedTodoId] = useState(null);

  // Load todos from Firestore when component mounts and user is authenticated
  const loadTodos = async () => {
    if (user) {
      try {
        const fetchedTodos = await getItems(user.uid);
        setTodos(fetchedTodos);
      } catch (error) {
        console.error("Error loading todos:", error);
      }
    }
  };

  useEffect(() => {
    loadTodos();
  }, [user]);

  const handleItemSelect = (todoId) => {
    setSelectedTodoId(todoId === selectedTodoId ? null : todoId);
  };

  const handleAddItem = async (newTodo) => {
    if (user) {
      try {
        // Add todo to Firestore
        const id = await addItem(user.uid, newTodo);
        
        // Update local state with the new todo including the Firestore document ID
        setTodos([...todos, { id, ...newTodo }]);
      } catch (error) {
        console.error("Error adding todo:", error);
      }
    }
  };

  const handleDeleteItem = async (todoId) => {
    if (user) {
      try {
        // Delete todo from Firestore
        await deleteItem(user.uid, todoId);
        
        // Update local state by removing the deleted todo
        setTodos(todos.filter(todo => todo.id !== todoId));
        
        // Clear selection if the deleted todo was selected
        if (selectedTodoId === todoId) {
          setSelectedTodoId(null);
        }
      } catch (error) {
        console.error("Error deleting todo:", error);
      }
    }
  };

  const handleSignIn = async () => {
    try {
      await gitHubSignIn();
    } catch (error) {
      console.error(error);
    }
  };

  const handleSignOut = async () => {
    try {
      await firebaseSignOut();
      // Clear todos when user signs out
      setTodos([]);
      setSelectedTodoId(null);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center p-8 bg-gray-100">
      {!user ? (
        <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-800 mb-2">
              Todo List App
            </h1>
            <p className="text-gray-600 mb-8">
              Manage your tasks with priorities and deadlines
            </p>
          </div>

          <div className="space-y-6">
            <p className="text-center text-gray-700">
              Please sign in with GitHub to access your todo list
            </p>

            <button
              onClick={handleSignIn}
              className="w-full flex items-center justify-center py-2 px-4 bg-gray-800 hover:bg-gray-900 text-white font-medium rounded-md transition-colors"
            >
              <svg
                className="w-5 h-5 mr-2"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                  clipRule="evenodd"
                />
              </svg>
              Sign in with GitHub
            </button>
          </div>
        </div>
      ) : (
        <>
          <div className="w-full max-w-5xl mb-8">
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center space-x-4">
                {user.photoURL && (
                  <img
                    src={user.photoURL}
                    alt="Profile"
                    className="w-10 h-10 rounded-full"
                  />
                )}
                <div>
                  <p className="font-medium">
                    Welcome, {user.displayName || user.email}
                  </p>
                  <p className="text-sm text-gray-500">Signed in with GitHub</p>
                </div>
              </div>
              <button
                onClick={handleSignOut}
                className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium rounded-md transition-colors"
              >
                Sign Out
              </button>
            </div>
            
            <div className="bg-white shadow-lg rounded-lg p-6">
              <h2 className="text-2xl font-semibold mb-4 text-gray-800">Todo List</h2>
              <div className="mb-8">
                <h3 className="text-lg font-medium mb-2 text-gray-700">Add New Todo</h3>
                <NewTodo onAddItem={handleAddItem} />
              </div>
              <div>
                <h3 className="text-lg font-medium mb-2 text-gray-700">Your Todos</h3>
                <TodoList 
                  items={todos} 
                  onItemSelect={handleItemSelect} 
                  onItemDelete={handleDeleteItem} 
                />
              </div>
            </div>
          </div>
        </>
      )}
    </main>
  );
}
