import { act, fireEvent, render, screen } from "@testing-library/react";
import App, { TaskListView, createTaskCollection } from "./App";
import TaskCollection from "./TaskCollection";
import ServerSyncer from "./ServerSyncer";

let updated = true;
const update = () => {
  updated = true;
};

beforeEach(() => {
  updated = false;
});

test("renders main", () => {
  render(<App />);
  expect(screen.getByText("do the dishes")).toBeInTheDocument();
});

describe("TaskListView", () => {
  it("should display a list of tasks", function () {
    const taskCollection = new TaskCollection();
    taskCollection.add({ name: "do the dishes" });

    render(<TaskListView taskCollection={taskCollection} />);

    expect(screen.getByText("do the dishes")).toBeInTheDocument();
  });

  it("should rerender when taskCollection notifies of changes", function () {
    const taskCollection = new TaskCollection();
    render(<TaskListView taskCollection={taskCollection} />);

    act(() => {
      taskCollection.add({ name: "do the dishes" });
    });

    expect(screen.getByText("do the dishes")).toBeInTheDocument();
  });
});

describe("SortButton", () => {
  it("should have a button to sort the collection", function () {
    const taskCollection = new TaskCollection({ name: "b" }, { name: "a" });
    render(<TaskListView taskCollection={taskCollection} />);

    fireEvent.click(screen.getByText("Sort"));

    expect(taskCollection.entries[0].name).toEqual("a");
  });
});

describe("AddButton", () => {
  it("should have a button to add a New Task", function () {
    const taskCollection = new TaskCollection();
    render(<TaskListView taskCollection={taskCollection} />);

    fireEvent.click(screen.getByText("Add New Task"));

    expect(taskCollection.entries[0].name).toEqual("New Task");
  });
});

describe("removing tasks", function () {
  it("should have a button to remove tasks", function () {
    const taskCollection = new TaskCollection({ name: "remove me" });
    render(<TaskListView taskCollection={taskCollection} />);

    fireEvent.click(screen.getByText("x"));

    expect(taskCollection.entries.length).toEqual(0);
  });
});

describe("TaskCollection", () => {
  test("can add tasks", () => {
    const subject = new TaskCollection();
    subject.add({ name: "do the dishes" });
    expect(subject.entries[0].name).toEqual("do the dishes");
  });

  test("notifies observers on add", () => {
    const subject = new TaskCollection();
    subject.register(update);

    subject.add({ name: "a task" });

    expect(updated).toBeTruthy();
  });

  test("can be sorted", () => {
    const subject = new TaskCollection({ name: "b" }, { name: "a" });

    subject.sort();

    expect(subject.entries[0].name).toEqual("a");
    expect(subject.entries[1].name).toEqual("b");
  });

  test("notifies observers on sort", () => {
    const subject = new TaskCollection();
    subject.register(update);

    subject.sort();

    expect(updated).toBeTruthy();
  });

  test("can remove tasks", () => {
    const subject = new TaskCollection();
    subject.add({ name: "a" });
    subject.add({ name: "b" });
    subject.remove({ name: "a" });
    expect(subject.getEntries()).not.toContainEqual({ name: "a" });
  });

  test("notifies listeners on remove", () => {
    const subject = new TaskCollection();
    subject.register(update);
    subject.remove({ name: "a" });
    expect(updated).toBeTruthy();
  });
});

test("create task collection links up server syncer", () => {
  const serverSyncer = new ServerSyncer({ onTaskSynced: update });
  const taskCollection = createTaskCollection(serverSyncer);

  taskCollection.add({ name: "a" });

  expect(updated).toBeTruthy();
});
