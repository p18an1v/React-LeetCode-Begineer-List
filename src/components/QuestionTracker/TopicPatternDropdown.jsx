import React from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const TopicPatternDropdown = ({ selectedType, setSelectedType }) => {
  return (
    <div className="mb-6">
      <Select value={selectedType} onValueChange={setSelectedType}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select Type" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="topics">Topics</SelectItem>
          <SelectItem value="patterns">Patterns</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default TopicPatternDropdown;