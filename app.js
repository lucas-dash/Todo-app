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

  static saveStorage(arrayToSave) {
    if (arrayToSave === todo) {
      localStorage.setItem("todo", JSON.stringify(arrayToSave));
    } else if (arrayToSave === inProgress) {
      localStorage.setItem("progress", JSON.stringify(arrayToSave));
    } else if (arrayToSave === completeTask) {
      localStorage.setItem("complete", JSON.stringify(arrayToSave));
    }
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

    const datePicker = document.createElement("input");
    datePicker.type = "date";
    datePicker.id = "datePicker";
    clock.appendChild(datePicker);

    const dateInput = document.createElement("input");
    dateInput.type = "text";
    dateInput.id = "taskDate";
    dateInput.setAttribute("Readonly", "readonly");
    dateInput.value = oneTask._date;
    clock.appendChild(dateInput);

    const timeInput = document.createElement("input");
    timeInput.type = "text";
    timeInput.id = "taskTime";
    timeInput.setAttribute("readonly", "readonly");
    timeInput.value = oneTask._time;
    clock.appendChild(timeInput);

    const timePicker = document.createElement("input");
    timePicker.type = "time";
    timePicker.id = "timePicker";
    clock.appendChild(timePicker);

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
    toProgressBtn.classList.add("to-progress");
    toProgressBtn.type = "button";
    toProgressBtn.textContent = "In-progress?";
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

    // ! edit button and function
    edit.addEventListener("click", (e) => {
      if (edit.className === "edit") {
        edit.classList.remove("edit");
        edit.classList.add("edit-save");
        taskInputName.removeAttribute("readonly");
        taskInputNote.removeAttribute("readonly");
        datePicker.style.display = "block";
        timePicker.style.display = "block";
        taskInputName.focus();

        taskInputName.addEventListener("change", (e) => {
          oneTask._name = taskInputName.value.trim();
          Method.saveStorage(arrayFromLs);
        });
        taskInputNote.addEventListener("change", (e) => {
          oneTask._description = taskInputNote.value.trim();
          Method.saveStorage(arrayFromLs);
        });

        datePicker.addEventListener("change", (e) => {
          dateInput.value = Method.formatDate(datePicker.value);
          oneTask._date = dateInput.value;
          Method.saveStorage(arrayFromLs);
        });

        timePicker.addEventListener("change", (e) => {
          timeInput.value = e.target.value;
          oneTask._time = timeInput.value;
          Method.saveStorage(arrayFromLs);
        });

        document.addEventListener("keypress", (e) => {
          if (e.key === "Enter") {
            taskInputName.setAttribute("Readonly", "readonly");
            taskInputNote.setAttribute("Readonly", "readonly");
            datePicker.style.display = "none";
            timePicker.style.display = "none";
            edit.classList.remove("edit-save");
            edit.classList.add("edit");
          }
        });
      } else if (edit.className === "edit-save") {
        taskInputName.setAttribute("Readonly", "readonly");
        taskInputNote.setAttribute("Readonly", "readonly");
        datePicker.style.display = "none";
        timePicker.style.display = "none";
        edit.classList.remove("edit-save");
        edit.classList.add("edit");
      }
    });

    // ! delete button
    delBtn.addEventListener("click", () => {
      // todo animation
      setTimeout(() => {
        rootElement.removeChild(list);
        // ? delete index task
        let removeIndex = arrayFromLs.findIndex(
          (delTask) => delTask === oneTask
        );
        arrayFromLs.splice(removeIndex, 1);

        Method.saveStorage(arrayFromLs);
      }, 1000);
    });

    // ? avoid complete task
    if (arrayFromLs === todo || arrayFromLs === inProgress) {
      //! if is task Complete listener
      checkbox.addEventListener("click", (e) => {
        if (e.target.checked) {
          oneTask._complete = true;

          setTimeout(() => {
            rootElement.removeChild(list);
            //? find index at array and remove task from local storage
            let taskIndex = arrayFromLs.findIndex((someTask) => {
              return someTask._complete === true;
            });
            arrayFromLs.splice(taskIndex, 1);

            //? update todo local storage and avoid douple progress task
            if (oneTask._inProgress === true) {
              localStorage.setItem("progress", JSON.stringify(arrayFromLs));
            } else {
              localStorage.setItem("todo", JSON.stringify(arrayFromLs));
            }
            oneTask._inProgress = false;

            //?  update complete task
            completeTask.push(oneTask);
            localStorage.setItem("complete", JSON.stringify(completeTask));
            //? render complete Task
            Method.render(completeTask, ".completeTask", oneTask);
          }, 1000);
        }
      });
      // ? event in progres if is in todo
      if (arrayFromLs === inProgress) {
        toProgressBtn.removeEventListener;
        toProgressBtn.classList.remove("to-progress");
        toProgressBtn.classList.add("in-progress-done");
        toProgressBtn.textContent = "In-progress!";
      } else {
        //? if is task inProgress listener
        toProgressBtn.addEventListener("click", () => {
          oneTask._inProgress = true;

          setTimeout(() => {
            rootElement.removeChild(list);
            //? find index at array
            let taskIndex = arrayFromLs.findIndex((someTask) => {
              return someTask._inProgress === true;
            });
            //? remove task from todo array
            arrayFromLs.splice(taskIndex, 1);
            //? update todo localStorage
            // localStorage.setItem("todo", JSON.stringify(arrayFromLs));
            Method.saveStorage(arrayFromLs);
            //? push and update progress localStorage
            inProgress.push(oneTask);
            localStorage.setItem("progress", JSON.stringify(inProgress));
            //? render inProgress tasks
            Method.render(inProgress, ".progressTask", oneTask);
          }, 1000);
        });
      }
    } else {
      checkboxSpan.classList.remove("checkbox");
      checkboxSpan.classList.add("checkedInput");
      toProgressBtn.textContent = "Complete!";
      toProgressBtn.style.cursor = "auto";
      // todo change complete style
    }
  }
}

// ! arrays

// ? new Task
const todo = JSON.parse(localStorage.getItem("todo")) || [];
// ? progress task
const inProgress = JSON.parse(localStorage.getItem("progress")) || [];
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
    // todo přidat Alert style and shake
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

inProgress.forEach((progressTask) => {
  Method.render(inProgress, ".progressTask", progressTask);
});

completeTask.forEach((doneTask) => {
  Method.render(completeTask, ".completeTask", doneTask);
});

// todo in complete Task možnost odstranit z complete
// todo click vpravo nahoře vrátit zpět do todo? nebo nějakou návratovou funkci
