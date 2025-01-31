import React from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Trash, Edit } from "lucide-react";

const PatternsTable = ({ patterns, openUpdatePatternModal, deletePattern, fetchQuestionsByPattern }) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Pattern</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {patterns.map((pattern) => (
          <TableRow key={pattern.id}>
            <TableCell>{pattern.pattern}</TableCell>
            <TableCell>
              <Button variant="ghost" onClick={() => openUpdatePatternModal(pattern.id, pattern.pattern)}>
                <Edit />
              </Button>
              <Button variant="ghost" onClick={() => deletePattern(pattern.id)}>
                <Trash />
              </Button>
              <Button variant="ghost" onClick={() => fetchQuestionsByPattern(pattern.id)}>
                View Questions
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default PatternsTable;