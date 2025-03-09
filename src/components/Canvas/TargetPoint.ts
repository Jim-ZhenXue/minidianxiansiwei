import { Point } from '../../types';
import { TARGET_POINT } from '../../constants';

interface DrawTargetPointOptions {
  ctx: CanvasRenderingContext2D;
  point: Point;
}

// Pre-calculate some values to avoid recalculation each frame
let lastTime = 0;
let currentScale = 1;
const updateInterval = 50; // Update scale every 50ms for smoother performance

function drawGlow(ctx: CanvasRenderingContext2D, point: Point) {
  // Only update the animation scale at intervals to improve performance
  const now = Date.now();
  if (now - lastTime > updateInterval) {
    const time = now / 1000;
    currentScale = 1 + TARGET_POINT.PULSE_SCALE * Math.sin(time * TARGET_POINT.PULSE_SPEED);
    lastTime = now;
  }
  
  // Simplified glow - faster rendering
  ctx.fillStyle = TARGET_POINT.COLOR.GLOW;
  ctx.globalAlpha = 0.5;
  ctx.beginPath();
  ctx.arc(point.x, point.y, TARGET_POINT.GLOW_RADIUS * currentScale, 0, Math.PI * 2);
  ctx.fill();
  ctx.globalAlpha = 1.0;
}

function drawTarget(ctx: CanvasRenderingContext2D, point: Point) {
  // Draw outer circle - combined path for better performance
  ctx.beginPath();
  ctx.fillStyle = TARGET_POINT.COLOR.SECONDARY;
  ctx.arc(point.x, point.y, TARGET_POINT.OUTER_RADIUS, 0, Math.PI * 2);
  ctx.fill();
  
  // Simple stroke without additional styling
  ctx.strokeStyle = TARGET_POINT.COLOR.PRIMARY;
  ctx.lineWidth = 2;
  ctx.stroke();

  // Draw inner circle
  ctx.beginPath();
  ctx.fillStyle = TARGET_POINT.COLOR.PRIMARY;
  ctx.arc(point.x, point.y, TARGET_POINT.INNER_RADIUS, 0, Math.PI * 2);
  ctx.fill();
}

export function drawTargetPoint({ ctx, point }: DrawTargetPointOptions) {
  // Quick validation without heavy operations
  if (!point || !isFinite(point.x) || !isFinite(point.y)) {
    return;
  }
  
  try {
    ctx.save();
    
    // Draw solid red dot first for immediate visual feedback
    ctx.beginPath();
    ctx.fillStyle = TARGET_POINT.COLOR.PRIMARY;
    ctx.arc(point.x, point.y, TARGET_POINT.INNER_RADIUS * 1.5, 0, Math.PI * 2);
    ctx.fill();
    
    // Then add the decorative elements
    drawTarget(ctx, point);
    drawGlow(ctx, point);
    
    ctx.restore();
  } catch (error) {
    console.error('Error drawing target point:', error);
  }
}