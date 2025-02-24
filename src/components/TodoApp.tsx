import { useState } from "react";
import "./TodoList.css";
import TodoItem from "./TodoItem";

type Task = {
  id: number;
  text: string;
  completed: boolean;
};

function TodoApp() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filter, setFilter] = useState<"all" | "active" | "completed">("all");
  const [newTaskText, setNewTaskText] = useState<string>("");

  const addTask = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === " " || e.key === "Enter") {
      e.preventDefault();

      if (newTaskText.trim() !== "") {
        setTasks([
          ...tasks,
          {
            id: Date.now(),
            text: newTaskText,
            completed: false,
          },
        ]);
        setNewTaskText("");
      }
    }
  };

  const toggleTaskCompletion = (id: number) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteCompletedTasks = () => {
    setTasks(tasks.filter((task) => !task.completed));
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === "all") return true;
    if (filter === "active") return !task.completed;
    if (filter === "completed") return task.completed;
    return true;
  });

  return (
    <div className="todo-list">
      <div className="todo-list__input-container">
        <input
          className="todo-list__input"
          type="text"
          placeholder="What needs to be done?"
          value={newTaskText}
          onChange={(e) => setNewTaskText(e.target.value)}
          onKeyDown={addTask}
        />
      </div>

      <ul className="todo-list__tasks">
        {filteredTasks.map((task) => (
          <TodoItem
            key={task.id}
            task={task}
            toggleTaskCompletion={toggleTaskCompletion}
          />
        ))}
      </ul>

      <div className="todo-list__filters">
        <button
          className="todo-list__filter-btn"
          onClick={() => setFilter("all")}
        >
          All
        </button>
        <button
          className="todo-list__filter-btn"
          onClick={() => setFilter("active")}
        >
          Active
        </button>
        <button
          className="todo-list__filter-btn"
          onClick={() => setFilter("completed")}
        >
          Completed
        </button>
        <button className="todo-list__clear-btn" onClick={deleteCompletedTasks}>
          Clear Completed
        </button>
      </div>
    </div>
  );
}

export default TodoApp;
