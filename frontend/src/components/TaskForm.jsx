import { useState } from "react";
import { Plus } from "lucide-react";

export default function TaskForm({ onAdd, busy }) {
  const [title, setTitle] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();
    const cleanTitle = title.trim();
    if (!cleanTitle) return;
    const added = await onAdd(cleanTitle);
    if (added) setTitle("");
  }

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <label className="sr-only" htmlFor="new-task">New task</label>
      <input
        id="new-task"
        value={title}
        onChange={(event) => setTitle(event.target.value)}
        placeholder="What needs to get done?"
        maxLength={200}
      />
      <button className="add-button" type="submit" disabled={busy || !title.trim()}>
        <Plus size={18} strokeWidth={2.5} />
        <span>Add task</span>
      </button>
    </form>
  );
}
