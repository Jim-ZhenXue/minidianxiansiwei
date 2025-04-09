import React, { useEffect, useState } from 'react';
import { GameControls } from './GameControls';
import { GameCanvas } from './Canvas/GameCanvas';
import { useGameState } from '../hooks/useGameState';
import { CANVAS } from '../constants';
import { SoundManager } from '../utils/sounds';

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
    // Initialize sound system with user interaction
    const initAudio = async () => {
      await SoundManager.init();
      // Play a silent sound to unlock audio
      await SoundManager.play('click');
    };

    const handleFirstInteraction = () => {
      initAudio();
      document.removeEventListener('click', handleFirstInteraction);
    };

    document.addEventListener('click', handleFirstInteraction);
    
    const handleOrientation = () => {
      setIsLandscape(window.innerHeight < window.innerWidth);
    };

    window.addEventListener('resize', handleOrientation);
    window.addEventListener('orientationchange', handleOrientation);

    return () => {
      window.removeEventListener('resize', handleOrientation);
      window.removeEventListener('orientationchange', handleOrientation);
      document.removeEventListener('click', handleFirstInteraction);
    };
  }, []);

  if (!isLandscape) {
    return (
      <div className="text-center p-4">
        <p className="text-xl">请旋转设备至横屏模式</p>
        <p className="mt-2">🔄</p>
      </div>
    );
  }

  return (
    <div className="w-[1200px] h-[600px] flex">
      {/* Left Column */}
      <div className="w-1/4 flex flex-col p-3 border-r border-gray-800">
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
      <div className="w-3/4 p-4 flex items-center justify-center">
        <div className="w-full h-full bg-white rounded-lg overflow-hidden mt-[10px]">
          <GameCanvas 
            gameState={gameState}
            onCanvasClick={handleCanvasClick}
          />
        </div>
      </div>
    </div>
  );
}
