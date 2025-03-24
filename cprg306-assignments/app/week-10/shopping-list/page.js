"use client";
import { useState, useEffect } from "react";
import { useUserAuth } from "../_utils/auth-context";
import Link from "next/link";
import NewItem from "./components/new-item";
import ItemList from "./components/item-list";
import MealIdeas from "./components/meal-ideas";
import { getItems, addItem } from "../_services/shopping-list-service";

export default function Page() {
  const { user, gitHubSignIn, firebaseSignOut } = useUserAuth();
  const [items, setItems] = useState([]);
  const [selectedItemName, setSelectedItemName] = useState("");

  // Load items from Firestore when component mounts and user is authenticated
  const loadItems = async () => {
    if (user) {
      try {
        const fetchedItems = await getItems(user.uid);
        setItems(fetchedItems);
      } catch (error) {
        console.error("Error loading items:", error);
      }
    }
  };

  useEffect(() => {
    loadItems();
  }, [user]);

  const handleItemSelect = (itemName) => {
    const cleanedName = itemName.split(",")[0].replace(/[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{1F700}-\u{1F77F}\u{1F780}-\u{1F7FF}\u{1F800}-\u{1F8FF}\u{1F900}-\u{1F9FF}\u{1FA00}-\u{1FA6F}\u{1FA70}-\u{1FAFF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{2300}-\u{23FF}\u{2B50}\u{2764}\u{1F49C}\u{1F495}\u{1F49D}\u{1F49B}\u{1F49A}\u{1F493}\u{1F498}\u{1F49E}\u{1F497}\u{1F496}\u{1F495}\u{1F495}\u{1F49F}\u{1F49F}\u{1F9E0}\u{1F9F1}\u{1F9E1}\u{1F9EB}\u{1F9E2}\u{1F9EC}\u{1F9ED}\u{1F9F5}\u{1F9F4}\u{1F9F6}\u{1F9F7}\u{1F9F8}\u{1F9F9}\u{1F9FA}\u{1F9FB}\u{1F9FC}\u{1F9FD}\u{1F9FE}\u{1F9FF}]/gu, "");
    setSelectedItemName(cleanedName);
  };

  const handleAddItem = async (newItem) => {
    if (user) {
      try {
        // Add item to Firestore
        const id = await addItem(user.uid, newItem);
        
        // Update local state with the new item including the Firestore document ID
        setItems([...items, { id, ...newItem }]);
      } catch (error) {
        console.error("Error adding item:", error);
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
      // Clear items when user signs out
      setItems([]);
      setSelectedItemName("");
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
              Shopping List App
            </h1>
            <p className="text-gray-600 mb-8">
              Manage your shopping items and get meal ideas
            </p>
          </div>

          <div className="space-y-6">
            <p className="text-center text-gray-700">
              Please sign in with GitHub to access your shopping list
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
            
            <div className="flex space-x-8">
              <div className="w-1/3 bg-white shadow-lg rounded-lg p-6 text-blue-300">
                <h2 className="text-2xl font-semibold mb-4">Add New Item</h2>
                <NewItem onAddItem={handleAddItem} />
                <h2 className="text-2xl font-semibold mt-8 mb-4 text-blue-300">Shopping List</h2>
                <ItemList items={items} onItemSelect={handleItemSelect} />
              </div>
              <div className="w-2/3 bg-white shadow-lg rounded-lg p-6 text-blue-300">
                {selectedItemName && (
                  <>
                    <h2 className="text-2xl font-semibold mb-4">Meal Ideas for {selectedItemName}</h2>
                    <MealIdeas ingredient={selectedItemName} />
                  </>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </main>
  );
}
