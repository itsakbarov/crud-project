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
    var modalListItem = document.createElement('h6');
    modalListItem.textContent = `${item.todoId+1}. ${item.todoText}`;

    todoModalBody.appendChild(modalListItem);

  })
});
document.querySelector('.modal').addEventListener('click', function (e) {

  todoList.forEach(function (item) {
    var modalListItem = document.querySelector('h6');
    modalListItem.remove();

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

function arrEditor(id, text) {
  todoList.forEach(todoList => {
    if (todoList.todoId === id) {
      todoList.todoText = text
    }
  })
}


function createTodoHtml(todoText, todoId) {
  var listItem = document.createElement('li');
  var deleteButton = document.createElement('a');
  let editButton = document.createElement('button')
  let inputOutput = document.createElement('input')

  inputOutput.setAttribute('class', 'todo-input')

  listItem.setAttribute('class', 'list-group-item flex-row-reverse d-flex justify-content-between align-items-center');
  // listItem.textContent = todoText;
  inputOutput.value = todoText;
  inputOutput.disabled = true;
  listItem.setAttribute('id', `todo-item-${todoId}`);

  iconTrash = document.createElement('i')
  iconTrash.setAttribute('class', 'fal fa-trash-alt')

  iconAdd = document.createElement('i')
  iconAdd.setAttribute('class', 'fal fa-edit')

  editButton.setAttribute('class', 'btn btn-outline-success');
  editButton.appendChild(iconAdd)
  editButton.style.marginRight = '10px'

  deleteButton.setAttribute('href', 'javascript:void(0)');
  deleteButton.setAttribute('class', 'btn btn-outline-danger');
  deleteButton.appendChild(iconTrash)

  deleteButton.addEventListener('click', function (e) {
    e.preventDefault();
    outputNum.innerHTML = todoList.length - 1
    removeTodoItem(todoId);
    if (todoList.length > 0) {
      todoSaveButton.disabled = false 
    } else {
      todoSaveButton.disabled = true
    }

  })
  editButton.addEventListener('click', () => {
    editButton.setAttribute("id", `${todoInitialId - 1}`);
    inputOutput.disabled = false;
    inputOutput.focus();
    console.log(todoList);
  })
  var myBlock = document.createElement('div')
  listItem.appendChild(myBlock);
  // 
  // Added to btns to an additional block
  myBlock.appendChild(editButton);
  myBlock.appendChild(deleteButton);
  listItem.appendChild(inputOutput)
  todoListGroup.appendChild(listItem);
  inputOutput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      console.log('works');
      inputOutput.disabled = true
      arrEditor(todoId, inputOutput.value)
      console.log(todoList)
    }

  })
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
  if (todoList.length > 0) {
    todoSaveButton.disabled = false
  } else {
    todoSaveButton.disabled = true
  }
  // todoSaveButton.removeAttribute("disabled");
  document.querySelector('#output-order').innerHTML = todoList.length

  console.log(todoList);
  todoForm.reset();
});
// 
// function for close the toast warning
$('.btn-close-toast').click(() => {
  $('.toast').removeClass("show")

})