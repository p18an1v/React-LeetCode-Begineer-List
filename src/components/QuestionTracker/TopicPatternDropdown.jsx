import React from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const TopicPatternDropdown = ({ selectedType, setSelectedType }) => {
  return (
    <div className="mb-6">
      <Select value={selectedType} onValueChange={setSelectedType}>
        <SelectTrigger className="w-[180px] bg-black border border-gray-700 text-white">
          <SelectValue placeholder="Select Type" />
        </SelectTrigger>
        <SelectContent className="bg-black border border-gray-700 text-white">
          <SelectItem
            value="topics"
            className="hover:bg-white/10 text-white"
          >
            Topics
          </SelectItem>
          <SelectItem
            value="patterns"
            className="hover:bg-white/10 text-white"
          >
            Patterns
          </SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};


export default TopicPatternDropdown;