import React from 'react';
import { GameControls } from './GameControls';
import { GameCanvas } from './Canvas/GameCanvas';
import { useGameState } from '../hooks/useGameState';
import { CANVAS } from '../constants';

export function Game() {
  const { 
    gameState, 
    handleCanvasClick, 
    handleRayRotation, 
    switchMode, 
    toggleGrid,
    toggleDirections
  } = useGameState();

  return (
    <div className="min-h-screen flex flex-col items-center bg-black">
      {/* Header Section */}
      <header className="w-[400px] p-4 mt-4">
        <h1 className="text-2xl font-bold text-center">
          <span className="title-gradient">点</span>
          <span className="text-white">与</span>
          <span className="title-gradient">线</span>
        </h1>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col gap-4 p-4">
        {/* Controls */}
        <div className="w-[400px] space-y-4">
          <GameControls 
            currentMode={gameState.mode}
            onModeChange={switchMode}
            score={gameState.score}
            level={gameState.level}
            showGrid={gameState.showGrid}
            showDirections={gameState.showDirections}
            onToggleGrid={toggleGrid}
            onToggleDirections={toggleDirections}
          />
        </div>

        {/* Canvas */}
        <div className="w-[400px] h-[300px] bg-white rounded-lg overflow-hidden">
          <GameCanvas 
            gameState={gameState}
            onCanvasClick={handleCanvasClick}
          />
        </div>
      </main>
    </div>
  );
}
