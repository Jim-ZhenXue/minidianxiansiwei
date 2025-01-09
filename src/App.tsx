import React from 'react';
import { Game } from './components/Game';

export default function App() {
  return (
    <div className="fixed inset-0 bg-gray-100 overflow-hidden">
      <Game />
    </div>
  );
}