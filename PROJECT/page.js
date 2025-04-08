import { useState, useEffect } from "react";
import './styles.css';

const API_URL = 'https://api.frontendexpert.io/api/fe/wordle-words';
const WORD_LENGTH = 5;

export default function Game() {
    const [solution, setSolution] = useState('');
    const [guesses, setGuesses] = useState(Array(6).fill(null));
    const [currentGuess, setCurrentGuess] = useState('');
    const [isGameOver, setIsGameOver] = useState(false);

    useEffect(() => {
        const fetchWord = async () => {
            const response = await fetch(API_URL);
            const words = await response.json();
            const randomWord = words[Math.floor(Math.random() * words.length)];
            setSolution(randomWord);
        };

        fetchWord();
    }, []);

    useEffect(() => {
        const handleType = (event) => {
            if (isGameOver) {
                return;
            }

            if (event.key === 'Enter') {
                if (currentGuess.length !== 5) {
                    return;
                }

                const newGuesses = [...guesses];
                const currentGuessIndex = guesses.findIndex(val => val === null);
                
                if (currentGuessIndex === -1) {
                    return;
                }
                
                newGuesses[currentGuessIndex] = currentGuess;
                setGuesses(newGuesses);
                setCurrentGuess('');
                
                const isCorrect = solution === currentGuess;
                if (isCorrect || currentGuessIndex === guesses.length - 1) {
                    setIsGameOver(true);
                }
                
                return;
            }

            if (event.key === 'Backspace') {
                setCurrentGuess(currentGuess.slice(0, -1));
                return;
            }

            // Only allow letters
            if (!/^[a-zA-Z]$/.test(event.key)) {
                return;
            }

            if (currentGuess.length >= 5) {
                return;
            }

            setCurrentGuess(oldGuess => oldGuess + event.key.toLowerCase());
        };

        window.addEventListener('keydown', handleType);
        return () => {
            window.removeEventListener('keydown', handleType);
        };
    }, [currentGuess, isGameOver, solution, guesses]);

    return (
        <div className="board">
            {guesses.map((guess, i) => {
                const isCurrentGuess = i === guesses.findIndex(val => val === null);
                return (
                    <Line 
                        key={i} 
                        guess={isCurrentGuess ? currentGuess : guess ?? ""} 
                        solution={solution}
                        isSubmitted={!isCurrentGuess && guess !== null}
                    />
                );
            })}
        </div>
    );
}

function Line({ guess, solution, isSubmitted }) {
    const tiles = [];
    
    for (let i = 0; i < WORD_LENGTH; i++) {
        const char = guess[i];
        let className = 'tile';
        
        if (isSubmitted) {
            if (char === solution[i]) {
                className += ' correct';
            } else if (solution.includes(char)) {
                className += ' present';
            } else {
                className += ' absent';
            }
        } else if (char) {
            className += ' filled';
        }
        
        tiles.push(
            <div key={i} className={className}>
                {char}
            </div>
        );
    }

    return <div className="line">{tiles}</div>;
}