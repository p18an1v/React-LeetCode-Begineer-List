import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const UpdateQuestionModal = ({ isOpen, onOpenChange, currentQuestion, setCurrentQuestion, updateQuestion }) => {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Update Question</DialogTitle>
        </DialogHeader>
        <Input placeholder="Question Name" value={currentQuestion?.questionName || ""} onChange={(e) => setCurrentQuestion({ ...currentQuestion, questionName: e.target.value })} />
        <Input placeholder="URL" value={currentQuestion?.url || ""} onChange={(e) => setCurrentQuestion({ ...currentQuestion, url: e.target.value })} />
        <Input placeholder="Level" value={currentQuestion?.level || ""} onChange={(e) => setCurrentQuestion({ ...currentQuestion, level: e.target.value })} />
        <Input placeholder="Data Structure" value={currentQuestion?.dataStructure || ""} onChange={(e) => setCurrentQuestion({ ...currentQuestion, dataStructure: e.target.value })} />
        <Button onClick={updateQuestion}>Update Question</Button>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateQuestionModal;