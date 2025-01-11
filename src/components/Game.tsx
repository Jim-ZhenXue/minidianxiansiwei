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
    <div className="h-[50vh] flex bg-black">
      {/* Left Column */}
      <div className="w-1/2 flex flex-col p-4 border-r border-gray-800">
        {/* Header Section */}
        <header className="mb-4">
          <h1 className="text-2xl font-bold text-center">
            <span className="title-gradient">点</span>
            <span className="text-white">与</span>
            <span className="title-gradient">线</span>
          </h1>
        </header>

        {/* Controls Section */}
        <div className="flex-1 flex items-center">
          <div className="w-full">
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
        </div>
      </div>

      {/* Right Column - Canvas */}
      <div className="w-1/2 p-4 flex items-center justify-center">
        <div className="w-full h-[45vh] bg-white rounded-lg overflow-hidden">
          <GameCanvas 
            gameState={gameState}
            onCanvasClick={handleCanvasClick}
          />
        </div>
      </div>
    </div>
  );
}
