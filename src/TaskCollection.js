export default class TaskCollection {
  constructor(...entries) {
    this.entries = entries;
    this.listeners = [];
  }

  add(task) {
    this.entries.push(task);
    this.notifyListeners();
  }

  remove(candidate) {
    const i = this.entries.findIndex(task => task.name === candidate.name);
    this.entries.splice(i, 1);
    this.notifyListeners();
  }

  last() {
    return this.entries[this.entries.length - 1];
  }

  getEntries() {
    return [...this.entries]
  }

  sort() {
    this.entries.sort((a, b) => {
      if (a.name === b.name)
        return 0;
      else if (a.name < b.name)
        return -1;
      else
        return 1;
    });
    this.notifyListeners();
  }

  notifyListeners() {
    this.listeners.forEach(listener => listener(this.getEntries()));
  }

  register(listener) {
    this.listeners.push(listener)
  }
}
