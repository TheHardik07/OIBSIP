function addTask() {
  const title = document.getElementById("title").value.trim();
  const description = document.getElementById("description").value.trim();

  if (!title || !description) {
    alert("Please fill all fields");
    return;
  }

  const createdAt = new Date().toLocaleString();

  const taskDiv = document.createElement("div");
  taskDiv.className = "task pending";

  taskDiv.innerHTML = `
    <h3 contenteditable="false">${title}</h3>
    <p contenteditable="false">${description}</p>
    <small>Added: ${createdAt}</small><br><br>

    <button class="complete-btn" onclick="markComplete(this)">Complete</button>
    <button class="edit-btn" onclick="editTask(this)">Edit</button>
    <button class="delete-btn" onclick="deleteTask(this)">x</button>
  `;

  document.getElementById("pendingList").appendChild(taskDiv);

  document.getElementById("title").value = "";
  document.getElementById("description").value = "";
}

function deleteTask(btn) {
  btn.parentElement.remove();
}

function editTask(btn) {
  const task = btn.parentElement;
  const title = task.querySelector("h3");
  const desc = task.querySelector("p");

  const isEditable = title.isContentEditable;

  title.contentEditable = !isEditable;
  desc.contentEditable = !isEditable;

  btn.innerText = isEditable ? "Edit" : "Save";
}

function markComplete(btn) {
  const task = btn.parentElement;
  const completedAt = new Date().toLocaleString();
  task.classList.remove("pending");
  task.classList.add("completed");
  btn.remove(); // remove complete button
  task.innerHTML += `<br><small>Completed: ${completedAt}</small>`;

  document.getElementById("completedList").appendChild(task);
}
