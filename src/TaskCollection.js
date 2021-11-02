export function createTaskCollection(...entries) {
  const listeners = [];
  const notifyListeners = () => {
    listeners.forEach((listener) => listener(getEntries()));
  };

  const getEntries = () => {
    return [...entries];
  };

  const register = (listener) => {
    listeners.push(listener);
  };

  const remove = (candidate) => {
    const i = entries.findIndex((task) => task.name === candidate.name);
    entries.splice(i, 1);
    notifyListeners();
  };

  const add = (task) => {
    entries.push(task);
    notifyListeners();
  };

  const last = () => {
    return entries[entries.length - 1];
  };

  const sort = () => {
    entries.sort((a, b) => {
      if (a.name === b.name) return 0;
      else if (a.name < b.name) return -1;
      else return 1;
    });
    notifyListeners();
  };

  return {
    add,
    sort,
    last,
    remove,
    register,
    getEntries,
  };
}
