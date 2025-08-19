import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const UpdatePatternModal = ({ isOpen, onOpenChange, updatedPatternName, setUpdatedPatternName, updatePattern }) => {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Update Pattern</DialogTitle>
        </DialogHeader>
        <Input className="text-black" placeholder="Enter Updated Pattern Name" value={updatedPatternName} onChange={(e) => setUpdatedPatternName(e.target.value)} />
        <Button onClick={updatePattern}>Update Pattern</Button>
      </DialogContent>
    </Dialog>
  );
};

export default UpdatePatternModal;