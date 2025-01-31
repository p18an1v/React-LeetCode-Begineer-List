import React from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Card } from "@/components/ui/card";

const QuestionItem = ({ question, isLoggedIn, completedQuestions, toggleQuestionStatus }) => {
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
        return "text-foreground";
    }
  };

  return (
    <Card className={`flex items-center p-5 border transition-all hover:bg-muted/50 ${isCompleted ? "border-green-600" : "border-muted"}`}>
      {isLoggedIn && (
        <Checkbox
          id={`question-${question.questionId}`}
          className="mr-4 w-5 h-5"
          checked={isCompleted}
          onCheckedChange={(checked) => toggleQuestionStatus(question.questionId, checked)}
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
          className="font-medium text-blue-500 hover:underline"
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