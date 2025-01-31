import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import api from "@/services/api";

const AdminPanel = () => {
  const [topics, setTopics] = useState([]);
  const [newTopic, setNewTopic] = useState("");
  const [editingTopicId, setEditingTopicId] = useState(null);
  const [updatedTopic, setUpdatedTopic] = useState("");
  
  useEffect(() => {
    fetchTopics();
  }, []);

  const fetchTopics = async () => {
    try {
      const response = await api.get("auth/topics/getAll");
      setTopics(response.data || []);
    } catch (error) {
      console.error("Error fetching topics:", error);
    }
  };

  const addTopic = async () => {
    if (!newTopic.trim()) return;
    try {
      const response = await api.post("auth/topics", { dataStructure: newTopic });
      setTopics([...topics, response.data]);
      setNewTopic("");
    } catch (error) {
      console.error("Error adding topic:", error);
    }
  };

  const updateTopic = async (topicId) => {
    if (!updatedTopic.trim()) return;
    try {
      await api.put(`auth/topics/${topicId}`, { dataStructure: updatedTopic });
      setTopics(
        topics.map((topic) => (topic.id === topicId ? { ...topic, dataStructure: updatedTopic } : topic))
      );
      setEditingTopicId(null);
      setUpdatedTopic("");
    } catch (error) {
      console.error("Error updating topic:", error);
    }
  };

  const deleteTopic = async (topicId) => {
    try {
      await api.delete(`auth/topics/${topicId}`);
      setTopics(topics.filter((topic) => topic.id !== topicId));
    } catch (error) {
      console.error("Error deleting topic:", error);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Admin Panel - Manage Topics</h2>
      <div className="mb-4 flex space-x-2">
        <Input
          value={newTopic}
          onChange={(e) => setNewTopic(e.target.value)}
          placeholder="Enter new topic"
        />
        <Button onClick={addTopic}>Add Topic</Button>
      </div>
      <div className="space-y-4">
        {topics.map((topic) => (
          <div key={topic.id} className="border p-4 rounded flex justify-between items-center">
            {editingTopicId === topic.id ? (
              <Input
                value={updatedTopic}
                onChange={(e) => setUpdatedTopic(e.target.value)}
                placeholder="Update topic name"
              />
            ) : (
              <span className="text-lg font-medium">{topic.dataStructure}</span>
            )}
            <div className="space-x-2">
              {editingTopicId === topic.id ? (
                <Button onClick={() => updateTopic(topic.id)}>Save</Button>
              ) : (
                <Button onClick={() => { setEditingTopicId(topic.id); setUpdatedTopic(topic.dataStructure); }}>Edit</Button>
              )}
              <Button variant="destructive" onClick={() => deleteTopic(topic.id)}>Delete</Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminPanel;