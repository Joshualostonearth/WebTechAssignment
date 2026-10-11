const express = require("express");
const mongoose = require("mongoose");
const Task = require("../models/Task");

const router = express.Router();

// GET /api/tasks — return all tasks, newest first.
router.get("/", async (req, res) => {
  try {
    const tasks = await Task.find().sort({ createdAt: -1 });
    return res.status(200).json(tasks);
  } catch (error) {
    return res.status(500).json({ message: "Could not fetch tasks." });
  }
});

// POST /api/tasks — validate and create a task.
router.post("/", async (req, res) => {
  const title = String(req.body?.title ?? "").trim();
  if (!title) {
    return res.status(400).json({ message: "Title cannot be empty." });
  }

  try {
    const task = await Task.create({ title });
    return res.status(201).json(task);
  } catch (error) {
    if (error.name === "ValidationError") {
      return res.status(400).json({ message: "Invalid task data." });
    }
    return res.status(500).json({ message: "Could not create task." });
  }
});

// PUT /api/tasks/:id — update the title and/or completion state.
router.put("/:id", async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id)) {
    return res.status(400).json({ message: "Invalid task ID." });
  }

  const updates = {};
  if (Object.prototype.hasOwnProperty.call(req.body ?? {}, "title")) {
    const title = String(req.body.title ?? "").trim();
    if (!title) {
      return res.status(400).json({ message: "Title cannot be empty." });
    }
    updates.title = title;
  }
  if (Object.prototype.hasOwnProperty.call(req.body ?? {}, "completed")) {
    if (typeof req.body.completed !== "boolean") {
      return res.status(400).json({ message: "Completed must be a boolean." });
    }
    updates.completed = req.body.completed;
  }
  if (Object.keys(updates).length === 0) {
    return res.status(400).json({ message: "Provide a title or completed value." });
  }

  try {
    const task = await Task.findByIdAndUpdate(req.params.id, updates, {
      new: true,
      runValidators: true
    });
    if (!task) {
      return res.status(404).json({ message: "Task not found." });
    }
    return res.status(200).json(task);
  } catch (error) {
    if (error.name === "ValidationError") {
      return res.status(400).json({ message: "Invalid task data." });
    }
    return res.status(500).json({ message: "Could not update task." });
  }
});

// DELETE /api/tasks/:id — delete a task if it exists.
router.delete("/:id", async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id)) {
    return res.status(400).json({ message: "Invalid task ID." });
  }

  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) {
      return res.status(404).json({ message: "Task not found." });
    }
    return res.status(200).json({ message: "Task deleted successfully.", id: task._id });
  } catch (error) {
    return res.status(500).json({ message: "Could not delete task." });
  }
});

module.exports = router;
