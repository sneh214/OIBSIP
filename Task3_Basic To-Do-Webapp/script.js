function addTask() {
  const title = document.getElementById('taskTitle').value.trim();
  const desc = document.getElementById('taskDesc').value.trim();

  if (title === "") {
    alert("Please enter a task title.");
    return;
  }

  const taskItem = document.createElement('li');
  taskItem.innerHTML = `<strong>${title}</strong>: ${desc} 
                        <button onclick="completeTask(this)">Done</button>`;

  document.getElementById('pendingList').appendChild(taskItem);

  // Clear fields
  document.getElementById('taskTitle').value = '';
  document.getElementById('taskDesc').value = '';
}

function completeTask(button) {
  const task = button.parentElement;
  button.remove(); // Remove the 'Done' button
  document.getElementById('completedList').appendChild(task);
}