import React from "react";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";

const ProgressCard = ({ completedCount, totalQuestions }) => {
  return (
    <Card className="relative p-6 bg-muted rounded-md shadow-lg mb-6">
      <CardHeader>
        <CardTitle className="text-4xl font-bold text-primary">Welcome to LeetCode Begineer List</CardTitle>
        <p className="text-muted-foreground">
          Track your coding progress with structured questions and improve your problem-solving skills.
        </p>
      </CardHeader>
      <h2 className="text-2xl font-bold mb-4">Solved: {completedCount}</h2>
    </Card>
  );
};

export default ProgressCard;