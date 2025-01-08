import React, { useRef, useEffect, useCallback } from 'react';
import { Point, GameState } from '../../types';
import { drawGameElements } from './drawGameElements';
import { CANVAS } from '../../constants';

interface GameCanvasProps {
  gameState: GameState;
  onCanvasClick: (point: Point) => void;
}

export function GameCanvas({ gameState, onCanvasClick }: GameCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const animationFrameRef = useRef<number>();
  const lastRenderTimeRef = useRef<number>(0);

  // Optimized render function with time-based animation
  const render = useCallback((timestamp: number) => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    // Limit frame rate to reduce flickering
    const elapsed = timestamp - lastRenderTimeRef.current;
    if (elapsed > 16) { // Cap at ~60fps
      drawGameElements(ctx, gameState);
      lastRenderTimeRef.current = timestamp;
    }

    animationFrameRef.current = requestAnimationFrame(render);
  }, [gameState]);

  // Setup canvas and start animation
  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    // Set initial size
    canvas.width = CANVAS.WIDTH;
    canvas.height = CANVAS.HEIGHT;

    // Start animation loop
    animationFrameRef.current = requestAnimationFrame(render);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [render]);

  const handleClick = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    
    const x = (e.clientX - rect.left) * scaleX;
    const y = (e.clientY - rect.top) * scaleY;

    onCanvasClick({ x, y });
  }, [onCanvasClick]);

  return (
    <div ref={containerRef} className="w-full h-full flex items-center justify-center">
      <canvas
        ref={canvasRef}
        onClick={handleClick}
        className="w-full h-full rounded-lg"
        style={{ 
          imageRendering: 'crisp-edges'
        }}
      />
    </div>
  );
}