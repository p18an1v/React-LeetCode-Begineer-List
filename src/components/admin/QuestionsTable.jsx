import React from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Trash, Edit } from "lucide-react";

const QuestionsTable = ({ questions, openUpdateQuestionModal, deleteQuestionFromTopic, deleteQuestionFromPattern, selectedTopic }) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Question Name</TableHead>
          <TableHead>URL</TableHead>
          <TableHead>Level</TableHead>
          <TableHead>Data Structure</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {questions.map((question) => (
          <TableRow key={question.questionId}>
            <TableCell>{question.questionName}</TableCell>
            <TableCell>{question.url}</TableCell>
            <TableCell>{question.level}</TableCell>
            <TableCell>{question.dataStructure}</TableCell>
            <TableCell>
              <Button variant="ghost" onClick={() => openUpdateQuestionModal(question)}>
                <Edit />
              </Button>
              <Button variant="ghost" onClick={() => (selectedTopic ? deleteQuestionFromTopic(question.questionId) : deleteQuestionFromPattern(question.questionId))}>
                <Trash />
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default QuestionsTable;