import { useState, useEffect } from "react";
// Imports React hooks: useState for managing state and useEffect for side effects
import './styles.css';
// Imports the CSS styles for the game

const API_URL = './api/wordle-words';
// Defines the API endpoint to fetch words from your Next.js API route
const WORD_LENGTH = 5;
// Sets the length of words in the game (Wordle uses 5-letter words)

export default function Game() {
    // Main Game component
    const [solution, setSolution] = useState('tokyo');
    
    // State for storing the solution word, initialized as empty string
    const [guesses, setGuesses] = useState(Array(6).fill(null));
    // State for storing player guesses, initialized as array of 6 nulls (6 attempts)
    const [currentGuess, setCurrentGuess] = useState('');
    // State for the current guess being typed, initialized as empty string
    const [isGameOver, setIsGameOver] = useState(false);
    // State to track if game is over, initialized as false

    useEffect(() => {
        // Effect hook that runs once when component mounts (empty dependency array)
        const fetchWord = async () => {
            // Async function to fetch a random word
            const response = await fetch(API_URL);
            // Fetches data from your API route
            const words = await response.json();
            // Parses the JSON response
            const randomWord = words[Math.floor(Math.random() * words.length)];
            // Selects a random word from the array
            // setSolution(randomWord);
            // Updates the solution state with the random word
        };

        fetchWord();
        
        
    }, []);
    // Empty dependency array means this effect runs once when component mounts

    useEffect(() => {
        // Effect for handling keyboard input
        const handleType = (event) => {
            // Function that runs on each keypress
            if (isGameOver) {
                return;
                // If game is over, ignore keyboard input
            }

            if (event.key === 'Enter') {
                // If Enter key is pressed
                if (currentGuess.length !== 5) {
                    return;
                    // If guess isn't 5 letters, do nothing
                }

                const newGuesses = [...guesses];
                // Create a copy of the guesses array
                const currentGuessIndex = guesses.findIndex(val => val === null);
                // Find the index of the first null value (empty guess slot)
                
                if (currentGuessIndex === -1) {
                    return;
                    // If no empty slots (all guesses used), do nothing
                }
                
                newGuesses[currentGuessIndex] = currentGuess;
                // Place the current guess in the empty slot
                setGuesses(newGuesses);
                // Update the guesses state
                setCurrentGuess('');
                // Reset current guess to empty string
                
                const isCorrect = solution === currentGuess;
                // Check if guess matches solution
                if (isCorrect || currentGuessIndex === guesses.length - 1) {
                    setIsGameOver(true);
                    // End game if correct guess or last attempt used
                }
                
                return;
            }

            if (event.key === 'Backspace') {
                // If Backspace key is pressed
                setCurrentGuess(currentGuess.slice(0, -1));
                // Remove the last character from current guess
                return;
            }

            // Only allow letters
            if (!/^[a-zA-Z]$/.test(event.key)) {
                return;
                // If key isn't a letter, do nothing
            }

            if (currentGuess.length >= 5) {
                return;
                // If current guess already has 5 letters, do nothing
            }

            setCurrentGuess(oldGuess => oldGuess + event.key.toLowerCase());
            // Add the pressed key (converted to lowercase) to current guess
        };

        window.addEventListener('keydown', handleType);
        // recording the players key presses
        return () => {
            window.removeEventListener('keydown', handleType);
            // stops recording the player's key presses
        };
    }, [currentGuess, isGameOver, solution, guesses]);
    // Re-run effect when these dependencies change

    return (
        <div className="board">
            {guesses.map((guess, i) => {
                
                const isCurrentGuess = i === guesses.findIndex(val => val === null);
                // Check if this is the current active guess row
                return (
                    <Line 
                        key={i} 
                        guess={isCurrentGuess ? currentGuess : guess ?? ""} 
                        // If current row, show current guess, else show saved guess or empty string
                        solution={solution}
                        // Pass solution for color comparison
                        isSubmitted={!isCurrentGuess && guess !== null}
                        // Mark as submitted if not current row and has a guess
                    />
                );
            })}
        </div>
    );
}

function Line({ guess, solution, isSubmitted }) {
    // Line component for a row of tiles
    const tiles = [];
    // Array to hold tile elements
    
    for (let i = 0; i < WORD_LENGTH; i++) {
        // Loop through each position in the word
        const char = guess[i];
        // Get character at this position
        let className = 'tile';
        // Start with base tile class
        
        if (isSubmitted) {
            // If this guess has been submitted
            if (char === solution[i]) {
                className += ' correct';
                // Add correct class if character matches position in solution
            } else if (solution.includes(char)) {
                className += ' present';
                // Add present class if character is in solution but wrong position
            } else {
                className += ' absent';
                // Add absent class if character is not in solution
            }
        } else if (char) {
            className += ' filled';
            // Add filled class if tile has a character but not submitted yet
        }
        
        tiles.push(
            <div key={i} className={className}>
                {char}
              
            </div>
        );
    }

    return <div className="line">{tiles}</div>;
    // Return the row of tiles
}