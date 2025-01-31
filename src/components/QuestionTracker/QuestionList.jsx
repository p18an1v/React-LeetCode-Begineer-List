import React, { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import api from "@/services/api";
import { getTopics, getPatterns, getUserProgress, trackQuestionProgress } from "@/services/userService";
import QuestionItem from "./QuestionItem";
import StopCard from "./StopCard";
import ProgressCard from "./ProgressCard";
import TopicPatternDropdown from "./TopicPatternDropdown";

const QuestionList = ({ isLoggedIn, userId }) => {
  const [openStops, setOpenStops] = useState({});
  const [stops, setStops] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [completedQuestions, setCompletedQuestions] = useState([]);
  const [selectedType, setSelectedType] = useState("topics");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = selectedType === "topics" ? await getTopics() : await getPatterns();
        if (response.data && Array.isArray(response.data)) {
          const stopsWithQuestions = await Promise.all(
            response.data.map(async (stop) => {
              const questionsResponse = await api.get(
                selectedType === "topics"
                  ? `auth/topics/${stop.id}/questions`
                  : `auth/patterns/${stop.id}/questions`
              );
              return {
                id: stop.id,
                title: selectedType === "topics" ? stop.dataStructure : stop.pattern,
                questions: questionsResponse.data || [],
              };
            })
          );
          setStops(stopsWithQuestions);
        } else {
          setError("Invalid data format received from the server.");
        }
      } catch (err) {
        setError("Failed to fetch data. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [selectedType]);

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

  const toggleQuestionStatus = async (questionId, checked) => {
    try {
      await trackQuestionProgress(userId, questionId, checked);
      setCompletedQuestions((prev) =>
        checked ? [...prev, questionId] : prev.filter((id) => id !== questionId)
      );
    } catch (err) {
      console.error("Error updating question progress:", err);
    }
  };

  const totalQuestions = stops.reduce((total, stop) => total + stop.questions.length, 0);
  const completedCount = completedQuestions.length;

  const isTopicCompleted = (questions) => {
    return questions.every((question) => completedQuestions.includes(question.questionId));
  };

  if (loading) {
    return <div className="p-6 text-foreground">Loading...</div>;
  }

  if (error) {
    return <div className="p-6 text-red-500">{error}</div>;
  }

  return (
    <div className="p-6 bg-[#D3D4DD] min-h-screen text-foreground">
      <ProgressCard completedCount={completedCount} totalQuestions={totalQuestions} />
      <TopicPatternDropdown selectedType={selectedType} setSelectedType={setSelectedType} />
      {stops.map((stop) => (
        <div key={stop.id} className="mb-6">
          <StopCard
            stop={stop}
            isOpen={openStops[stop.id]}
            isCompleted={isTopicCompleted(stop.questions)}
            toggleStop={() => toggleStop(stop.id)}
          />
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