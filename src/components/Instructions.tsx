import React from 'react';
import { GameMode } from '../types';

interface InstructionsProps {
  mode: GameMode;
}

const instructions: Record<GameMode, string> = {
  POINT: '在"点"模式下，你需要点击红色目标点来获得分数。目标点周围会显示空间位置标记（上、下、左、右、中），帮助你理解位置关系。每次成功点击目标点都会获得10分！',
  LINE: '在"线段"模式下，点击两个位置来创建一条线段。线段有起点和终点，长度有限。',
  RAY: '在"射线"模式下，点击两个位置来创建一条射线。射线有起点，从起点向一个方向无限延伸。',
  DIRECTION: '在"直线"模式下，点击两点来创建一个直线。',
  ERASER: '在"橡皮擦"模式下，点击可以擦除已绘制的内容。',
};

export function Instructions({ mode }: InstructionsProps) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-2xl max-w-md w-full mx-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
          <i className="fas fa-lightbulb text-yellow-500"></i>
          游戏说明
        </h2>
      </div>
      <div className="prose prose-sm">
        <p className="text-gray-600 leading-relaxed">{instructions[mode]}</p>
      </div>
    </div>
  );
}