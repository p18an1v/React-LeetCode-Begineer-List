import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import TopicsTable from "@/components/admin/TopicsTable";
import PatternsTable from "@/components/admin/PatternsTable";
import QuestionsTable from "@/components/admin/QuestionsTable";
import AddTopicModal from "@/components/admin/AddTopicModal";
import UpdateTopicModal from "@/components/admin/UpdateTopicModal";
import AddPatternModal from "@/components/admin/AddPatternModal";
import UpdatePatternModal from "@/components/admin/UpdatePatternModal";
import AddQuestionModal from "@/components/admin/AddQuestionModal";
import UpdateQuestionModal from "@/components/admin/UpdateQuestionModal";
import api, { API_ADMIN_URL, API_AUTH_URL } from "@/services/api";

const AdminPage = () => {
  const [topics, setTopics] = useState([]);
  const [patterns, setPatterns] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [selectedPattern, setSelectedPattern] = useState(null);
  const [newTopic, setNewTopic] = useState("");
  const [newPattern, setNewPattern] = useState("");
  const [newQuestion, setNewQuestion] = useState({ questionName: "", url: "", level: "", dataStructure: "" });
  const [isTopicModalOpen, setIsTopicModalOpen] = useState(false);
  const [isPatternModalOpen, setIsPatternModalOpen] = useState(false);
  const [isQuestionModalOpen, setIsQuestionModalOpen] = useState(false);
  const [isUpdateTopicModalOpen, setIsUpdateTopicModalOpen] = useState(false);
  const [isUpdatePatternModalOpen, setIsUpdatePatternModalOpen] = useState(false);
  const [isUpdateQuestionModalOpen, setIsUpdateQuestionModalOpen] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [updatedTopicName, setUpdatedTopicName] = useState("");
  const [updatedPatternName, setUpdatedPatternName] = useState("");
  const [currentTopicId, setCurrentTopicId] = useState(null);
  const [currentPatternId, setCurrentPatternId] = useState(null);

  useEffect(() => {
    fetchTopics();
    fetchPatterns();
  }, []);

  /** ✅ Fetch Topics */
  const fetchTopics = async () => {
    const response = await api.get(`${API_AUTH_URL}/topics/getAll`);
    setTopics(response.data);
  };

  /** ✅ Fetch Patterns */
  const fetchPatterns = async () => {
    const response = await api.get(`${API_AUTH_URL}/patterns/getAll`);
    setPatterns(response.data);
  };

  /** ✅ Fetch Questions by Topic */
  const fetchQuestionsByTopic = async (topicId) => {
    try {
      const response = await api.get(`${API_AUTH_URL}/topics/${topicId}/questions`);
      setQuestions(response.data);
      setSelectedTopic(topicId);
      setSelectedPattern(null); // Clear selected pattern
    } catch (error) {
      console.error("Error fetching questions:", error);
      alert("Failed to fetch questions. Please check your internet connection or try again later.");
    }
  };

  /** ✅ Fetch Questions by Pattern */
  const fetchQuestionsByPattern = async (patternId) => {
    try {
      const response = await api.get(`${API_AUTH_URL}/patterns/${patternId}/questions`);
      setQuestions(response.data);
      setSelectedPattern(patternId);
      setSelectedTopic(null); // Clear selected topic
    } catch (error) {
      console.error("Error fetching questions:", error);
      alert("Failed to fetch questions. Please check your internet connection or try again later.");
    }
  };

  /** ✅ Add a Topic */
  const addTopic = async () => {
    if (!newTopic.trim()) return;
    const response = await api.post(`${API_ADMIN_URL}/topics`, { dataStructure: newTopic, questionsList: [] });
    setNewTopic("");
    setIsTopicModalOpen(false);
    fetchTopics();
    setSelectedTopic(response.data.id); // Set the newly added topic as the selected topic
  };

  /** ✅ Add a Pattern */
  const addPattern = async () => {
    if (!newPattern.trim()) return;
    const response = await api.post(`${API_ADMIN_URL}/patterns`, { pattern: newPattern, questionsList: [] });
    setNewPattern("");
    setIsPatternModalOpen(false);
    fetchPatterns();
    setSelectedPattern(response.data.id); // Set the newly added pattern as the selected pattern
  };

  /** ✅ Delete a Topic */
  const deleteTopic = async (id) => {
    await api.delete(`${API_ADMIN_URL}/topics/${id}`);
    fetchTopics();
    if (selectedTopic === id) {
      setSelectedTopic(null); // Clear selected topic if it was deleted
    }
  };

  /** ✅ Delete a Pattern */
  const deletePattern = async (id) => {
    await api.delete(`${API_ADMIN_URL}/patterns/${id}`);
    fetchPatterns();
    if (selectedPattern === id) {
      setSelectedPattern(null); // Clear selected pattern if it was deleted
    }
  };

  /** ✅ Update Topic */
  const updateTopic = async () => {
    if (!updatedTopicName.trim()) return;
    try {
      await api.put(`${API_ADMIN_URL}/topics/${currentTopicId}`, { dataStructure: updatedTopicName });
      setUpdatedTopicName("");
      setIsUpdateTopicModalOpen(false);
      fetchTopics();
    } catch (error) {
      console.error("Error updating topic:", error);
    }
  };

  /** ✅ Update Pattern */
  const updatePattern = async () => {
    if (!updatedPatternName.trim()) return;
    try {
      await api.put(`${API_ADMIN_URL}/patterns/${currentPatternId}`, { pattern: updatedPatternName });
      setUpdatedPatternName("");
      setIsUpdatePatternModalOpen(false);
      fetchPatterns();
    } catch (error) {
      console.error("Error updating pattern:", error);
    }
  };

  /** ✅ Open Update Topic Modal */
  const openUpdateTopicModal = (topicId, currentName) => {
    setCurrentTopicId(topicId);
    setUpdatedTopicName(currentName);
    setIsUpdateTopicModalOpen(true);
  };

  /** ✅ Open Update Pattern Modal */
  const openUpdatePatternModal = (patternId, currentName) => {
    setCurrentPatternId(patternId);
    setUpdatedPatternName(currentName);
    setIsUpdatePatternModalOpen(true);
  };

  /** ✅ Add a Question to Topic */
  const addQuestionToTopic = async () => {
    if (!selectedTopic) return;
    await api.post(`${API_ADMIN_URL}/topics/${selectedTopic}/questions`, newQuestion);
    setNewQuestion({ questionName: "", url: "", level: "", dataStructure: "" });
    setIsQuestionModalOpen(false);
    fetchQuestionsByTopic(selectedTopic);
  };

  /** ✅ Add a Question to Pattern */
  const addQuestionToPattern = async () => {
    if (!selectedPattern) return;
    await api.post(`${API_ADMIN_URL}/patterns/${selectedPattern}/questions`, newQuestion);
    setNewQuestion({ questionName: "", url: "", level: "", dataStructure: "" });
    setIsQuestionModalOpen(false);
    fetchQuestionsByPattern(selectedPattern);
  };

  /** ✅ Delete a Question from Topic */
  const deleteQuestionFromTopic = async (questionId) => {
    await api.delete(`${API_ADMIN_URL}/topics/${selectedTopic}/questions/${questionId}`);
    fetchQuestionsByTopic(selectedTopic);
  };

  /** ✅ Delete a Question from Pattern */
  const deleteQuestionFromPattern = async (questionId) => {
    await api.delete(`${API_ADMIN_URL}/patterns/${selectedPattern}/questions/${questionId}`);
    fetchQuestionsByPattern(selectedPattern);
  };

  /** ✅ Update a Question */
  const updateQuestion = async () => {
    if (!currentQuestion) return;
    try {
      if (selectedTopic) {
        await api.put(`${API_ADMIN_URL}/topics/${selectedTopic}/questions/${currentQuestion.questionId}`, currentQuestion);
        fetchQuestionsByTopic(selectedTopic);
      } else if (selectedPattern) {
        await api.put(`${API_ADMIN_URL}/patterns/${selectedPattern}/questions/${currentQuestion.questionId}`, currentQuestion);
        fetchQuestionsByPattern(selectedPattern);
      }
      setIsUpdateQuestionModalOpen(false);
    } catch (error) {
      console.error("Error updating question:", error);
    }
  };

  /** ✅ Open Update Question Modal */
  const openUpdateQuestionModal = (question) => {
    setCurrentQuestion(question);
    setIsUpdateQuestionModalOpen(true);
  };

  return (
    <div className="p-6 min-h-screen bg-gray-900 text-white">
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Admin Panel</CardTitle>
          <div className="flex gap-4">
            <Button onClick={() => setIsTopicModalOpen(true)}>Add Topic</Button>
            <Button onClick={() => setIsPatternModalOpen(true)}>Add Pattern</Button>
          </div>
        </CardHeader>
      </Card>

      {/* Topics Table */}
      <Card className="mb-4">
        <CardHeader><CardTitle>Topics</CardTitle></CardHeader>
        <CardContent>
          <TopicsTable
            topics={topics}
            openUpdateTopicModal={openUpdateTopicModal}
            deleteTopic={deleteTopic}
            fetchQuestionsByTopic={fetchQuestionsByTopic}
          />
        </CardContent>
      </Card>

      {/* Patterns Table */}
      <Card className="mb-4">
        <CardHeader><CardTitle>Patterns</CardTitle></CardHeader>
        <CardContent>
          <PatternsTable
            patterns={patterns}
            openUpdatePatternModal={openUpdatePatternModal}
            deletePattern={deletePattern}
            fetchQuestionsByPattern={fetchQuestionsByPattern}
          />
        </CardContent>
      </Card>

      {/* Questions Section */}
      {(selectedTopic || selectedPattern) && (
        <Card className="mb-4">
          <CardHeader>
            <CardTitle>Questions</CardTitle>
            <div className="flex gap-4">
              {selectedTopic ? (
                <Button onClick={() => setSelectedTopic(null)}>Back to Topics</Button>
              ) : (
                <Button onClick={() => setSelectedPattern(null)}>Back to Patterns</Button>
              )}
              <Button onClick={() => setIsQuestionModalOpen(true)}>Add Question</Button>
            </div>
          </CardHeader>
          <CardContent>
            {questions.length > 0 ? (
              <QuestionsTable
                questions={questions}
                openUpdateQuestionModal={openUpdateQuestionModal}
                deleteQuestionFromTopic={deleteQuestionFromTopic}
                deleteQuestionFromPattern={deleteQuestionFromPattern}
                selectedTopic={selectedTopic}
              />
            ) : (
              <p>No questions found. Click "Add Question" to add one.</p>
            )}
          </CardContent>
        </Card>
      )}

      {/* Modals */}
      <AddTopicModal
        isOpen={isTopicModalOpen}
        onOpenChange={setIsTopicModalOpen}
        newTopic={newTopic}
        setNewTopic={setNewTopic}
        addTopic={addTopic}
      />

      <UpdateTopicModal
        isOpen={isUpdateTopicModalOpen}
        onOpenChange={setIsUpdateTopicModalOpen}
        updatedTopicName={updatedTopicName}
        setUpdatedTopicName={setUpdatedTopicName}
        updateTopic={updateTopic}
      />

      <AddPatternModal
        isOpen={isPatternModalOpen}
        onOpenChange={setIsPatternModalOpen}
        newPattern={newPattern}
        setNewPattern={setNewPattern}
        addPattern={addPattern}
      />

      <UpdatePatternModal
        isOpen={isUpdatePatternModalOpen}
        onOpenChange={setIsUpdatePatternModalOpen}
        updatedPatternName={updatedPatternName}
        setUpdatedPatternName={setUpdatedPatternName}
        updatePattern={updatePattern}
      />

      <AddQuestionModal
        isOpen={isQuestionModalOpen}
        onOpenChange={setIsQuestionModalOpen}
        newQuestion={newQuestion}
        setNewQuestion={setNewQuestion}
        addQuestionToTopic={addQuestionToTopic}
        addQuestionToPattern={addQuestionToPattern}
        selectedTopic={selectedTopic}
      />

      <UpdateQuestionModal
        isOpen={isUpdateQuestionModalOpen}
        onOpenChange={setIsUpdateQuestionModalOpen}
        currentQuestion={currentQuestion}
        setCurrentQuestion={setCurrentQuestion}
        updateQuestion={updateQuestion}
      />
    </div>
  );
};

export default AdminPage;