import { Check, Pencil, Trash2, X } from "lucide-react";
import { useState } from "react";

export default function TaskItem({ task, onToggle, onDelete, onEdit, busy }) {
  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState(task.title);

  async function saveEdit(event) {
    event.preventDefault();
    const cleanTitle = title.trim();
    if (!cleanTitle) return;
    const saved = await onEdit(task._id, cleanTitle);
    if (saved) setEditing(false);
  }

  return (
    <li className={`task-item ${task.completed ? "is-complete" : ""}`}>
      <button
        className={`check-button ${task.completed ? "checked" : ""}`}
        type="button"
        aria-label={task.completed ? "Mark task incomplete" : "Mark task complete"}
        onClick={() => onToggle(task)}
        disabled={busy}
      >
        {task.completed && <Check size={15} strokeWidth={3} />}
      </button>

      {editing ? (
        <form className="edit-form" onSubmit={saveEdit}>
          <input
            autoFocus
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            aria-label="Edit task title"
          />
          <button className="icon-button save-edit" type="submit" aria-label="Save title" disabled={busy || !title.trim()}>
            <Check size={17} />
          </button>
          <button className="icon-button" type="button" aria-label="Cancel edit" onClick={() => { setTitle(task.title); setEditing(false); }}>
            <X size={17} />
          </button>
        </form>
      ) : (
        <>
          <span className="task-title">{task.title}</span>
          <div className="task-actions">
            <button className="icon-button" type="button" aria-label="Edit task" title="Edit task" onClick={() => setEditing(true)} disabled={busy}>
              <Pencil size={16} />
            </button>
            <button className="icon-button delete-button" type="button" aria-label="Delete task" title="Delete task" onClick={() => onDelete(task._id)} disabled={busy}>
              <Trash2 size={16} />
            </button>
          </div>
        </>
      )}
    </li>
  );
}
