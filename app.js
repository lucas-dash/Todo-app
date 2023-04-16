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
      return (dateString = '');
    }
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  }

  static saveStorage(arrayToSave) {
    if (arrayToSave === todo) {
      localStorage.setItem('todo', JSON.stringify(arrayToSave));
    } else if (arrayToSave === inProgress) {
      localStorage.setItem('progress', JSON.stringify(arrayToSave));
    } else if (arrayToSave === completeTask) {
      localStorage.setItem('complete', JSON.stringify(arrayToSave));
    }
  }

  static render(arrayFromLs, rootEl, oneTask) {
    //? root element ul
    const rootElement = document.querySelector(rootEl);

    const list = document.createElement('li');
    list.classList.add('newTask');
    rootElement.appendChild(list);

    const taskHead = document.createElement('div');
    taskHead.classList.add('head');
    list.appendChild(taskHead);

    const priority = document.createElement('span');
    priority.classList.add('priority');
    priority.style.backgroundColor = '#' + oneTask._priority;
    taskHead.appendChild(priority);

    const status = document.createElement('div');
    status.classList.add('status');
    taskHead.appendChild(status);

    const process = document.createElement('span');
    if (oneTask._inProgress) {
      process.classList.add('progress');
    } else if (oneTask._complete) {
      process.classList.add('complet');
    } else {
      process.classList.add('to-do');
    }
    status.appendChild(process);
    const taskInfo = document.createElement('div');
    taskInfo.classList.add('task-info');

    list.appendChild(taskInfo);
    const taskInputsDiv = document.createElement('div');
    taskInputsDiv.classList.add('taskText');
    taskInfo.appendChild(taskInputsDiv);

    const taskInputName = document.createElement('input');
    taskInputName.type = 'text';
    taskInputName.id = 'taskName';
    taskInputName.setAttribute('Readonly', 'readonly');
    taskInputName.value = oneTask._name;
    taskInputsDiv.appendChild(taskInputName);

    const taskInputNote = document.createElement('input');
    taskInputNote.type = 'text';
    taskInputNote.id = 'note';
    taskInputNote.setAttribute('Readonly', 'readonly');
    taskInputNote.value = oneTask._description;
    taskInputsDiv.appendChild(taskInputNote);

    const clock = document.createElement('div');
    clock.classList.add('clock');
    taskInfo.appendChild(clock);

    const datePicker = document.createElement('input');
    datePicker.type = 'date';
    datePicker.id = 'datePicker';
    clock.appendChild(datePicker);

    const dateInput = document.createElement('input');
    dateInput.type = 'text';
    dateInput.id = 'taskDate';
    dateInput.setAttribute('Readonly', 'readonly');
    dateInput.value = oneTask._date;
    clock.appendChild(dateInput);

    const timeInput = document.createElement('input');
    timeInput.type = 'text';
    timeInput.id = 'taskTime';
    timeInput.setAttribute('readonly', 'readonly');
    timeInput.value = oneTask._time;
    clock.appendChild(timeInput);

    const timePicker = document.createElement('input');
    timePicker.type = 'time';
    timePicker.id = 'timePicker';
    clock.appendChild(timePicker);

    const completeDiv = document.createElement('div');
    completeDiv.classList.add('complete');
    list.appendChild(completeDiv);

    const label = document.createElement('label');
    label.classList.add('check');
    completeDiv.appendChild(label);

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.id = 'done';
    label.appendChild(checkbox);

    const checkboxSpan = document.createElement('span');
    checkboxSpan.classList.add('checkbox');
    label.appendChild(checkboxSpan);

    const toProgressBtn = document.createElement('button');
    toProgressBtn.classList.add('to-progress');
    toProgressBtn.type = 'button';
    toProgressBtn.textContent = 'In-progress?';
    completeDiv.appendChild(toProgressBtn);

    const settings = document.createElement('div');
    settings.classList.add('settings');
    completeDiv.appendChild(settings);

    const edit = document.createElement('span');
    edit.classList.add('edit');
    const delBtn = document.createElement('span');
    delBtn.classList.add('delete');
    settings.appendChild(edit);
    settings.appendChild(delBtn);

    // ! edit button and function
    edit.addEventListener('click', (e) => {
      if (edit.className === 'edit') {
        edit.classList.remove('edit');
        edit.classList.add('edit-save');
        taskInputName.removeAttribute('readonly');
        taskInputNote.removeAttribute('readonly');
        datePicker.style.display = 'block';
        timePicker.style.display = 'block';
        taskInputName.focus();

        taskInputName.addEventListener('change', (e) => {
          oneTask._name = taskInputName.value.trim();
          Method.saveStorage(arrayFromLs);
        });
        taskInputNote.addEventListener('change', (e) => {
          oneTask._description = taskInputNote.value.trim();
          Method.saveStorage(arrayFromLs);
        });

        datePicker.addEventListener('change', (e) => {
          dateInput.value = Method.formatDate(datePicker.value);
          oneTask._date = dateInput.value;
          Method.saveStorage(arrayFromLs);
        });

        timePicker.addEventListener('change', (e) => {
          timeInput.value = e.target.value;
          oneTask._time = timeInput.value;
          if (!dateInput.value) {
            dateInput.value = Method.formatDate(dateNow());
            oneTask._date = dateInput.value;
          }
          Method.saveStorage(arrayFromLs);
        });

        document.addEventListener('keypress', (e) => {
          if (e.key === 'Enter') {
            taskInputName.setAttribute('Readonly', 'readonly');
            taskInputNote.setAttribute('Readonly', 'readonly');
            datePicker.style.display = 'none';
            timePicker.style.display = 'none';
            edit.classList.remove('edit-save');
            edit.classList.add('edit');
          }
        });
      } else if (edit.className === 'edit-save') {
        taskInputName.setAttribute('Readonly', 'readonly');
        taskInputNote.setAttribute('Readonly', 'readonly');
        datePicker.style.display = 'none';
        timePicker.style.display = 'none';
        edit.classList.remove('edit-save');
        edit.classList.add('edit');
      }
    });

    // ! delete button
    delBtn.addEventListener('click', () => {
      // todo animation
      list.classList.add('delete-anim');
      setTimeout(() => {
        rootElement.removeChild(list);
        // ? delete index task
        let removeIndex = arrayFromLs.findIndex(
          (delTask) => delTask === oneTask
        );
        arrayFromLs.splice(removeIndex, 1);

        Method.saveStorage(arrayFromLs);
        getCountTask();
      }, 900);
    });

    // ? avoid complete task
    if (arrayFromLs === todo || arrayFromLs === inProgress) {
      //! if is task Complete listener
      checkbox.addEventListener('click', (e) => {
        if (e.target.checked) {
          oneTask._complete = true;
          list.classList.add('slide-to-long-right');

          setTimeout(() => {
            rootElement.removeChild(list);
            //? find index at array and remove task from local storage
            let taskIndex = arrayFromLs.findIndex((someTask) => {
              return someTask._complete === true;
            });
            arrayFromLs.splice(taskIndex, 1);

            //? update todo local storage and avoid douple progress task
            if (oneTask._inProgress === true) {
              localStorage.setItem('progress', JSON.stringify(arrayFromLs));
            } else {
              localStorage.setItem('todo', JSON.stringify(arrayFromLs));
            }
            oneTask._inProgress = false;

            //?  update complete task
            completeTask.push(oneTask);
            localStorage.setItem('complete', JSON.stringify(completeTask));
            // ? update count task
            getCountTask();
            //? render complete Task
            Method.render(completeTask, '.completeTask', oneTask);
          }, 650);
        }
      });
      // ? event in progres if is in todo
      if (arrayFromLs === inProgress) {
        toProgressBtn.removeEventListener;
        toProgressBtn.classList.remove('to-progress');
        toProgressBtn.classList.add('in-progress-done');
        toProgressBtn.textContent = 'In-progress!';
      } else {
        //? if is task inProgress listener
        toProgressBtn.addEventListener('click', () => {
          oneTask._inProgress = true;
          list.classList.add('slide-to-right');

          setTimeout(() => {
            rootElement.removeChild(list);
            //? find index at array
            let taskIndex = arrayFromLs.findIndex((someTask) => {
              return someTask._inProgress === true;
            });
            //? remove task from todo array
            arrayFromLs.splice(taskIndex, 1);
            //? update todo localStorage
            Method.saveStorage(arrayFromLs);
            //? push and update progress localStorage
            inProgress.push(oneTask);
            localStorage.setItem('progress', JSON.stringify(inProgress));
            //? render inProgress tasks
            getCountTask();
            Method.render(inProgress, '.progressTask', oneTask);
          }, 500);
        });
      }
    } else {
      checkboxSpan.classList.remove('checkbox');
      checkboxSpan.classList.add('checkedInput');
      toProgressBtn.textContent = 'Complete!';
      toProgressBtn.style.cursor = 'auto';
      taskInputName.classList.add('complete-style');
    }
  }
}

// ! arrays

// ? new Task
const todo = JSON.parse(localStorage.getItem('todo')) || [
  {
    _complete: false,
    _date: '16/04/2023',
    _description: 'Here is note for task',
    _inProgress: false,
    _name: 'Your tasks will be shown here',
    _priority: '14dd28',
    _time: '20:00',
  },
  {
    _complete: false,
    _date: '16/04/2023',
    _description: 'Sushi',
    _inProgress: false,
    _name: 'Make Lunch',
    _priority: '3581f2',
    _time: '11:00',
  },
];
// ? progress task
const inProgress = JSON.parse(localStorage.getItem('progress')) || [
  {
    _complete: false,
    _date: '18/04/2023',
    _description: '',
    _inProgress: true,
    _name: 'Clean room',
    _priority: '3581f2',
    _time: '13:00',
  },
];
// ? complete task
const completeTask = JSON.parse(localStorage.getItem('complete')) || [
  {
    _complete: true,
    _date: '06/04/2023',
    _description: '',
    _inProgress: false,
    _name: 'Here is complete task',
    _priority: 'f61f1f',
    _time: '18:00',
  },
];

// ! creating new Task with Form
const creatingTask = document.querySelector('.create-task');
creatingTask.addEventListener('submit', (e) => {
  e.preventDefault();

  // ? values from form
  const taskName = e.target.elements.name.value;
  const taskNote = e.target.elements.description.value;
  const taskDate = Method.formatDate(e.target.elements.date.value);
  const taskTime = e.target.elements.time.value;
  const taskPriorityColor = e.target.elements.color.value;

  if (!taskName) {
    // ? shake anim
    e.target.elements.name.placeholder = 'Add some text';
    e.target.elements.name.classList.add('not-valid');
    return;
  } else {
    e.target.elements.name.placeholder = 'What would you like to do?';
    e.target.elements.name.classList.remove('not-valid');
    addTaskBtn.classList.remove('click');

    // ! creating new object
    const newTask = new Task(
      taskName,
      taskNote,
      taskDate,
      taskTime,
      taskPriorityColor
    );

    todo.push(newTask);

    localStorage.setItem('todo', JSON.stringify(todo));

    Method.render(todo, '.todo', newTask);
    getCountTask();

    creatingTask.reset();

    // * form animation
    creatingTask.classList.add('formOff');
    setTimeout(() => {
      creatingTask.classList.remove('onBlured');
    }, 490);

    // * heading move up animation
    const heading = document.querySelector('.heading-create-task');
    heading.classList.add('moveDown');
    heading.classList.remove('moveUp');
  }
});

// ! render tasks after reload
todo.forEach((task) => {
  Method.render(todo, '.todo', task);
});

inProgress.forEach((progressTask) => {
  Method.render(inProgress, '.progressTask', progressTask);
});

completeTask.forEach((doneTask) => {
  Method.render(completeTask, '.completeTask', doneTask);
});

// ? show how much task are in which array
function getCountTask() {
  const todoCount = document.querySelectorAll('[data-todo]');
  const progresssCount = document.querySelectorAll('[data-progress]');
  const completeCount = document.querySelectorAll('[data-complete]');
  const sideBarCount = document.getElementById('count_task_side');

  todoCount.forEach((item) => {
    item.setAttribute('data-todo', todo.length);
  });
  progresssCount.forEach((item) => {
    item.setAttribute('data-progress', inProgress.length);
  });
  completeCount.forEach((item) => {
    item.setAttribute('data-complete', completeTask.length);
  });

  sideBarCount.textContent = todo.length;
}

getCountTask();
