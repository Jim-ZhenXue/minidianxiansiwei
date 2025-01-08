import { Point } from '../types';
import { CANVAS, GAME, GRID } from '../constants';

function isNearGridLine(x: number, y: number): boolean {
  const cellWidth = CANVAS.WIDTH / GRID.COLS;
  const cellHeight = CANVAS.HEIGHT / GRID.ROWS;

  // Check horizontal grid lines
  for (let row = 1; row < GRID.ROWS; row++) {
    const gridY = row * cellHeight;
    if (Math.abs(y - gridY) < GAME.GRID_LINE_PADDING) {
      return true;
    }
  }

  // Check vertical grid lines
  for (let col = 1; col < GRID.COLS; col++) {
    const gridX = col * cellWidth;
    if (Math.abs(x - gridX) < GAME.GRID_LINE_PADDING) {
      return true;
    }
  }

  return false;
}

function getValidPointCoordinate(value: number, max: number): number {
  return Math.max(
    GAME.BOUNDARY_PADDING,
    Math.min(max - GAME.BOUNDARY_PADDING, value)
  );
}

export function generateRandomPoint(): Point {
  let x: number, y: number;
  let attempts = 0;
  const maxAttempts = 100;

  do {
    x = GAME.BOUNDARY_PADDING + Math.random() * (CANVAS.WIDTH - 2 * GAME.BOUNDARY_PADDING);
    y = GAME.BOUNDARY_PADDING + Math.random() * (CANVAS.HEIGHT - 2 * GAME.BOUNDARY_PADDING);
    attempts++;
  } while (isNearGridLine(x, y) && attempts < maxAttempts);

  // Ensure the point is within valid boundaries
  return {
    x: getValidPointCoordinate(x, CANVAS.WIDTH),
    y: getValidPointCoordinate(y, CANVAS.HEIGHT)
  };
}

export function generateRandomPointWithRetry(maxRetries = 3): Point {
  for (let i = 0; i < maxRetries; i++) {
    try {
      const point = generateRandomPoint();
      if (isFinite(point.x) && isFinite(point.y) && 
          point.x >= GAME.BOUNDARY_PADDING && 
          point.x <= CANVAS.WIDTH - GAME.BOUNDARY_PADDING &&
          point.y >= GAME.BOUNDARY_PADDING && 
          point.y <= CANVAS.HEIGHT - GAME.BOUNDARY_PADDING) {
        return point;
      }
      console.warn(`Invalid point generated on attempt ${i + 1}:`, point);
    } catch (error) {
      console.error(`Error generating point on attempt ${i + 1}:`, error);
    }
  }
  
  // Fallback to center of canvas if all retries fail
  console.warn('All point generation attempts failed, using fallback center point');
  return {
    x: CANVAS.WIDTH / 2,
    y: CANVAS.HEIGHT / 2
  };
}