const date_container = document.querySelector('.info .date');
const date_year = date_container.querySelector('h3');
const date_month = date_container.querySelector('h2');

function init() {
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDate();

  date_year.innerText = `${year}`;
  date_month.innerHTML = `${month+1}/${day}`
}

init();