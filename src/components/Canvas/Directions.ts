import { CANVAS, GRID } from '../../constants';

export function drawDirections(ctx: CanvasRenderingContext2D) {
  const cellWidth = CANVAS.WIDTH / GRID.COLS;
  const cellHeight = CANVAS.HEIGHT / GRID.ROWS;

  ctx.save();
  ctx.font = '14px Arial';
  ctx.fillStyle = 'rgba(128, 128, 128, 0.6)';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';

  // Calculate cell centers
  const topCenterX = CANVAS.WIDTH / 2;
  const topCenterY = cellHeight / 2;

  const bottomCenterX = CANVAS.WIDTH / 2;
  const bottomCenterY = CANVAS.HEIGHT - cellHeight / 2;

  const leftCenterX = cellWidth / 2;
  const leftCenterY = CANVAS.HEIGHT / 2;

  const rightCenterX = CANVAS.WIDTH - cellWidth / 2;
  const rightCenterY = CANVAS.HEIGHT / 2;

  const centerX = CANVAS.WIDTH / 2;
  const centerY = CANVAS.HEIGHT / 2;

  // Draw labels at cell centers
  ctx.fillText('上', topCenterX, topCenterY);
  ctx.fillText('下', bottomCenterX, bottomCenterY);
  ctx.fillText('左', leftCenterX, leftCenterY);
  ctx.fillText('右', rightCenterX, rightCenterY);
  ctx.fillText('中', centerX, centerY);

  ctx.restore();
}
