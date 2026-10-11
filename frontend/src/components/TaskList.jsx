import { ClipboardList } from "lucide-react";
import TaskItem from "./TaskItem";

export default function TaskList({ tasks, filter, onToggle, onDelete, onEdit, busyId }) {
  const visibleTasks = tasks.filter((task) => {
    if (filter === "active") return !task.completed;
    if (filter === "completed") return task.completed;
    return true;
  });

  if (!visibleTasks.length) {
    return (
      <div className="empty-state">
        <div className="empty-icon"><ClipboardList size={25} /></div>
        <strong>{filter === "completed" ? "Nothing completed yet" : filter === "active" ? "You're all caught up" : "Your list is clear"}</strong>
        <p>{filter === "active" ? "Enjoy the breathing room, or add another task." : "Add a task above to get your day moving."}</p>
      </div>
    );
  }

  return (
    <ul className="task-list">
      {visibleTasks.map((task) => (
        <TaskItem
          key={task._id}
          task={task}
          onToggle={onToggle}
          onDelete={onDelete}
          onEdit={onEdit}
          busy={busyId === task._id}
        />
      ))}
    </ul>
  );
}
