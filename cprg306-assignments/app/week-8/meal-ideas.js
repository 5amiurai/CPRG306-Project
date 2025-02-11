// meal-ideas.js
"use client";
import React, { useEffect, useState } from "react";

const fetchMealIdeas = async (ingredient) => {
  const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`);
  const data = await response.json();
  return data.meals || [];
};

const MealIdeas = ({ ingredient }) => {
  const [meals, setMeals] = useState([]);

  const loadMealIdeas = async () => {
    if (ingredient) {
      const fetchedMeals = await fetchMealIdeas(ingredient);
      setMeals(fetchedMeals);
    }
  };

  useEffect(() => {
    loadMealIdeas();
  }, [ingredient]);

  return (
    <div className="space-y-4">
      {meals.length === 0 ? (
        <div className="text-center text-lg text-gray-500">No meal ideas found for {ingredient}.</div>
      ) : (
        meals.map((meal) => (
          <div key={meal.idMeal} className="flex items-center p-4 bg-white shadow-md rounded-lg">
            <img
              src={meal.strMealThumb}
              alt={meal.strMeal}
              className="w-16 h-16 rounded-full object-cover mr-4"
            />
            <div>
              <p className="text-lg font-semibold">{meal.strMeal}</p>
              <a
                href={`https://www.themealdb.com/meal/${meal.idMeal}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline mt-2 block"
              >
                View Recipe
              </a>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default MealIdeas;
