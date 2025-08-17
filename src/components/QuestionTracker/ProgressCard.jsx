import React from "react";
import { Card } from "@/components/ui/card";

const ProgressCard = ({ completedCount, totalQuestions }) => {
  return (
    <Card className="p-5 bg-black rounded-xl shadow-md border border-gray-800 flex justify-between items-center mb-4">
      {/* Left Side */}
      <div>
        <h2 className="text-lg font-semibold text-white tracking-wide">Progress</h2>
        <p className="text-sm text-gray-400">{completedCount} Solved</p>
        <p className="text-xs text-gray-500 italic">Keep it up 🚀</p>
      </div>

      {/* Right Side Circle */}
      <div className="flex items-center justify-center w-14 h-14 rounded-full border-2 border-white text-white text-base font-bold shadow-inner">
        {completedCount}
      </div>
    </Card>
  );
};

export default ProgressCard;
