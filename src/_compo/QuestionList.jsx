import React, { useState, useEffect } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { getTopics, getUserProgress, trackQuestionProgress } from "@/services/api";
import api from "@/services/api";

const QuestionItem = ({ question, isLoggedIn, completedQuestions, toggleQuestionStatus }) => {
  const isCompleted = completedQuestions.includes(question.questionId);

  return (
    <Card className={`flex items-center p-4 border transition-all hover:bg-muted/50 ${isCompleted ? "border-green-500" : "border-muted"}`}>
      {isLoggedIn && (
        <Checkbox
          id={`question-${question.questionId}`}
          className="mr-4"
          checked={isCompleted}
          onCheckedChange={() => toggleQuestionStatus(question.questionId)}
        />
      )}
      <label htmlFor={`question-${question.questionId}`} className="text-foreground">
        <a href={question.url} target="_blank" rel="noopener noreferrer" className="font-medium text-blue-500 hover:underline">
          {question.questionName}
        </a>
      </label>
    </Card>
  );
};

const QuestionList = ({ isLoggedIn, userId }) => {
  const [openStops, setOpenStops] = useState({});
  const [stops, setStops] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [completedQuestions, setCompletedQuestions] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getTopics();
        if (response.data && Array.isArray(response.data)) {
          const topicsWithQuestions = await Promise.all(
            response.data.map(async (topic) => {
              const questionsResponse = await api.get(`/topics/${topic.id}/questions`);
              return {
                id: topic.id,
                title: topic.dataStructure,
                questions: questionsResponse.data || [],
              };
            })
          );
          setStops(topicsWithQuestions);
        } else {
          setError("Invalid data format received from the server.");
        }
      } catch (err) {
        setError("Failed to fetch topics. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (isLoggedIn && userId) {
      getUserProgress(userId).then((response) => {
        setCompletedQuestions(response.data.completedQuestions || []);
      });
    }
  }, [isLoggedIn, userId]);

  const toggleStop = (stopId) => {
    setOpenStops((prev) => ({ ...prev, [stopId]: !prev[stopId] }));
  };

  const toggleQuestionStatus = async (questionId) => {
    try {
      const isCompleted = completedQuestions.includes(questionId);
      await trackQuestionProgress(userId, questionId, !isCompleted);
      setCompletedQuestions((prev) =>
        isCompleted ? prev.filter((id) => id !== questionId) : [...prev, questionId]
      );
    } catch (err) {
      console.error("Error updating question progress:", err);
    }
  };

  const totalQuestions = stops.reduce((total, stop) => total + stop.questions.length, 0);
  const completedCount = completedQuestions.length;

  if (loading) {
    return <div className="p-6 text-foreground">Loading...</div>;
  }

  if (error) {
    return <div className="p-6 text-red-500">{error}</div>;
  }

  return (
    <div className="p-6 bg-background min-h-screen text-foreground">
      <Card className="relative p-6 bg-muted rounded-md shadow-lg mb-6">
        <CardHeader>
          <CardTitle className="text-4xl font-bold text-primary">Welcome to LeetCode Tracker</CardTitle>
          <p className="text-muted-foreground">
            Track your coding progress with structured questions and improve your problem-solving skills.
          </p>
        </CardHeader>
      </Card>
      <h2 className="text-2xl font-bold mb-4">Your Progress: {completedCount}/{totalQuestions}</h2>
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
            <div className="mt-4 pl-4 space-y-2">
              {stop.questions.map((question) => (
                <QuestionItem
                  key={question.questionId}
                  question={question}
                  isLoggedIn={isLoggedIn}
                  completedQuestions={completedQuestions}
                  toggleQuestionStatus={toggleQuestionStatus}
                />
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default QuestionList;


