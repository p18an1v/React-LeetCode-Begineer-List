import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const UpdateTopicModal = ({ isOpen, onOpenChange, updatedTopicName, setUpdatedTopicName, updateTopic }) => {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Update Topic</DialogTitle>
        </DialogHeader>
        <Input placeholder="Enter Updated Topic Name" value={updatedTopicName} onChange={(e) => setUpdatedTopicName(e.target.value)} />
        <Button onClick={updateTopic}>Update Topic</Button>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateTopicModal;