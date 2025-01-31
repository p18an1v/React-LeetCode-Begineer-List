import React from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Trash, Edit } from "lucide-react";

const TopicsTable = ({ topics, openUpdateTopicModal, deleteTopic, fetchQuestionsByTopic }) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Topic</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {topics.map((topic) => (
          <TableRow key={topic.id}>
            <TableCell>{topic.dataStructure}</TableCell>
            <TableCell>
              <Button variant="ghost" onClick={() => openUpdateTopicModal(topic.id, topic.dataStructure)}>
                <Edit />
              </Button>
              <Button variant="ghost" onClick={() => deleteTopic(topic.id)}>
                <Trash />
              </Button>
              <Button variant="ghost" onClick={() => fetchQuestionsByTopic(topic.id)}>
                View Questions
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default TopicsTable;