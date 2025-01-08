export type GameMode = 'POINT' | 'LINE' | 'DIRECTION' | 'ERASER';

export interface Point {
  x: number;
  y: number;
}

export interface GameState {
  mode: GameMode;
  points: Point[];
  score: number;
  level: number;
  targetPoint: Point | null;
  showGrid: boolean;
  showDirections: boolean;
}