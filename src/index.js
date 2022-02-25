import './style.css';

const taskInput = document.getElementById('new-task');
const addButton = document.getElementsByTagName('button')[0];
const incompleteTaskHolder = document.getElementById('incomplete-tasks');
const completedTasksHolder = document.getElementById('completed-tasks');
const createNewTaskElement = function (taskString) {
  const listItem = document.createElement('li');
  const checkBox = document.createElement('input');
  const label = document.createElement('label');
  const editInput = document.createElement('input');
  const editButton = document.createElement('button');

  const deleteButton = document.createElement('button');

  label.innerText = taskString;

  checkBox.type = 'checkbox';
  editInput.type = 'text';

  editButton.innerText = 'Edit';
  editButton.className = 'edit';
  deleteButton.innerText = 'Delete';
  deleteButton.className = 'delete';

  listItem.appendChild(checkBox);
  listItem.appendChild(label);
  listItem.appendChild(editInput);
  listItem.appendChild(editButton);
  listItem.appendChild(deleteButton);
  return listItem;
};
const bindTaskEvents = function (taskListItem, checkBoxEventHandler) {
  console.log('bind list item events');
  const checkBox = taskListItem.querySelector('input[type=checkbox]');
  const editButton = taskListItem.querySelector('button.edit');
  const deleteButton = taskListItem.querySelector('button.delete');

  editButton.onclick = editTask;
  deleteButton.onclick = deleteTask;
  checkBox.onchange = checkBoxEventHandler;
};
const addTask = function () {
  console.log('Add Task...');
  const listItem = createNewTaskElement(taskInput.value);
  const taskCompleted = function () {
    console.log('Complete Task...');
    let listItem = this.parentNode;
    completedTasksHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskIncomplete);
  };

  incompleteTaskHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskCompleted);

  taskInput.value = '';
};

let editTask = function () {
  console.log('Edit Task...');
  console.log("Change 'edit' to 'save'");

  let listItem = this.parentNode;

  let editInput = listItem.querySelector('input[type=text]');
  let label = listItem.querySelector('label');
  let containsClass = listItem.classList.contains('editMode');
  if (containsClass) {
    label.innerText = editInput.value;
  } else {
    editInput.value = label.innerText;
  }

  listItem.classList.toggle('editMode');
};

let deleteTask = function () {
  console.log('Delete Task...');

  let listItem = this.parentNode;
  let ul = listItem.parentNode;
  ul.removeChild(listItem);
};

let taskIncomplete = function () {
  console.log('Incomplete Task...');

  let listItem = this.parentNode;
  incompleteTaskHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskCompleted);
};

let ajaxRequest = function () {
  console.log('AJAX Request');
};

addButton.onclick = addTask;
addButton.addEventListener('click', addTask);
addButton.addEventListener('click', ajaxRequest);

for (let i = 0; i < incompleteTaskHolder.children.length; i++) {
  bindTaskEvents(incompleteTaskHolder.children[i], taskCompleted);
}
for (i = 0; i < completedTasksHolder.children.length; i++) {
  bindTaskEvents(completedTasksHolder.children[i], taskIncomplete);
}
