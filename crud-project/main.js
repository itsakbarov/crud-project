/* Create
 * 1. Form submit bolganda, inputdan qiymatni olamiz +
 * 2. Yangi element yaratish funksiyasini chaqiramiz +
 * 2.1. Yangi yaratilgan element datasini arrayga joylash .push(); +
 * 2.2. Yangi yaratilgan elementni htmlga yozish +
 * 3. Inputni tozalaymiz +
 */

/* Delete
 *  1. ToDo itemga delete knopkasi qoshilishi kerak +
 *  2.1. Ochirilishi kerak bolgan elementni arraydan ochiramiz
 *  2.2. Songra DOM dan ochiramiz +
 */

var toast = document.querySelector('.toast')
var todoForm = document.querySelector("#todo-form");
var todoInput = document.querySelector("#todo-input");
var todoListGroup = document.querySelector("#todo-list-group");
var todoModalBody = document.querySelector("#todo-modal-body");
var todoSaveButton = document.querySelector("#todo-save-button");
var outputNum = document.querySelector('#output-order')

var todoList = [];
var todoInitialId = 0;

function CreateTodoPrototype(todoText, todoId) {
  this.todoText = todoText;
  this.todoId = todoId;
}

todoSaveButton.addEventListener('click', function (e) {
  e.preventDefault();

  todoList.forEach(function (item) {
    var modalListItem = document.createElement('h5');
    modalListItem.textContent = `${item.todoId+1}. ${item.todoText}`;

    todoModalBody.appendChild(modalListItem);
    // modalListItem.reset()
  })
});

function removeTodoItem(todoId) {
  document.querySelector(`#todo-item-${todoId}`).remove();

  for (i = 0; i < todoList.length; i++) {
    if (todoList[i].todoId == todoId) {
      todoList.splice(i, 1);
    }
  }
  console.log(todoList);
}

function createTodoHtml(todoText, todoId) {
  var listItem = document.createElement('li');
  var deleteButton = document.createElement('a');

  listItem.setAttribute('class', 'list-group-item d-flex justify-content-between align-items-center');
  listItem.textContent = todoText;
  listItem.setAttribute('id', `todo-item-${todoId}`);
  icon = document.createElement('i')
  icon.setAttribute('class', 'fad fa-trash-alt')

  deleteButton.setAttribute('href', 'javascript:void(0)');
  deleteButton.setAttribute('class', 'btn btn-outline-danger');
  deleteButton.appendChild(icon)

  deleteButton.addEventListener('click', function (e) {
    e.preventDefault();
    outputNum.innerHTML = todoList.length - 1
    removeTodoItem(todoId);

  })


  listItem.appendChild(deleteButton);

  todoListGroup.appendChild(listItem);
}

function createTodo(todoText) {
  todoList.push(new CreateTodoPrototype(todoText, todoInitialId));
  createTodoHtml(todoText, todoInitialId);
  todoInitialId++;
}

todoForm.addEventListener('submit', function (e) {
  e.preventDefault();

  if (todoInput.value == '') {
    toast.classList.add('show')
  } else {
    createTodo(todoInput.value);
  }
  todoSaveButton.removeAttribute("disabled");
  document.querySelector('#output-order').innerHTML = todoList.length

  
  console.log(todoList);
  todoForm.reset();
});

$('.btn-close-toast').click(() => {
  $('.toast').removeClass("show")

})
