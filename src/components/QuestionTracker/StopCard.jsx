import React from "react";
import { Card, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronRight } from "lucide-react";

const StopCard = ({ stop, isOpen, isCompleted, toggleStop }) => {
  return (
    <Card
      onClick={toggleStop}
      className={`p-4 flex justify-between items-center cursor-pointer transition-all 
                  bg-black border border-transparent hover:border-white/30 
                  ${isCompleted ? "border-white/40" : "border-transparent"}`}
    >
      <CardTitle className="text-xl font-semibold text-white">
        {stop.title}
      </CardTitle>

      <Button variant="ghost" size="icon" className="hover:bg-white/10 active:bg-white/20 focus:ring-0">
        {isOpen ? (
          <ChevronDown className="text-white " />
        ) : (
          <ChevronRight className="text-white" />
        )}
      </Button>
    </Card>
  );
};

export default StopCard;
