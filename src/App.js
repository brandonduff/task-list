import { useEffect, useState } from "react";
import TaskCollection from "./TaskCollection";
import ServerSyncer from "./ServerSyncer";

export function createTaskCollection(serverSyncer) {
  const taskCollection = TaskCollection.create(
    { name: "wash the car" },
    { name: "do the dishes" }
  );
  serverSyncer.register(taskCollection);
  return taskCollection;
}

function App() {
  return (
    <div className="App">
      <TaskListView taskCollection={createTaskCollection(new ServerSyncer())} />
    </div>
  );
}

function useTasks(taskCollection) {
  const [tasks, setTasks] = useState(taskCollection.getEntries());

  useEffect(() => {
    taskCollection.register(setTasks);
    // should return function to deregister in real app
  }, [taskCollection]);

  return {
    tasks,
    sort: taskCollection.sort.bind(taskCollection),
    add: taskCollection.add.bind(taskCollection),
    remove: taskCollection.remove.bind(taskCollection),
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
