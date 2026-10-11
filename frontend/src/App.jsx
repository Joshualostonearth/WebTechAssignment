import { useEffect, useMemo, useState } from "react";
import { CheckCircle2, ListTodo, RefreshCw, Sparkles } from "lucide-react";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import { createTask, deleteTask, getTasks, updateTask } from "./api";

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(true);
  const [busyId, setBusyId] = useState(null);
  const [adding, setAdding] = useState(false);
  const [error, setError] = useState("");

  // Load tasks from MongoDB-backed API when the page first mounts.
  async function loadTasks() {
    setLoading(true);
    setError("");
    try {
      setTasks(await getTasks());
    } catch (err) {
      setError(`${err.message}. Check that the backend and MongoDB are running.`);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { loadTasks(); }, []);

  const completedCount = useMemo(() => tasks.filter((task) => task.completed).length, [tasks]);
  const activeCount = tasks.length - completedCount;

  async function handleAdd(title) {
    setAdding(true);
    setError("");
    try {
      const task = await createTask(title);
      setTasks((current) => [task, ...current]);
      setFilter("all");
      return true;
    } catch (err) {
      setError(err.message);
      return false;
    } finally {
      setAdding(false);
    }
  }

  async function handleToggle(task) {
    setBusyId(task._id);
    setError("");
    try {
      const updated = await updateTask(task._id, { completed: !task.completed });
      setTasks((current) => current.map((item) => item._id === updated._id ? updated : item));
    } catch (err) {
      setError(err.message);
    } finally {
      setBusyId(null);
    }
  }

  async function handleEdit(id, title) {
    setBusyId(id);
    setError("");
    try {
      const updated = await updateTask(id, { title });
      setTasks((current) => current.map((item) => item._id === updated._id ? updated : item));
      return true;
    } catch (err) {
      setError(err.message);
      return false;
    } finally {
      setBusyId(null);
    }
  }

  async function handleDelete(id) {
    setBusyId(id);
    setError("");
    try {
      await deleteTask(id);
      setTasks((current) => current.filter((item) => item._id !== id));
    } catch (err) {
      setError(err.message);
    } finally {
      setBusyId(null);
    }
  }

  return (
    <main className="page-shell">
      <header className="topbar">
        <a className="brand" href="/" aria-label="Daylist home">
          <span className="brand-mark"><ListTodo size={21} /></span>
          <span>daylist<span className="brand-dot">.</span></span>
        </a>
        <span className="topbar-note"><span className="status-dot" /> Your day, in focus</span>
      </header>

      <section className="hero">
        <div className="eyebrow"><Sparkles size={14} /> A LITTLE MORE CLARITY</div>
        <h1>Make room for<br /><span>what matters.</span></h1>
        <p className="hero-copy">A calmer way to keep track of your day.<br />One task at a time.</p>
      </section>

      <section className="todo-card" aria-label="To-do list">
        <div className="card-heading">
          <div>
            <p className="section-kicker">YOUR TASKS</p>
            <h2>Today's list <span className="count-pill">{activeCount}</span></h2>
          </div>
          <div className="completion-summary"><CheckCircle2 size={16} /> {completedCount} done</div>
        </div>

        <TaskForm onAdd={handleAdd} busy={adding} />

        <div className="list-toolbar">
          <div className="filter-tabs" role="group" aria-label="Filter tasks">
            {["all", "active", "completed"].map((value) => (
              <button
                key={value}
                className={`filter-tab ${filter === value ? "selected" : ""}`}
                type="button"
                onClick={() => setFilter(value)}
              >
                {value[0].toUpperCase() + value.slice(1)}
              </button>
            ))}
          </div>
          <button className="refresh-button" type="button" onClick={loadTasks} title="Refresh tasks" aria-label="Refresh tasks">
            <RefreshCw size={15} />
          </button>
        </div>

        {error && <div className="error-message" role="alert">{error}</div>}
        {loading ? (
          <div className="loading-state"><span className="spinner" /> Loading your tasks…</div>
        ) : (
          <TaskList
            tasks={tasks}
            filter={filter}
            onToggle={handleToggle}
            onDelete={handleDelete}
            onEdit={handleEdit}
            busyId={busyId}
          />
        )}

        <footer className="card-footer">
          <span>{activeCount === 0 ? "All caught up — lovely work." : `${activeCount} ${activeCount === 1 ? "task" : "tasks"} left to focus on`}</span>
          <span className="footer-sparkle">✳</span>
        </footer>
      </section>

      <p className="page-footnote">Small steps make meaningful days.</p>
    </main>
  );
}
