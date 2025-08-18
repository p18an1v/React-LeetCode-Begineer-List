import React from "react";
import { Card } from "@/components/ui/card";

const ProgressCard = ({ completedCount, totalQuestions }) => {
  const percentage = totalQuestions ? Math.round((completedCount / totalQuestions) * 100) : 0;

  return (
    <Card className="p-4 bg-gradient-to-br from-black via-zinc-900 to-black rounded-xl shadow-lg border border-zinc-800 flex justify-between items-center mb-4">
      {/* Left Side */}
      <div>
        <h2 className="text-base font-semibold text-white tracking-wide">Progress</h2>
        <p className="text-sm text-gray-400">
          {completedCount} / {totalQuestions} Solved
        </p>
        <div className="w-28 h-2 bg-gray-800 rounded-full mt-2 overflow-hidden">
          <div
            className="h-2 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full transition-all duration-500 ease-out"
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>

      {/* Right Side Circle */}
      <div className="relative flex items-center justify-center w-14 h-14">
        <svg className="absolute w-full h-full -rotate-90">
          <circle
            cx="50%"
            cy="50%"
            r="45%"
            stroke="rgba(255,255,255,0.15)"
            strokeWidth="5"
            fill="transparent"
          />
          <circle
            cx="50%"
            cy="50%"
            r="45%"
            stroke="url(#gradient)"
            strokeWidth="5"
            strokeDasharray="283"
            strokeDashoffset={283 - (283 * percentage) / 100}
            strokeLinecap="round"
            fill="transparent"
            className="transition-all duration-500 ease-out"
          />
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#6366f1" />
              <stop offset="100%" stopColor="#a855f7" />
            </linearGradient>
          </defs>
        </svg>
        <span className="text-xs font-bold text-white">{percentage}%</span>
      </div>
    </Card>
  );
};

export default ProgressCard;


