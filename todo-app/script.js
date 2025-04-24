const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");

function addTask() {
    
    if (taskInput.value.trim()==='') return;
    const li = document.createElement('li');
    li.innerText = taskInput.value;
    li.addEventListener('click',() => li.remove());
    taskList.appendChild(li);

    taskInput.value = '';
}