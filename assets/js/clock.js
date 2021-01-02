const clock_container = document.querySelector('.clock');
const clock = clock_container.querySelector('h1');


function getTime() {{
  const date = new Date();
  const hours = date.getHours();
  const minutes = date.getMinutes();

  clock.innerText = `${hours}:${minutes > 9 ? '' : '0'}${minutes}`
}}

function init() {
  getTime();
  setInterval(getTime, 1000);
}

init();