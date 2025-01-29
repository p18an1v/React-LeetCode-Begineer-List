import React, { useState } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";

const QuestionItem = ({ question }) => (
  <Card className="flex items-center p-4 border-muted transition-all hover:bg-muted/50">
    <Checkbox id={`question-${question.id}`} className="mr-4" />
    <label htmlFor={`question-${question.id}`} className="text-foreground">
      <span className="font-medium">{question.title}</span> -
      <span className="font-semibold text-primary ml-1">{question.level}</span>
    </label>
  </Card>
);

const QuestionList = () => {
  const [openStops, setOpenStops] = useState({});
  const [openLets, setOpenLets] = useState({});

  const toggleStop = (stopId) => {
    setOpenStops((prev) => ({ ...prev, [stopId]: !prev[stopId] }));
  };

  const toggleLet = (letId) => {
    setOpenLets((prev) => ({ ...prev, [letId]: !prev[letId] }));
  };

  const stops = [
    {
      id: 1,
      title: "Basics",
      lets: [
        {
          id: 1,
          title: "Let 1: Sorting-!",
          questions: [
            { id: 1, title: "Two Sum", level: "Easy" },
            { id: 2, title: "Bubble Sort", level: "Easy" },
          ],
        },
        {
          id: 2,
          title: "Let 2: Sorting-!!",
          questions: [
            { id: 3, title: "Merge Sort", level: "Medium" },
            { id: 4, title: "Quick Sort", level: "Medium" },
          ],
        },
      ],
    },
  ];

  const totalQuestions = stops.reduce(
    (total, stop) =>
      total + stop.lets.reduce((letTotal, letItem) => letTotal + letItem.questions.length, 0),
    0
  );

  return (
    <div className="p-6 bg-background min-h-screen text-foreground">
      {/* Hero Section */}
      <Card className="relative p-6 bg-muted rounded-md shadow-lg mb-6">
        <CardHeader>
          <CardTitle className="text-4xl font-bold text-primary">Welcome to LeetCode Tracker</CardTitle>
          <p className="text-muted-foreground">
            Track your coding progress with structured questions and improve your problem-solving skills.
          </p>
        </CardHeader>
      </Card>

      {/* Question List */}
      <h2 className="text-2xl font-bold mb-4">Your Progress: 0/{totalQuestions}</h2>
      {stops.map((stop) => (
        <div key={stop.id} className="mb-6">
          <Card
            className="p-4 flex justify-between items-center cursor-pointer transition-all hover:bg-muted/50"
            onClick={() => toggleStop(stop.id)}
          >
            <CardTitle className="text-xl font-semibold">{stop.title}</CardTitle>
            <Button variant="ghost" size="icon">
              {openStops[stop.id] ? <ChevronDown /> : <ChevronRight />}
            </Button>
          </Card>

          {openStops[stop.id] && (
            <div className="mt-4 pl-4">
              {stop.lets.map((letItem) => (
                <div key={letItem.id} className="mb-4">
                  <Card
                    className="p-4 flex justify-between items-center cursor-pointer transition-all hover:bg-muted/50"
                    onClick={() => toggleLet(letItem.id)}
                  >
                    <CardTitle className="text-lg font-medium">{letItem.title}</CardTitle>
                    <Button variant="ghost" size="icon">
                      {openLets[letItem.id] ? <ChevronDown /> : <ChevronRight />}
                    </Button>
                  </Card>

                  {openLets[letItem.id] && (
                    <div className="mt-2 space-y-2 pl-4">
                      {letItem.questions.map((question) => (
                        <QuestionItem key={question.id} question={question} />
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default QuestionList;
