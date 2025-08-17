import React from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Card } from "@/components/ui/card";

const QuestionItem = ({
  question,
  isLoggedIn,
  completedQuestions,
  toggleQuestionStatus,
}) => {
  const isCompleted = completedQuestions.includes(question.questionId);

  const getLevelColor = (level) => {
    switch (level.toLowerCase()) {
      case "easy":
        return "text-blue-500";
      case "medium":
        return "text-orange-500";
      case "hard":
        return "text-red-500";
      default:
        return "text-purple-500";
    }
  };

  return (
    <Card
      className={`flex items-center p-5 bg-black transition-all 
              border border-transparent hover:border-white/60 
              ${isCompleted ? "border-white/40" : "border-transparent"}`}
    >
      {isLoggedIn && (
        <Checkbox
          id={`question-${question.questionId}`}
          className="mr-4 w-5 h-5 border-2 border-white 
                 data-[state=unchecked]:bg-black 
                 data-[state=checked]:bg-white data-[state=checked]:text-black"
          checked={isCompleted}
          onCheckedChange={(checked) =>
            toggleQuestionStatus(question.questionId, checked)
          }
        />
      )}

      <label
        htmlFor={`question-${question.questionId}`}
        className="text-foreground flex justify-between w-full items-center"
      >
        <a
          href={question.url}
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium text-white hover:underline"
        >
          {question.questionName}
        </a>
        <span className={`font-medium ${getLevelColor(question.level)}`}>
          {question.level}
        </span>
      </label>
    </Card>
  );
};

export default QuestionItem;
