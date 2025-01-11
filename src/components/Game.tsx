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
    <div className="min-h-screen flex bg-black">
      {/* Left Column */}
      <div className="w-[400px] flex flex-col p-6 border-r border-gray-800">
        {/* Header Section */}
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-center">
            <span className="title-gradient">点</span>
            <span className="text-white">与</span>
            <span className="title-gradient">线</span>
          </h1>
        </header>

        {/* Controls Section */}
        <div className="flex-1">
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

      {/* Right Column - Canvas */}
      <div className="flex-1 p-6 flex items-center justify-center">
        <div className="w-[800px] h-[600px] bg-white rounded-lg overflow-hidden">
          <GameCanvas 
            gameState={gameState}
            onCanvasClick={handleCanvasClick}
          />
        </div>
      </div>
    </div>
  );
}
