import { GameMode } from './types';

export const CANVAS = {
  WIDTH: 800,
  HEIGHT: 600,
  GRID_SIZE: 20,
};

export const GAME = {
  POINT_SCORE: 10,
  TARGET_RANGE: 10,
  TARGET_HIT_DISTANCE: 10,
  GRID_LINE_PADDING: 20,
  BOUNDARY_PADDING: 40,
};

export const POINT_RADIUS: Record<GameMode, number> = {
  POINT: 5,
  LINE: 1.25,
  RAY: 1.25,
  DIRECTION: 1.25,
  ERASER: 1.25,
};

export const GRID = {
  COLOR: '#eee',
  LINE_WIDTH: 2,
  LINE_COLOR: '#eee',
  COLS: 3,
  ROWS: 3,
  CELL_WIDTH: Math.floor(CANVAS.WIDTH / 3),
  CELL_HEIGHT: Math.floor(CANVAS.HEIGHT / 3),
};

export const TARGET_POINT = {
  COLOR: {
    PRIMARY: '#ff0000',
    SECONDARY: '#ff6b6b',
    GLOW: 'rgba(255, 0, 0, 0.2)',
  },
  RADIUS: 5,
  INNER_RADIUS: 3,
  OUTER_RADIUS: 7,
  GLOW_RADIUS: 15,
  PULSE_SCALE: 1.2,
  PULSE_SPEED: 0.005,
};

export const ANIMATION = {
  FLASH_DURATION: 500,
  FLASH_INTERVAL: 50,
  ARROW: {
    DURATION: 1000,
    INTERVAL: 100,
    FLASH_DURATION: 1000,
    MIN_OPACITY: 0.2,
    MAX_OPACITY: 0.8,
  },
};

export const ARROW = {
  HEAD_LENGTH: 10,
  HEAD_ANGLE: Math.PI / 6,
  COLOR: '#000',
  LINE_WIDTH: 1,
  WIDTH: 1,
};

export const LINE_STYLE = {
  COLOR: '#000',
  WIDTH: 1,
};

export const RAY_STYLE = {
  COLOR: '#000',
  WIDTH: 1,
  DASH: [5, 5],
};
