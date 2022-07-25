import Todo from "./components/Todo";
import Form from "./components/Form";
import FilterButton from "./components/FilterButton";
import { useState } from "react";
import { nanoid } from "nanoid";
function App(props) {
  const [tasks, setTasks] = useState(props.tasks);
  function addTask(name) {
    const newTask = { id: "todo-" + nanoid(), name: name, completed: false };
    setTasks([...tasks, newTask]);
  }
  function toggleTaskCompleted(id) {
    const updatedTasks = tasks.map((task) => {
      if (id === task.id)
        return { ...task, completed: !task.completed }
      return task;
    });
    setTasks(updatedTasks);
  }
  function deleteTask(id) {
    const remainingTasks = tasks.filter((task) => id !== task.id);
    setTasks(remainingTasks);
  }
  function editTask(id, newName) {
    const editedTaskList = tasks.map((task) => {    
      if (id === task.id) {        
        return {...task, name: newName}
      }
      return task;
    });
    setTasks(editedTaskList);
  }
  

  const tasksList = tasks.map((task) =>
    <Todo name={task.name} completed={task.completed} id={task.id}
      key={task.id} toggleTaskCompleted={toggleTaskCompleted} deleteTask={deleteTask} 
      editTask={editTask} />)
  const tasksNoun = tasksList.length > 1 ? 'tasks' : 'task';
  const headingText = `${tasksList.length} ${tasksNoun} remaining`;
  return (
    <div className="todoapp stack-large">
      <h1>TodoMatic</h1>
      <Form addTask={addTask} />
      <div className="filters btn-group stack-exception">
        <FilterButton text="All" />
        <FilterButton text="Active" />
        <FilterButton text="Completed" />
      </div>
      <h2 id="list-heading">
        {headingText}
      </h2>
      <ul
        role="list"
        className="todo-list stack-large stack-exception"
        aria-labelledby="list-heading"
      >
        {tasksList}
      </ul>
    </div>
  );
}


export default App;
