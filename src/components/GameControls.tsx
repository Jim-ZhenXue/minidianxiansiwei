import React, { useState } from 'react';
import { GameMode } from '../types';
import { Instructions } from './Instructions';

// Add eraser icon component
const EraserIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
    <path d="M8.086 2.207a2 2 0 0 1 2.828 0l3.879 3.879a2 2 0 0 1 0 2.828l-5.5 5.5A2 2 0 0 1 7.879 15H5.12a2 2 0 0 1-1.414-.586l-2.5-2.5a2 2 0 0 1 0-2.828l6.879-6.879zm.66 11.34L3.453 8.254 1.914 9.793a1 1 0 0 0 0 1.414l2.5 2.5a1 1 0 0 0 .707.293H7.88a1 1 0 0 0 .707-.293l5.5-5.5a1 1 0 0 0 0-1.414L10.208 3.414a1 1 0 0 0-1.414 0L8.086 4.121l4.457 4.457z"/>
  </svg>
);

interface GameControlsProps {
  currentMode: GameMode;
  onModeChange: (mode: GameMode) => void;
  score: number;
  level: number;
  showGrid: boolean;
  showDirections: boolean;
  onToggleGrid: () => void;
  onToggleDirections: () => void;
}

export function GameControls({ 
  currentMode, 
  onModeChange, 
  score, 
  level, 
  showGrid,
  showDirections,
  onToggleGrid,
  onToggleDirections 
}: GameControlsProps) {
  const [showInstructions, setShowInstructions] = useState(false);

  return (
    <div className="bg-gradient-to-br from-indigo-600 to-purple-700 p-6 rounded-xl shadow-xl text-white">
      {/* Game Stats Panel */}
      <div className="mb-6">
        <div className="bg-white/10 p-4 rounded-lg backdrop-blur-sm flex items-center justify-between">
          <div className="text-yellow-300 text-lg font-semibold">得分</div>
          <div className="text-3xl font-bold text-yellow-400">{score}</div>
        </div>
      </div>

      {/* Mode Selection */}
      <div className="mb-6">
        <div className="flex flex-wrap gap-2">
          {[
            { mode: 'POINT' as GameMode, label: '点' },
            { mode: 'LINE' as GameMode, label: '线段' },
            { mode: 'DIRECTION' as GameMode, label: '直线' },
            { mode: 'RAY' as GameMode, label: '射线' },
            { mode: 'ERASER' as GameMode, label: '橡皮擦', icon: <EraserIcon /> },
          ].map(({ mode, label, icon }) => (
            <button
              key={mode}
              onClick={() => onModeChange(mode)}
              className={`
                flex-1 min-w-[70px] p-2 rounded-lg transition-all duration-200
                flex flex-row items-center justify-center gap-2
                ${currentMode === mode
                  ? 'bg-yellow-400 text-purple-900 shadow-lg'
                  : 'bg-white/10 hover:bg-white/20 backdrop-blur-sm'
                }
              `}
            >
              {icon && <span className="w-4 h-4">{icon}</span>}
              <span className="font-medium text-xs">{label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Toggle Buttons */}
      <div className="flex gap-2">
        <button
          onClick={onToggleGrid}
          className={`
            flex-1 p-3 rounded-lg transition-all duration-200
            flex items-center justify-center gap-2
            ${showGrid
              ? 'bg-yellow-400 text-purple-900'
              : 'bg-white/10 hover:bg-white/20'
            }
          `}
        >
          <span className="text-lg">{showGrid ? '⊞' : '⊡'}</span>
          <span className="font-medium text-xs">{showGrid ? '隐藏网络' : '显示网络'}</span>
        </button>

        <button
          onClick={onToggleDirections}
          className={`
            flex-1 p-3 rounded-lg transition-all duration-200
            flex items-center justify-center gap-2
            ${showDirections
              ? 'bg-yellow-400 text-purple-900'
              : 'bg-white/10 hover:bg-white/20'
            }
          `}
        >
          <span className="text-lg">🧭</span>
          <span className="font-medium text-xs">{showDirections ? '隐藏方位' : '显示方位'}</span>
        </button>

        <button
          onClick={() => setShowInstructions(true)}
          className="flex-1 p-3 rounded-lg bg-white/10 hover:bg-white/20 transition-all duration-200 flex items-center justify-center gap-2"
        >
          <span className="text-lg">💡</span>
          <span className="font-medium text-xs">游戏提示</span>
        </button>
      </div>

      {/* Instructions Modal */}
      {showInstructions && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" onClick={() => setShowInstructions(false)}>
          <div className="relative" onClick={e => e.stopPropagation()}>
            <Instructions mode={currentMode} />
          </div>
        </div>
      )}
    </div>
  );
}