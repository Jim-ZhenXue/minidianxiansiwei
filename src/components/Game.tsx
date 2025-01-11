import React, { useEffect, useState } from 'react';
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

  const [isLandscape, setIsLandscape] = useState(window.innerHeight < window.innerWidth);

  useEffect(() => {
    const handleOrientation = () => {
      setIsLandscape(window.innerHeight < window.innerWidth);
    };

    window.addEventListener('resize', handleOrientation);
    window.addEventListener('orientationchange', handleOrientation);

    return () => {
      window.removeEventListener('resize', handleOrientation);
      window.removeEventListener('orientationchange', handleOrientation);
    };
  }, []);

  if (!isLandscape) {
    return (
      <div className="fixed inset-0 bg-black flex items-center justify-center">
        <div className="text-white text-center p-4">
          <p className="text-xl">请旋转设备至横屏模式</p>
          <p className="mt-2">🔄</p>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black">
      <div className="h-[calc(100vh-100px)] w-[calc(100vw-100px)] flex">
        {/* Left Column */}
        <div className="w-1/2 flex flex-col p-3 border-r border-gray-800">
          {/* Header Section */}
          <header className="mb-2">
            <h1 className="text-xl font-bold text-center">
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
        <div className="w-1/2 p-3 flex items-center justify-center">
          <div className="w-full h-full bg-white rounded-lg overflow-hidden">
            <GameCanvas 
              gameState={gameState}
              onCanvasClick={handleCanvasClick}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
