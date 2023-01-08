class Task {
  constructor(name, description, date, time, priority) {
    this._name = name;
    this._description = description;
    this._date = date;
    this._time = time;
    this._priority = priority;

    this._inProgress = false;
    this._complete = false;
  }

  // ? getters
  get name() {
    return this._name;
  }

  get description() {
    return this._description;
  }

  get date() {
    return this._date;
  }

  get time() {
    return this._time;
  }

  // ? setters
  set name(newName) {
    this._name = newName;
  }

  set description(note) {
    this._description = note;
  }
  set date(newDate) {
    this._date = newDate;
  }

  set time(newTime) {
    this._time = newTime;
  }

  edit() {}

  delete() {}
}
class Method {
  static formatDate(dateString) {
    if (!dateString) {
      return (dateString = "");
    }
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  }

  static render(arrayFromLs, rootEl, oneTask) {
    // let { _name, _description, _date, _time, _priority } = oneTask;

    //? root element ul
    const rootElement = document.querySelector(rootEl);
    const list = document.createElement("li");
    list.classList.add("newTask");
    rootElement.appendChild(list);
    const taskHead = document.createElement("div");
    taskHead.classList.add("head");
    list.appendChild(taskHead);
    const priority = document.createElement("span");
    priority.classList.add("priority");
    priority.style.backgroundColor = "#" + oneTask._priority;
    taskHead.appendChild(priority);
    const status = document.createElement("div");
    status.classList.add("status");
    taskHead.appendChild(status);
    const process = document.createElement("span");
    if (oneTask._inProgress) {
      process.classList.add("progress");
    } else if (oneTask._complete) {
      process.classList.add("complet");
    } else {
      process.classList.add("to-do");
    }
    status.appendChild(process);
    const taskInfo = document.createElement("div");
    taskInfo.classList.add("task-info");
    list.appendChild(taskInfo);
    const taskInputsDiv = document.createElement("div");
    taskInputsDiv.classList.add("taskText");
    taskInfo.appendChild(taskInputsDiv);
    const taskInputName = document.createElement("input");
    taskInputName.type = "text";
    taskInputName.id = "taskName";
    taskInputName.setAttribute("Readonly", "readonly");
    taskInputName.value = oneTask._name;
    taskInputsDiv.appendChild(taskInputName);
    const taskInputNote = document.createElement("input");
    taskInputNote.type = "text";
    taskInputNote.id = "note";
    taskInputNote.setAttribute("Readonly", "readonly");
    taskInputNote.value = oneTask._description;
    taskInputsDiv.appendChild(taskInputNote);

    const clock = document.createElement("div");
    clock.classList.add("clock");
    taskInfo.appendChild(clock);

    const dateInput = document.createElement("input");
    dateInput.type = "text";
    dateInput.id = "taskDate";
    dateInput.setAttribute("Readonly", "readonly");
    dateInput.value = oneTask._date;
    clock.appendChild(dateInput);

    const timeInput = document.createElement("input");
    timeInput.type = "text";
    timeInput.id = "taskTime";
    timeInput.setAttribute("Readonly", "readonly");
    timeInput.value = oneTask._time;
    clock.appendChild(timeInput);

    const completeDiv = document.createElement("div");
    completeDiv.classList.add("complete");
    list.appendChild(completeDiv);

    const label = document.createElement("label");
    label.classList.add("check");
    completeDiv.appendChild(label);
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.id = "done";
    label.appendChild(checkbox);
    const checkboxSpan = document.createElement("span");
    checkboxSpan.classList.add("checkbox");
    label.appendChild(checkboxSpan);
    const toProgressBtn = document.createElement("button");
    toProgressBtn.id = "to-progress";
    toProgressBtn.type = "button";
    toProgressBtn.textContent = "In-progress";
    completeDiv.appendChild(toProgressBtn);
    const settings = document.createElement("div");
    settings.classList.add("settings");
    completeDiv.appendChild(settings);
    const edit = document.createElement("span");
    edit.classList.add("edit");
    const delBtn = document.createElement("span");
    delBtn.classList.add("delete");
    settings.appendChild(edit);
    settings.appendChild(delBtn);

    checkbox.addEventListener("click", (e) => {
      if (e.target.checked) {
        oneTask._complete = true;
        setTimeout(() => {
          rootElement.removeChild(list);
          let taskIndex = arrayFromLs.findIndex((someTask) => {
            return someTask._complete === true;
          });
          //? remove task from local storage
          arrayFromLs.splice(taskIndex, 1);

          //? update locals storage
          localStorage.setItem("todo", JSON.stringify(arrayFromLs));

          //?  update complete task
          completeTask.push(oneTask);
          localStorage.setItem("complete", JSON.stringify(completeTask));
          //? render complete Task
          Method.render(completeTask, ".completeTask", oneTask);
        }, 1000);
      }
    });
  }
}

// ? new Task
const todo = JSON.parse(localStorage.getItem("todo")) || [];
// ? progress task
const inProgress = [];
// ? complete task
const completeTask = JSON.parse(localStorage.getItem("complete")) || [];

// ! creating new Task with Form
const creatingTask = document.querySelector(".create-task");
creatingTask.addEventListener("submit", (e) => {
  e.preventDefault();

  // ? values from form
  const taskName = e.target.elements.name.value;
  const taskNote = e.target.elements.description.value;
  const taskDate = Method.formatDate(e.target.elements.date.value);
  const taskTime = e.target.elements.time.value;
  const taskPriorityColor = e.target.elements.color.value;

  if (!taskName) {
    return (e.target.elements.name.placeholder = "Add some text");
  } else {
    // ! creating new object
    const newTask = new Task(
      taskName,
      taskNote,
      taskDate,
      taskTime,
      taskPriorityColor
    );
    console.table(newTask);

    todo.push(newTask);

    localStorage.setItem("todo", JSON.stringify(todo));

    Method.render(todo, ".todo", newTask);

    creatingTask.reset();
  }
});

todo.forEach((task) => {
  Method.render(todo, ".todo", task);
});

completeTask.forEach((doneTask) => {
  Method.renderCompleteTask(".completeTask", doneTask);
});

// todo in complete Task must be checked input, nesmí se na něj kliknout and možnost odstranit z complete
// todo focus on date = date.now
