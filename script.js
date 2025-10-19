const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const clearAllBtn = document.getElementById("clearAllBtn");
const taskList = document.getElementById("taskList");
const prioritySelect = document.getElementById("prioritySelect");
const themeBtn = document.getElementById("themeBtn");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let darkMode = false;

// Load tasks on page load
renderTasks();

// Add task
addBtn.addEventListener("click", () => {
  const text = taskInput.value.trim();
  const priority = prioritySelect.value;
  if (!text) return;

  const newTask = {
    text,
    completed: false,
    priority,
    createdAt: new Date().toLocaleString()
  };

  tasks.push(newTask);
  saveTasks();
  renderTasks();
  taskInput.value = "";
});

// Clear All
clearAllBtn.addEventListener("click", () => {
  tasks = [];
  saveTasks();
  renderTasks();
});

// Theme toggle
themeBtn.addEventListener("click", () => {
  darkMode = !darkMode;
  document.body.classList.toggle("dark", darkMode);
  themeBtn.textContent = darkMode ? "☀️ Light Mode" : "🌙 Dark Mode";
});

// Render tasks
function renderTasks() {
  taskList.innerHTML = "";
  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    if (task.completed) li.classList.add("completed");

    const infoDiv = document.createElement("div");
    infoDiv.classList.add("task-info");
    infoDiv.innerHTML = `<strong>${task.text}</strong>
                         <small>${task.priority} | ${task.createdAt}</small>`;

    // Mark as done toggle
    infoDiv.addEventListener("click", () => {
      tasks[index].completed = !tasks[index].completed;
      saveTasks();
      renderTasks();
    });

    // Actions
    const actionsDiv = document.createElement("div");
    actionsDiv.classList.add("task-actions");

    // Edit button
    const editBtn = document.createElement("button");
    editBtn.textContent = "Edit";
    editBtn.classList.add("edit-btn");
    editBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      const newText = prompt("Edit task:", task.text);
      if (newText !== null && newText.trim() !== "") {
        tasks[index].text = newText.trim();
        saveTasks();
        renderTasks();
      }
    });

    // Delete button
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.classList.add("delete-btn");
    deleteBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      tasks.splice(index, 1);
      saveTasks();
      renderTasks();
    });

    actionsDiv.appendChild(editBtn);
    actionsDiv.appendChild(deleteBtn);

    li.appendChild(infoDiv);
    li.appendChild(actionsDiv);
    taskList.appendChild(li);
  });
}

// Save to localStorage
function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}
