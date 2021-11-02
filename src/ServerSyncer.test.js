import ServerSyncer from "./ServerSyncer";
import { createTaskCollection } from "./TaskCollection";

describe("ServerSyncer", function () {
  it("should sync new tasks", function () {
    const syncedTasks = [];
    const onTaskSynced = (task) => syncedTasks.push(task);
    const taskCollection = createTaskCollection({ name: "a" });
    const subject = new ServerSyncer({ onTaskSynced });
    subject.register(taskCollection);

    taskCollection.add({ name: "b" });

    expect(syncedTasks).toContainEqual({ name: "b" });
  });
});
