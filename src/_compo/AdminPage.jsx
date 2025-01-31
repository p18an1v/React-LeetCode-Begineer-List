import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Trash, Edit } from "lucide-react";
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
  const [isUpdateQuestionModalOpen, setIsUpdateQuestionModalOpen] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [updatedTopicName, setUpdatedTopicName] = useState("");
  const [currentTopicId, setCurrentTopicId] = useState(null);

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
    const response = await api.get(`${API_AUTH_URL}/patterns/${patternId}/questions`);
    setQuestions(response.data);
    setSelectedPattern(patternId);
    setSelectedTopic(null); // Clear selected topic
  };

  /** ✅ Add a Topic */
  const addTopic = async () => {
    if (!newTopic.trim()) return;
    const response = await api.post(`${API_ADMIN_URL}/topics`, { dataStructure: newTopic, questionsList: [] });
    setNewTopic("");
    setIsTopicModalOpen(false);
    fetchTopics();
    // Set the newly added topic as the selected topic
    setSelectedTopic(response.data.id); // Assuming the API returns the newly created topic with its ID
  };

  /** ✅ Add a Pattern */
  const addPattern = async () => {
    if (!newPattern.trim()) return;
    await api.post(`${API_ADMIN_URL}/patterns`, { pattern: newPattern, questionsList: [] });
    setNewPattern("");
    setIsPatternModalOpen(false);
    fetchPatterns();
  };

  /** ✅ Delete a Topic */
  const deleteTopic = async (id) => {
    await api.delete(`${API_ADMIN_URL}/topics/${id}`);
    fetchTopics();
    if (selectedTopic === id) {
      setSelectedTopic(null); // Clear selected topic if it was deleted
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

  /** ✅ Open Update Topic Modal */
  const openUpdateTopicModal = (topicId, currentName) => {
    setCurrentTopicId(topicId);
    setUpdatedTopicName(currentName);
    setIsUpdateTopicModalOpen(true);
  };

  /** ✅ Delete a Pattern */
  const deletePattern = async (id) => {
    await api.delete(`${API_ADMIN_URL}/patterns/${id}`);
    fetchPatterns();
  };

  /** ✅ Add a Question to Topic */
  const addQuestionToTopic = async () => {
    if (!selectedTopic) return;
    await api.post(`${API_ADMIN_URL}/topics/${selectedTopic}/questions`, newQuestion);
    setNewQuestion({ questionName: "", url: "", level: "", dataStructure: "" });
    setIsQuestionModalOpen(false);
    fetchQuestionsByTopic(selectedTopic);
  };

  /** ✅ Delete a Question from Topic */
  const deleteQuestionFromTopic = async (questionId) => {
    await api.delete(`${API_ADMIN_URL}/topics/${selectedTopic}/questions/${questionId}`);
    fetchQuestionsByTopic(selectedTopic);
  };

  /** ✅ Update a Question */
  const updateQuestion = async () => {
    if (!currentQuestion) return;
    try {
      await api.put(`${API_ADMIN_URL}/topics/${selectedTopic}/questions/${currentQuestion.questionId}`, currentQuestion);
      setIsUpdateQuestionModalOpen(false);
      fetchQuestionsByTopic(selectedTopic);
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
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Topic</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {topics.map((topic) => (
                <TableRow key={topic.id}>
                  <TableCell>{topic.dataStructure}</TableCell>
                  <TableCell>
                    <Button variant="ghost" onClick={() => openUpdateTopicModal(topic.id, topic.dataStructure)}><Edit /></Button>
                    <Button variant="ghost" onClick={() => deleteTopic(topic.id)}><Trash /></Button>
                    <Button variant="ghost" onClick={() => fetchQuestionsByTopic(topic.id)}>View Questions</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Patterns Table */}
      <Card className="mb-4">
        <CardHeader><CardTitle>Patterns</CardTitle></CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Pattern</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {patterns.map((pattern) => (
                <TableRow key={pattern.id}>
                  <TableCell>{pattern.pattern}</TableCell>
                  <TableCell>
                    <Button variant="ghost" onClick={() => deletePattern(pattern.id)}><Trash /></Button>
                    <Button variant="ghost" onClick={() => fetchQuestionsByPattern(pattern.id)}>View Questions</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Questions Table */}
      {/* Questions Section */}
      {selectedTopic && (
        <Card className="mb-4">
          <CardHeader>
            <CardTitle>Questions</CardTitle>
            <Button onClick={() => setIsQuestionModalOpen(true)}>Add Question</Button>
          </CardHeader>
          <CardContent>
            {questions.length > 0 ? (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Question Name</TableHead>
                    <TableHead>URL</TableHead>
                    <TableHead>Level</TableHead>
                    <TableHead>Data Structure</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {questions.map((question) => (
                    <TableRow key={question.questionId}>
                      <TableCell>{question.questionName}</TableCell>
                      <TableCell>{question.url}</TableCell>
                      <TableCell>{question.level}</TableCell>
                      <TableCell>{question.dataStructure}</TableCell>
                      <TableCell>
                        <Button variant="ghost" onClick={() => openUpdateQuestionModal(question)}><Edit /></Button>
                        <Button variant="ghost" onClick={() => deleteQuestionFromTopic(question.questionId)}><Trash /></Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              <p>No questions found for this topic. Click "Add Question" to add one.</p>
            )}
          </CardContent>
        </Card>
      )}

      {/* Add Topic Modal */}
      <Dialog open={isTopicModalOpen} onOpenChange={setIsTopicModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Topic</DialogTitle>
          </DialogHeader>
          <Input
            placeholder="Enter Topic Name"
            value={newTopic}
            onChange={(e) => setNewTopic(e.target.value)}
          />
          <Button onClick={addTopic}>Add Topic</Button>
        </DialogContent>
      </Dialog>

      {/* Update Topic Modal */}
      <Dialog open={isUpdateTopicModalOpen} onOpenChange={setIsUpdateTopicModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Update Topic</DialogTitle>
          </DialogHeader>
          <Input
            placeholder="Enter Updated Topic Name"
            value={updatedTopicName}
            onChange={(e) => setUpdatedTopicName(e.target.value)}
          />
          <Button onClick={updateTopic}>Update Topic</Button>
        </DialogContent>
      </Dialog>

      {/* Add Pattern Modal */}
      <Dialog open={isPatternModalOpen} onOpenChange={setIsPatternModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Pattern</DialogTitle>
          </DialogHeader>
          <Input
            placeholder="Enter Pattern Name"
            value={newPattern}
            onChange={(e) => setNewPattern(e.target.value)}
          />
          <Button onClick={addPattern}>Add Pattern</Button>
        </DialogContent>
      </Dialog>

      {/* Add Question Modal */}
      <Dialog open={isQuestionModalOpen} onOpenChange={setIsQuestionModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Question</DialogTitle>
          </DialogHeader>
          <Input
            placeholder="Question Name"
            value={newQuestion.questionName}
            onChange={(e) => setNewQuestion({ ...newQuestion, questionName: e.target.value })}
          />
          <Input
            placeholder="URL"
            value={newQuestion.url}
            onChange={(e) => setNewQuestion({ ...newQuestion, url: e.target.value })}
          />
          <Input
            placeholder="Level"
            value={newQuestion.level}
            onChange={(e) => setNewQuestion({ ...newQuestion, level: e.target.value })}
          />
          <Input
            placeholder="Data Structure"
            value={newQuestion.dataStructure}
            onChange={(e) => setNewQuestion({ ...newQuestion, dataStructure: e.target.value })}
          />
          <Button onClick={addQuestionToTopic}>Add Question</Button>
        </DialogContent>
      </Dialog>

      {/* Update Question Modal */}
      <Dialog open={isUpdateQuestionModalOpen} onOpenChange={setIsUpdateQuestionModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Update Question</DialogTitle>
          </DialogHeader>
          <Input
            placeholder="Question Name"
            value={currentQuestion?.questionName || ""}
            onChange={(e) => setCurrentQuestion({ ...currentQuestion, questionName: e.target.value })}
          />
          <Input
            placeholder="URL"
            value={currentQuestion?.url || ""}
            onChange={(e) => setCurrentQuestion({ ...currentQuestion, url: e.target.value })}
          />
          <Input
            placeholder="Level"
            value={currentQuestion?.level || ""}
            onChange={(e) => setCurrentQuestion({ ...currentQuestion, level: e.target.value })}
          />
          <Input
            placeholder="Data Structure"
            value={currentQuestion?.dataStructure || ""}
            onChange={(e) => setCurrentQuestion({ ...currentQuestion, dataStructure: e.target.value })}
          />
          <Button onClick={updateQuestion}>Update Question</Button>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminPage;