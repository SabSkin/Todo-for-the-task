type TodoItemProps = {
  task: {
    id: number;
    text: string;
    completed: boolean;
  };
  toggleTaskCompletion: (id: number) => void;
};

function TodoItem({ task, toggleTaskCompletion }: TodoItemProps) {
  return (
    <li className="todo-list__task">
      <div
        className="todo-list__checkbox"
        onClick={() => toggleTaskCompletion(task.id)}
      >
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => toggleTaskCompletion(task.id)}
        />
        <span
          className={`todo-list__checkbox-icon ${
            task.completed ? "completed" : ""
          }`}
        ></span>
      </div>
      <span
        className={`todo-list__task-text ${task.completed ? "completed" : ""}`}
      >
        {task.text}
      </span>
    </li>
  );
}

export default TodoItem;
