var wrapper = document.getElementById("wrapper");
var myInput = document.getElementById("my-input");
var taskBox = document.getElementById("taskBox");
var clearAll = document.getElementById("clearAll");
var taskInput = document.querySelector(".task-input");
var controlls = document.querySelectorAll(".btn");
var activefilter = document.getElementsByClassName("active");
var todos = JSON.parse(localStorage.getItem("todos")) ?? [];
var isEdit = false;

controlls.forEach((item) => {
  item.addEventListener("click", () => {
    if (todos.length > 0) {
      activefilter.item(0).classList.remove("active");
      item.classList.add("active");
      printTask(`${item.id}`);
    }
  });
});

//the listener following is related to input and create task and push task in array todos.
myInput.addEventListener("keyup", function (e) {
  var taskValue = myInput.value.trim();
  if (e.key === "Enter" && taskValue) {
    inspector();
    if (isEdit === false) {
      var task = {
        taskTitle: taskValue,
        status: "pending",
        editTask: "false",
      };
      todos.push(task);
      myInput.value = "";
      printTask("all");
      clickInput();
    } else {
      todos.forEach((item) => {
        if (item.editTask === "true") {
          item.taskTitle = myInput.value.trim();
        }
      });
      printTask("all");
      myInput.value = "";
      isEdit = false;
    }
    localStorage.setItem("todos", JSON.stringify(todos));
  }
});

printTask("all");
//the following function is realted to create dom in taskBox and change class of button clear All
function printTask(filter) {
  if (todos.length > 0) {
    var liTag = "";
    todos.forEach((todo, index) => {
      if (todo.status === filter || filter === "all") {
        var completed = todo.status === "completed" ? "checked" : "";
        liTag += `
            <li class='litag'>
            <input type="checkbox" ${completed} id="${index}" onclick='updateTask(event , ${index})'/>
            <p class='${completed}' id='${index}'>${todo.taskTitle}</p>
            <img src="./assets/images/icons8-more-48.png" style='width: 20px; height:20px' id='more' alt="icon" onclick='more(${index})'>
            </li>
            `;
        taskBox.innerHTML = liTag;
      } else {
        var err = "";
        err += `<li class='inform'>you not ${filter} task yet! </li>`;
        taskBox.innerHTML = err;
      }
    });
    clearAll.classList.add("clear-active");
  } else {
    var inform = document.createElement("li");
    inform.classList.add("inform");
    inform.innerHTML = "you not task yet!";
    taskBox.appendChild(inform);
    clearAll.classList.remove("clear-active");
  }
}
// the following function is related change status task to pending or completed.
function updateTask(e, index) {
  var pTag = e.target.nextSibling.nextSibling;
  if (todos[index].status === "pending") {
    pTag.classList.add("checked");
    todos[index].status = "completed";
  } else {
    pTag.classList.remove("checked");
    todos[index].status = "pending";
  }
}
// the following function is related change class input with type of text. the function make border of input change to solid , dashed.
function clickInput() {
  if (taskInput.className === "task-input") {
    taskInput.classList.add("task-input-focus");
  } else {
    taskInput.classList.remove("task-input-focus");
  }
}
//the following function clear All task in array todos.
function clearall() {
  if (todos.length >= 1) {
    todos = [];
    taskBox.innerHTML = "";
    localStorage.setItem("todos", JSON.stringify(todos));
    printTask("all");
  }
}

//the following function is related image more in litag that create box and add spans delete and edit to box.
function more(index) {
  if (!document.querySelector(".box")) {
    var box = document.createElement("div");
    box.classList.add("box");
    box.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="25" height="25" viewBox="0 0 50 50">
<path d="M 21 2 C 19.354545 2 18 3.3545455 18 5 L 18 7 L 10.154297 7 A 1.0001 1.0001 0 0 0 9.984375 6.9863281 A 1.0001 1.0001 0 0 0 9.8398438 7 L 8 7 A 1.0001 1.0001 0 1 0 8 9 L 9 9 L 9 45 C 9 46.645455 10.354545 48 12 48 L 38 48 C 39.645455 48 41 46.645455 41 45 L 41 9 L 42 9 A 1.0001 1.0001 0 1 0 42 7 L 40.167969 7 A 1.0001 1.0001 0 0 0 39.841797 7 L 32 7 L 32 5 C 32 3.3545455 30.645455 2 29 2 L 21 2 z M 21 4 L 29 4 C 29.554545 4 30 4.4454545 30 5 L 30 7 L 20 7 L 20 5 C 20 4.4454545 20.445455 4 21 4 z M 11 9 L 18.832031 9 A 1.0001 1.0001 0 0 0 19.158203 9 L 30.832031 9 A 1.0001 1.0001 0 0 0 31.158203 9 L 39 9 L 39 45 C 39 45.554545 38.554545 46 38 46 L 12 46 C 11.445455 46 11 45.554545 11 45 L 11 9 z M 18.984375 13.986328 A 1.0001 1.0001 0 0 0 18 15 L 18 40 A 1.0001 1.0001 0 1 0 20 40 L 20 15 A 1.0001 1.0001 0 0 0 18.984375 13.986328 z M 24.984375 13.986328 A 1.0001 1.0001 0 0 0 24 15 L 24 40 A 1.0001 1.0001 0 1 0 26 40 L 26 15 A 1.0001 1.0001 0 0 0 24.984375 13.986328 z M 30.984375 13.986328 A 1.0001 1.0001 0 0 0 30 15 L 30 40 A 1.0001 1.0001 0 1 0 32 40 L 32 15 A 1.0001 1.0001 0 0 0 30.984375 13.986328 z"></path>
</svg>
<span class='del' onclick='del(${index})'>Delete</span>
<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="25" height="25" viewBox="0 0 50 50">
<path d="M 43.125 2 C 41.878906 2 40.636719 2.488281 39.6875 3.4375 L 38.875 4.25 L 45.75 11.125 C 45.746094 11.128906 46.5625 10.3125 46.5625 10.3125 C 48.464844 8.410156 48.460938 5.335938 46.5625 3.4375 C 45.609375 2.488281 44.371094 2 43.125 2 Z M 37.34375 6.03125 C 37.117188 6.0625 36.90625 6.175781 36.75 6.34375 L 4.3125 38.8125 C 4.183594 38.929688 4.085938 39.082031 4.03125 39.25 L 2.03125 46.75 C 1.941406 47.09375 2.042969 47.457031 2.292969 47.707031 C 2.542969 47.957031 2.90625 48.058594 3.25 47.96875 L 10.75 45.96875 C 10.917969 45.914063 11.070313 45.816406 11.1875 45.6875 L 43.65625 13.25 C 44.054688 12.863281 44.058594 12.226563 43.671875 11.828125 C 43.285156 11.429688 42.648438 11.425781 42.25 11.8125 L 9.96875 44.09375 L 5.90625 40.03125 L 38.1875 7.75 C 38.488281 7.460938 38.578125 7.011719 38.410156 6.628906 C 38.242188 6.246094 37.855469 6.007813 37.4375 6.03125 C 37.40625 6.03125 37.375 6.03125 37.34375 6.03125 Z"></path>
</svg>
<span class='edit' onclick='edit(${index})'>Edit</span>
    `;
    taskBox.children[index].appendChild(box);
    taskBox.children[index].children[2].src =
      "./assets/images/icons8-remove-50.png";
  } else {
    document.querySelector(".box").remove();
    taskBox.children[index].children[2].src =
      "./assets/images/icons8-more-48.png";
  }
}

function del(index) {
  todos.splice(index, 1);
  if (todos.length === 0) {
    taskBox.innerHTML = "";
  }
  localStorage.setItem("todos", JSON.stringify(todos));
  printTask("all");
}

function edit(index) {
  myInput.value = todos[index].taskTitle;
  todos[index].editTask = "true";
  isEdit = true;
}
function inspector() {
  var errorBox = document.createElement("div");
  errorBox.classList.add("error-box");
  todos.forEach((item, index) => {
    if (item.taskTitle === myInput.value.trim()) {
      errorBox.innerHTML = `
      <p class='text-error'>There is a similar note in your list. Do you want to add this note?</p>
      <button class='btn-skip' onclick='skip()'>Skip</button>
      <button class='btn-add'>Add</button>
      `;
      todos.splice(index, 1);
    }
  });
  const inputValue = myInput.value.trim();
  if (errorBox.childElementCount > 1) {
    document.getElementsByTagName("body").item(0).appendChild(errorBox);
    setTimeout(() => {
      document.getElementsByClassName('error-box').item(0).remove()
    }, 10000);
    document.getElementsByClassName("btn-add").item(0).addEventListener("click", () => add(inputValue) , {once:true});
  };
}
function skip() {
  document.getElementsByClassName("error-box").item(0).remove();
}
function add(inputValue) {
  var newTask = {
    taskTitle: inputValue,
    status: "pending",
    editTask: "false",
  };
  todos.push(newTask);
  printTask("all");
}
