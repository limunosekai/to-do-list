const toDoList = document.querySelector('.todolist');
const inputToDo_form = document.querySelector('.input_todo');
const toDo_input = inputToDo_form.querySelector('#inputToDo');
const toDo_btn = inputToDo_form.querySelector('#btn');
const del_btn = document.querySelector('#delete');
const check_btn = document.querySelector('#check');

const TODO = 'toDoList';
const items = JSON.parse(localStorage.getItem(TODO)) || [];

function handleCheck(e) {
  e.preventDefault();
  if(!e.target.matches('.icon-circle-empty')) return;
  const btn = e.target;
  if(btn.className === 'icon-circle-empty') {
    btn.className = 'icon-ok-circled'; 
  } 
}

function deleteToDo(e) {
  e.preventDefault();
  if(!e.target.matches('.icon-cancel-circled')) return;
  const btn = e.target;
  const li = btn.parentNode;
  const lis = li.parentNode;
  toDoList.removeChild(lis);
  // const cleanToDos = items.filter(item => {
  //   return item.id !== +(lis.id);
  // });
  // localStorage.setItem(TODO, JSON.stringify(cleanToDos));
}

function updateToDo(toDos = [], list) {
  list.innerHTML = toDos.map((toDo, i) => {
    return `
      <li id=${i}>
        <button type="button" id="check">
          <i class="icon-circle-empty"></i>
        </button>
        <div class="todo">${toDo.text}</div>
        <button type="button" id="delete">
          <i class="icon-cancel-circled"></i>
        </button>
      </li>`
  }).join('');
}

function addItem(e) {
  e.preventDefault();
  const text = toDo_input.value;
  const item = {
    text,
    done: false,
  };
  items.push(item);
  updateToDo(items,toDoList);
  localStorage.setItem(TODO, JSON.stringify(items));
  toDo_input.value = "";
}

function init() {
  updateToDo(items, toDoList);
  inputToDo_form.addEventListener('submit', addItem);
  toDoList.addEventListener('mousedown', deleteToDo);
  toDoList.addEventListener('click', handleCheck);
}

init();