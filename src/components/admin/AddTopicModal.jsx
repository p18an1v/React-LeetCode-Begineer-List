import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const AddTopicModal = ({ isOpen, onOpenChange, newTopic, setNewTopic, addTopic }) => {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Topic</DialogTitle>
        </DialogHeader>
        <Input placeholder="Enter Topic Name" value={newTopic} onChange={(e) => setNewTopic(e.target.value)} />
        <Button onClick={addTopic}>Add Topic</Button>
      </DialogContent>
    </Dialog>
  );
};

export default AddTopicModal;