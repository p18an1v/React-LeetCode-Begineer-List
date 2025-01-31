import React from "react";
import { Card, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronRight } from "lucide-react";

const StopCard = ({ stop, isOpen, isCompleted, toggleStop }) => {
  return (
    <Card
      className={`p-4 flex justify-between items-center cursor-pointer transition-all hover:bg-muted/50 ${
        isCompleted ? "border-green-500" : "border-muted"
      }`}
      onClick={toggleStop}
    >
      <CardTitle className="text-xl font-semibold">{stop.title}</CardTitle>
      <Button variant="ghost" size="icon">
        {isOpen ? <ChevronDown /> : <ChevronRight />}
      </Button>
    </Card>
  );
};

export default StopCard;