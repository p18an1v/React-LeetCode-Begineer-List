import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const AddPatternModal = ({ isOpen, onOpenChange, newPattern, setNewPattern, addPattern }) => {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Pattern</DialogTitle>
        </DialogHeader>
        <Input placeholder="Enter Pattern Name" value={newPattern} onChange={(e) => setNewPattern(e.target.value)} />
        <Button onClick={addPattern}>Add Pattern</Button>
      </DialogContent>
    </Dialog>
  );
};

export default AddPatternModal;