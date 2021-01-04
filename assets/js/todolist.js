const toDoList = document.querySelector('.todolist');
const inputToDo_form = document.querySelector('.input_todo');
const toDo_input = inputToDo_form.querySelector('#inputToDo');
const toDo_btn = inputToDo_form.querySelector('#btn');
const del_btn = document.querySelector('#delete');
const check_btn = document.querySelector('#check');

const TODO = 'toDoList';
const items = JSON.parse(localStorage.getItem(TODO)) || [];
const index = [];

function handleCheck(e) {
  e.preventDefault();
  if(!e.target.matches('label')) return;
  const btn = e.target.parentNode;
  const btn_index = btn.dataset.index;
  items[btn_index].done = !items[btn_index].done;
  save();
  updateToDo(items, toDoList);
}

function deleteToDo(e) {
  e.preventDefault();
  if(!e.target.matches('.icon-cancel-circled')) return;
  const btn = e.target;
  const li = btn.parentNode;
  const lis = li.parentNode;
  toDoList.removeChild(lis);
  for(let i=0; i<items.length; i++) {
    if(items[i].id === lis.id) {
      items.splice(i, 1);
    }
  }
  localStorage.setItem(TODO, JSON.stringify(items));
}

function updateToDo(toDos = [], list) {
  list.innerHTML = toDos.map((toDo, i) => {
    return `
      <li id=${i} data-index=${i}>
        <input type="checkbox" id="check" ${toDo.done? 'checked' : ''}>
          <label for="check"></label>
        <div class="todo">${toDo.text}</div>
        <button type="button" id="delete">
          <i class="icon-cancel-circled"></i>
        </button>
      </li>`
  }).join('');
  const ii = toDoList.querySelectorAll('li');
  ii.forEach(item => 
    index.push(item.dataset.index));
  for (let i = 0; i < items.length; i++) {
    items[i] = {...items[i], id: index[i]};
  }
  index.length = 0;
}

function save() {
  localStorage.setItem(TODO, JSON.stringify(items));
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
  save();
  toDo_input.value = "";
}

function init() {
  updateToDo(items, toDoList);
  inputToDo_form.addEventListener('submit', addItem);
  toDoList.addEventListener('mousedown', deleteToDo);
  toDoList.addEventListener('click', handleCheck);
}

init();