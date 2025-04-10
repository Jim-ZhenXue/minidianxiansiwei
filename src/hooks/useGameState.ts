import { useState, useCallback, useEffect } from 'react';
import { GameState, GameMode, Point } from '../types';
import { generateRandomPointWithRetry } from '../utils/pointGeneration';
import { isPointInRange } from '../utils/geometry';
import { CANVAS, GAME } from '../constants';
import { SoundManager } from '../utils/sounds';

export function useGameState() {
  const [state, setState] = useState<GameState>({
    mode: 'POINT',
    points: [],
    score: 0,
    level: 1,
    targetPoint: generateRandomPointWithRetry(),
    angle: 0,
    showGrid: false,
    showDirections: false,
  });

  // Ensure target point exists in POINT mode
  useEffect(() => {
    if (state.mode === 'POINT' && !state.targetPoint) {
      setState(prev => ({
        ...prev,
        targetPoint: generateRandomPointWithRetry()
      }));
    }
  }, [state.mode, state.targetPoint]);

  // Handle ray rotation
  const handleRayRotation = useCallback((angle: number) => {
    setState(prev => ({
      ...prev,
      angle
    }));
  }, []);

  const handleCanvasClick = useCallback(async (newPoint: Point) => {
    setState(prev => {
      if (prev.mode === 'POINT' && prev.targetPoint) {
        if (isPointInRange(newPoint, prev.targetPoint)) {
          // Hit the target - update score and generate new target
          SoundManager.play('success');
          return {
            ...prev,
            score: prev.score + GAME.POINT_SCORE,
            level: prev.level + 1,
            points: [],
            targetPoint: generateRandomPointWithRetry()
          };
        }
        // Missed the target - just add the point
        SoundManager.play('click');
        return {
          ...prev,
          points: [...prev.points, newPoint]
        };
      }
      
      // LINE mode - store two points to create a line
      if (prev.mode === 'LINE') {
        SoundManager.play('click');
        // If we have no points yet, this is the first point
        if (prev.points.length === 0) {
          return {
            ...prev,
            points: [newPoint]
          };
        }
        // If we already have one point, this is the second point
        if (prev.points.length === 1) {
          return {
            ...prev,
            points: [...prev.points, newPoint]
          };
        }
        // If we already have two points, add the new point while keeping existing points
        return {
          ...prev,
          points: [...prev.points, newPoint]
        };
      }

      // RAY mode - store two points (start point and direction point)
      if (prev.mode === 'RAY') {
        SoundManager.play('click');
        // If we have no points yet, this is the start point
        if (prev.points.length === 0) {
          return {
            ...prev,
            points: [newPoint]
          };
        }
        // If we already have the start point, this is the direction point
        if (prev.points.length === 1) {
          return {
            ...prev,
            points: [...prev.points, newPoint]
          };
        }
        // If we already have two points, add the new point while keeping existing points
        return {
          ...prev,
          points: [...prev.points, newPoint]
        };
      }

      // DIRECTION mode - add point
      if (prev.mode === 'DIRECTION') {
        SoundManager.play('click');
        // If we have no points yet, this is the first point
        if (prev.points.length === 0) {
          return {
            ...prev,
            points: [newPoint]
          };
        }
        // If we have one point, add the second point to create the infinite line
        if (prev.points.length === 1) {
          return {
            ...prev,
            points: [...prev.points, newPoint]
          };
        }
        // After drawing the infinite line, clicking should only keep the clicked point
        return {
          ...prev,
          points: [...prev.points, newPoint]
        };
      }

      // ERASER mode - clear all points
      if (prev.mode === 'ERASER') {
        SoundManager.play('erase');
        return {
          ...prev,
          points: []
        };
      }

      SoundManager.play('click');
      return {
        ...prev,
        points: [...prev.points, newPoint]
      };
    });
  }, []);

  const switchMode = useCallback(async (mode: GameMode) => {
    await SoundManager.play('switch');
    setState(prev => {
      // If switching to eraser, clear points and immediately switch back to previous mode
      if (mode === 'ERASER') {
        return {
          ...prev,
          points: [],
          // Keep the previous mode (or default to LINE if coming from ERASER)
          mode: prev.mode === 'ERASER' ? 'LINE' : prev.mode,
          angle: prev.mode === 'RAY' ? 0 : undefined,
          targetPoint: prev.mode === 'POINT' 
            ? generateRandomPointWithRetry()
            : null
        };
      }

      return {
        ...prev,
        mode,
        points: [],
        angle: mode === 'RAY' ? 0 : undefined,
        targetPoint: mode === 'POINT' 
          ? generateRandomPointWithRetry()
          : null
      };
    });
  }, []);

  // Handle grid toggle
  const toggleGrid = useCallback(() => {
    setState(prev => ({
      ...prev,
      showGrid: !prev.showGrid
    }));
  }, []);

  // Handle directions toggle
  const toggleDirections = useCallback(() => {
    setState(prev => ({
      ...prev,
      showDirections: !prev.showDirections
    }));
  }, []);

  return {
    gameState: state,
    handleCanvasClick,
    handleRayRotation,
    switchMode,
    toggleGrid,
    toggleDirections,
  };
}