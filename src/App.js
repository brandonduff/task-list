import { useEffect, useState } from "react";
import { createTaskCollection } from "./TaskCollection";
import ServerSyncer from "./ServerSyncer";

export function buildTaskCollection(serverSyncer) {
  const taskCollection = createTaskCollection(
    { name: "wash the car" },
    { name: "do the dishes" }
  );
  serverSyncer.register(taskCollection);
  return taskCollection;
}

function App() {
  return (
    <div className="App">
      <TaskListView taskCollection={buildTaskCollection(new ServerSyncer())} />
    </div>
  );
}

function useTasks(taskCollection) {
  const { getEntries, register, ...rest } = taskCollection;
  const [tasks, setTasks] = useState(getEntries());

  useEffect(() => {
    register(setTasks);
    // should return function to deregister in real app
  }, [taskCollection]);

  return {
    tasks,
    ...rest,
  };
}

export function TaskListView({ taskCollection }) {
  const { tasks, sort, add, remove } = useTasks(taskCollection);

  return (
    <>
      <button onClick={sort}>Sort</button>
      <button onClick={() => add({ name: "New Task" })}>Add New Task</button>
      <div>
        {tasks.map((entry) => {
          return (
            <div key={entry.name}>
              <span>{entry.name}</span>
              <button onClick={() => remove(entry)}>x</button>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default App;
