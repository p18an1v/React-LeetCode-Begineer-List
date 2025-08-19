import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const AddQuestionModal = ({ isOpen, onOpenChange, newQuestion, setNewQuestion, addQuestionToTopic, addQuestionToPattern, selectedTopic }) => {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Question</DialogTitle>
        </DialogHeader>
        <Input className="text-black" placeholder="Question Name" value={newQuestion.questionName} onChange={(e) => setNewQuestion({ ...newQuestion, questionName: e.target.value })} />
        <Input className="text-black" placeholder="URL" value={newQuestion.url} onChange={(e) => setNewQuestion({ ...newQuestion, url: e.target.value })} />
        <Input className="text-black" placeholder="Level" value={newQuestion.level} onChange={(e) => setNewQuestion({ ...newQuestion, level: e.target.value })} />
        <Input className="text-black" placeholder="Data Structure" value={newQuestion.dataStructure} onChange={(e) => setNewQuestion({ ...newQuestion, dataStructure: e.target.value })} />
        <Button onClick={selectedTopic ? addQuestionToTopic : addQuestionToPattern}>Add Question</Button>
      </DialogContent>
    </Dialog>
  );
};

export default AddQuestionModal;