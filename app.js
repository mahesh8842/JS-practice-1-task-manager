// Define UI Vars
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

// Load all event listeners
// loadEventListeners();

// Load all event listeners
(function loadEventListeners() {
  // Add task event
  document.addEventListener('DOMContentLoaded',getTasks);
  form.addEventListener('submit', addTask);
  taskList.addEventListener('click',removeelement);
  clearBtn.addEventListener('click',cleartasks);
  filter.addEventListener('keyup',filtertasks);
})();

function getTasks(){
  let tasks;
if(localStorage.getItem('tasks')===null){
  tasks=[];
}else{
  tasks=JSON.parse(localStorage.getItem('tasks'));
}

tasks.forEach(task=>{
  const li = document.createElement('li');
  // Add class
  li.className = 'collection-item';
  // Create text node and append to li
  li.appendChild(document.createTextNode(task));
  // Create new link element
  const link = document.createElement('a');
  // Add class
  link.className = 'delete-item secondary-content';
  // Add icon html
  link.innerHTML = '<i class="fa fa-remove"></i>';
  // Append the link to li
  li.appendChild(link);

  // Append li to ul
  taskList.appendChild(li);
})
}

// Add Task
function addTask(e) {
  if(taskInput.value === '') {
    alert('Add a task');
    Exit();
  }

  // Create li element
  const li = document.createElement('li');
  // Add class
  li.className = 'collection-item';
  // Create text node and append to li
  li.appendChild(document.createTextNode(taskInput.value));
  // Create new link element
  const link = document.createElement('a');
  // Add class
  link.className = 'delete-item secondary-content';
  // Add icon html
  link.innerHTML = '<i class="fa fa-remove"></i>';
  // Append the link to li
  li.appendChild(link);

  // Append li to ul
  taskList.appendChild(li);

  storetaskinlocal(taskInput.value);


  // Clear input
  taskInput.value = '';


  e.preventDefault();
}

function removeelement(e){
  if(e.target.parentElement.classList.contains('delete-item')&& confirm('you choose to remove')){
    e.target.parentElement.parentElement.remove();
  }
  removefromlocal(e.target.parentElement.parentElement);

}
function removefromlocal(taskItem){
console.log(taskItem.textContent);
let tasks;
if(localStorage.getItem('tasks')===null){
  tasks=[];
}else{
  tasks=JSON.parse(localStorage.getItem('tasks'));
}
tasks.forEach((target,index)=>{
  if(target===taskItem.textContent){
    tasks.splice(index,index);
  }
});
localStorage.setItem('tasks',JSON.stringify(tasks));
}

function cleartasks(e){
  taskList.innerHTML='';
  alert('tasks deleted successfully!!');
  localStorage.clear();
}
function filtertasks(e){
  const text=e.target.value.toLowerCase();
  document.querySelectorAll('.collection-item').forEach(task=>{
    const item=task.firstChild.textContent;
    if(item.toLowerCase().indexOf(text)!=-1){
      task.style.display='block';
    }else{
      task.style.display='none';
    }
  })

}

function storetaskinlocal(task){
let tasks;
if(localStorage.getItem('tasks')===null){
  tasks=[];
}else{
  tasks=JSON.parse(localStorage.getItem('tasks'));
}
tasks.push(task);
localStorage.setItem('tasks',JSON.stringify(tasks));
};