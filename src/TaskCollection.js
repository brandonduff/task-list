export default class TaskCollection {
  constructor(...entries) {
    this.entries = entries;
    this.listeners = [];
  }

  add(task) {
    this.entries.push(task)
    this.notifyListeners();
  }

  sort() {
    this.entries.sort((a, b) => {
      if (a.name === b.name)
        return 0;
      else if(a.name < b.name)
        return -1;
      else
        return 1;
    });
    this.notifyListeners();
  }

  notifyListeners() {
    this.listeners.forEach(listener => listener());
  }

  register(listener) {
    this.listeners.push(listener)
  }
}
