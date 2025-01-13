import React from 'react';
import { Game } from './components/Game';

export default function App() {
  const handleBack = () => {
    window.history.back();
  };

  return (
    <div className="fixed inset-0 bg-gray-100 overflow-hidden flex items-center justify-center">
      <button
        onClick={handleBack}
        className="fixed top-4 left-4 px-2 py-1 text-white text-sm hover:opacity-80 z-50"
      >
        返回
      </button>
      <Game />
    </div>
  );
}