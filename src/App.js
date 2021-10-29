import {useEffect, useState} from "react";
import TaskCollection from "./TaskCollection";

function App() {
  return (
    <div className="App">
      <TaskListView taskCollection={new TaskCollection({name: 'wash the car'}, {name: 'do the dishes'})} />
    </div>
  );
}

export function TaskListView({taskCollection}) {
  const [tasks, setTasks] = useState(taskCollection.getEntries());

  useEffect(() => {
    taskCollection.register(setTasks);
    // should return function to deregister in real app
  }, [taskCollection]);

  return (
    <>
      <button onClick={() => taskCollection.sort()}>Sort</button>
      <button onClick={() => taskCollection.add({ name: 'New Task' })}>Add New Task</button>
        <div>
          {tasks.map(entry => {
            return <div key={entry.name}>{entry.name}</div>
          })}
        </div>
    </>
  )
}

export default App;
