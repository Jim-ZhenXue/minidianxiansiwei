export type Point = {
  x: number;
  y: number;
};

export type GameMode = 'POINT' | 'LINE' | 'DIRECTION' | 'RAY' | 'ERASER';

export interface GameState {
  mode: GameMode;
  points: Point[];
  score: number;
  level: number;
  targetPoint: Point | null;
  angle?: number; // For ray rotation
  showGrid: boolean; // Control grid visibility
  showDirections: boolean; // Control directions visibility
}
