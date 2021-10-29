export default class ServerSyncer {
  constructor({ onTaskSynced = () => {} } = {}) {
    this.onTaskSynced = onTaskSynced;
  }

  register(taskCollection) {
    this.taskCollection = taskCollection;
    this.taskCollection.register(() => this.sync())
  }

  sync() {
    console.log('task synced', this.taskCollection.last().name);
    this.onTaskSynced(this.taskCollection.last());
  }
}
