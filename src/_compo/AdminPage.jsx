import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Trash, Edit } from "lucide-react";

const AdminPage = () => {
  const [topics, setTopics] = useState([]);
  const [questions, setQuestions] = useState({});
  const [isTopicModalOpen, setIsTopicModalOpen] = useState(false);
  const [isQuestionModalOpen, setIsQuestionModalOpen] = useState(false);
  const [currentTopic, setCurrentTopic] = useState("");
  const [newTopic, setNewTopic] = useState("");
  const [newQuestion, setNewQuestion] = useState({ title: "", level: "" });

  const addTopic = () => {
    if (!newTopic.trim()) return;
    const topicId = Date.now();
    setTopics([...topics, { id: topicId, title: newTopic }]);
    setQuestions({ ...questions, [topicId]: [] });
    setNewTopic("");
    setIsTopicModalOpen(false);
  };

  const deleteTopic = (id) => {
    setTopics(topics.filter((t) => t.id !== id));
    const updatedQuestions = { ...questions };
    delete updatedQuestions[id];
    setQuestions(updatedQuestions);
  };

  const addQuestion = () => {
    if (!newQuestion.title.trim()) return;
    setQuestions({
      ...questions,
      [currentTopic]: [...(questions[currentTopic] || []), { id: Date.now(), ...newQuestion }],
    });
    setNewQuestion({ title: "", level: "" });
    setIsQuestionModalOpen(false);
  };

  const deleteQuestion = (topicId, questionId) => {
    setQuestions({
      ...questions,
      [topicId]: questions[topicId].filter((q) => q.id !== questionId),
    });
  };

  return (
    <div className="p-6 min-h-screen bg-black text-[hsl(210,40%,98%)]">
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Admin Panel</CardTitle>
          <Button onClick={() => setIsTopicModalOpen(true)}>Add Topic</Button>
        </CardHeader>
      </Card>
      {topics.map((topic) => (
        <Card key={topic.id} className="mb-4">
          <CardHeader>
            <div className="flex justify-between">
              <CardTitle>{topic.title}</CardTitle>
              <div>
                <Button variant="ghost" onClick={() => deleteTopic(topic.id)}><Trash /></Button>
                <Button variant="ghost" onClick={() => { setCurrentTopic(topic.id); setIsQuestionModalOpen(true); }}>+ Question</Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Level</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {questions[topic.id]?.map((q) => (
                  <TableRow key={q.id}>
                    <TableCell>{q.title}</TableCell>
                    <TableCell>{q.level}</TableCell>
                    <TableCell>
                      <Button variant="ghost" onClick={() => deleteQuestion(topic.id, q.id)}><Trash /></Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      ))}
      {/* Topic Modal */}
      <Dialog open={isTopicModalOpen} onOpenChange={setIsTopicModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Topic</DialogTitle>
          </DialogHeader>
          <Input value={newTopic} onChange={(e) => setNewTopic(e.target.value)} placeholder="Topic Name" />
          <Button onClick={addTopic}>Add</Button>
        </DialogContent>
      </Dialog>
      {/* Question Modal */}
      <Dialog open={isQuestionModalOpen} onOpenChange={setIsQuestionModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Question</DialogTitle>
          </DialogHeader>
          <Input value={newQuestion.title} onChange={(e) => setNewQuestion({ ...newQuestion, title: e.target.value })} placeholder="Question Title" />
          <Input value={newQuestion.level} onChange={(e) => setNewQuestion({ ...newQuestion, level: e.target.value })} placeholder="Difficulty Level" />
          <Button onClick={addQuestion}>Add</Button>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminPage;