const input_name_form = document.querySelector('.name');
const input_name = input_name_form.querySelector('input');
const greeting = document.querySelector('.greeting');

const CURRENT_VALUE = 'currentValue';

function saveName(name) {
  localStorage.setItem(CURRENT_VALUE, name);
}

function updateName(name) {
  input_name.classList.remove('showing');
  greeting.classList.add('show');
  greeting.innerText = `안녕하세요 ${name}님 😀`;
}

function handleSubmit(e) {
  e.preventDefault();
  const inputValue = input_name.value;
  updateName(inputValue);
  saveName(inputValue);
}

function askName() {
  input_name.classList.add('showing');
  input_name_form.addEventListener('submit', handleSubmit);
}

function loadName() {
  const nameValue = localStorage.getItem(CURRENT_VALUE);
  if(nameValue === null){
    askName();
  } else {
    updateName(nameValue);
  }
}

function init() {
  loadName();
}

init();