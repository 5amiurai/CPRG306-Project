'use client';
import Game from '../components/Game';

export default function WordlePage() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Wordle Game</h1>
      <Game />
    </div>
  );
}