const form = document.querySelector('.form');
const input = document.querySelector('.input');
const project = document.querySelector('.project');

let list = [];

form.addEventListener('submit', function(event) {
  event.preventDefault();
  addProject(input.value); 
});

function addProject(item) {
  if (item !== '') {
    const projects = {
      id: Date.now(),
      name: item,
      completed: false
    };
    
    list.push(projects);
    addToLocalStorage(list); 
    input.value = '';
  }
}

function renderList(list) {
  project.innerHTML = '';
  list.forEach(function(item) {
    const checked = item.completed ? 'checked': null;
    const li = document.createElement('li');
    li.setAttribute('class', 'item');
    li.setAttribute('data-key', item.id);
    if (item.completed === true) {
      li.classList.add('checked');
    }
li.innerHTML = `
      <input type="checkbox" class="checkbox" ${checked}>
      ${item.name}
      <button class="delete">X</button>
    `;
    project.append(li);
  });
}

function addToLocalStorage(list) {
  localStorage.setItem('list', JSON.stringify(list));
  renderList(list);
}

function getFromLocalStorage() {
  const reference = localStorage.getItem('list');
  if (reference) {
    list = JSON.parse(reference);
    renderList(list);
  }
}

function toggle(id) {
  list.forEach(function(item) {
    if (item.id == id) {
      item.completed = !item.completed;
    }
  });
addToLocalStorage(list);
}

function deleteProject(id) {
  list = list.filter(function(item) {
    return item.id != id;
  });
  addToLocalStorage(list);
}
getFromLocalStorage();

project.addEventListener('click', function(event) {
  if (event.target.type === 'checkbox') {
    toggle(event.target.parentElement.getAttribute('data-key'));
  }
  if (event.target.classList.contains('delete')) {    deleteProject(event.target.parentElement.getAttribute('data-key'));
  }
});

export default renderTodo;