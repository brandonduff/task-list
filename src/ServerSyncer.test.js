import ServerSyncer from './ServerSyncer';
import TaskCollection from './TaskCollection';

describe('ServerSyncer', function () {
  it('should sync new tasks', function () {
    const syncedTasks = [];
    const onTaskSynced = task => syncedTasks.push(task);
    const taskCollection = new TaskCollection({ name: 'a' });
    const subject = new ServerSyncer(taskCollection, { onTaskSynced });

    taskCollection.add({ name: 'b' })

    expect(syncedTasks).toContainEqual({ name: 'b' })
  });
});
