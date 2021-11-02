export default class ServerSyncer {
  constructor({ onTaskSynced = () => {} } = {}) {
    this.onTaskSynced = onTaskSynced;
  }

  register(taskCollection) {
    this.taskCollection = taskCollection;
    this.taskCollection.register(() => this.sync());
  }

  sync() {
    // replace this with actual server syncing code. can use patterns like NullableInfrastructure to let collaborators
    // use this in tests
    console.log("task synced", this.taskCollection.last().name);
    this.onTaskSynced(this.taskCollection.last());
  }
}
