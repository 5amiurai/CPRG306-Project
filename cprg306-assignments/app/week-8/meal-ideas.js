// meal-ideas.js

"use client";
import React, { useState, useEffect } from "react";

// Fetch meal ideas based on ingredient
const fetchMealIdeas = async (ingredient) => {
  try {
    const response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`
    );
    const data = await response.json();
    return data.meals || [];
  } catch (error) {
    console.error("Failed to fetch meal ideas:", error);
    return [];
  }
};

const MealIdeas = ({ ingredient }) => {
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(false);

  // Function to load meal ideas based on ingredient
  const loadMealIdeas = async () => {
    if (!ingredient) {
      setMeals([]);  // Clear meals if no ingredient
      return;
    }
    
    setLoading(true);
    const fetchedMeals = await fetchMealIdeas(ingredient);
    setMeals(fetchedMeals);
    setLoading(false);
  };

  useEffect(() => {
    const loadMealIdeas = async () => {
      if (ingredient) {
        const fetchedMeals = await fetchMealIdeas(ingredient);
        setMeals(fetchedMeals);
      }
    };
    
    loadMealIdeas();
  }, [ingredient]);  // No need to include loadMealIdeas here

  return (
    <div>
      <h3>Meal Ideas for {ingredient}</h3>
      {loading ? (
        <p>Loading...</p>
      ) : meals.length > 0 ? (
        <ul>
          {meals.map((meal) => (
            <li key={meal.idMeal}>
              <h4>{meal.strMeal}</h4>
              <img src={meal.strMealThumb} alt={meal.strMeal} width="100" />
            </li>
          ))}
        </ul>
      ) : (
        <p>no </p>
      )}
    </div>
  );
};

export default MealIdeas;