export default class ServerSyncer {
  constructor(taskCollection, { onTaskSynced = () => {} }) {
    this.taskCollection = taskCollection;
    this.onTaskSynced = onTaskSynced;

    this.taskCollection.register(() => this.sync())
  }

  sync() {
    console.log('task synced', this.taskCollection.last().name);
    this.onTaskSynced(this.taskCollection.last());
  }
}
