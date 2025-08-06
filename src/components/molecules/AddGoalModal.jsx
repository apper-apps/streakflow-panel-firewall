import React, { useState } from "react";
import Modal from "@/components/atoms/Modal";
import Button from "@/components/atoms/Button";
import Input from "@/components/atoms/Input";
import Textarea from "@/components/atoms/Textarea";
import Select from "@/components/atoms/Select";
import { toast } from "react-toastify";

const AddGoalModal = ({ isOpen, onClose, onAddGoal }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    frequency: "daily"
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ""
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.title.trim()) {
      newErrors.title = "Goal title is required";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const newGoal = {
      title: formData.title.trim(),
      description: formData.description.trim(),
      frequency: formData.frequency,
      createdAt: new Date().toISOString(),
      isArchived: false,
      currentStreak: 0,
      bestStreak: 0,
      lastCompletedDate: null
    };

    onAddGoal(newGoal);
    setFormData({
      title: "",
      description: "",
      frequency: "daily"
    });
    setErrors({});
    onClose();
    toast.success("Goal created successfully! 🎯");
  };

  const handleClose = () => {
    setFormData({
      title: "",
      description: "",
      frequency: "daily"
    });
    setErrors({});
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title="Create New Goal"
      size="md"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <Input
          label="Goal Title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="e.g., Read for 30 minutes"
          error={errors.title}
        />

        <Textarea
          label="Description (Optional)"
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Add more details about your goal..."
          rows={3}
        />

        <Select
          label="Frequency"
          name="frequency"
          value={formData.frequency}
          onChange={handleChange}
        >
          <option value="daily">Daily</option>
          <option value="weekly">Weekly</option>
        </Select>

        <div className="flex gap-3 pt-4">
          <Button
            type="button"
            variant="secondary"
            onClick={handleClose}
            className="flex-1"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="primary"
            className="flex-1"
          >
            Create Goal
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default AddGoalModal;