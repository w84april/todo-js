let todos = [];
let countLeft = 0;
const input = document.querySelector(".input");
const filterOptions = document.querySelector(".buttons");
const todoList = document.querySelector(".todo_list");
const todosLeft = document.querySelector(".todos_left");

filterOptions.addEventListener("click", filterTodos);

input.addEventListener("keydown", (e) => {
  let val = e.target.value;
  if (e.key == "Enter") {
    if (val.trim() !== "") {
      todos.push(val.trim());
      console.log(todos);
      e.target.value = "";

      let listItem = document.createElement("li");
      listItem.className = "listitem";

      let message = document.createElement("div");
      message.innerText = val;

      let deleteIcon = document.createElement("img");
      deleteIcon.src = "img/deleteIcon.png";
      deleteIcon.className = "delete_icon";

      let checkBox = document.createElement("input");
      checkBox.type = "checkbox";

      deleteIcon.addEventListener("click", (event) => {
        let elem = event.target.closest(".listitem");
        elem.remove();
      });

      checkBox.addEventListener("click", (event) => {
        let elem = event.target.closest(".listitem");
        elem.classList.toggle("completed");
      });

      todosLeft.innerHTML = "Tasks left: " + todos.length;

      listItem.appendChild(checkBox);
      listItem.appendChild(message);
      listItem.appendChild(deleteIcon);

      ul.append(listItem);
    } else {
      alert("Поле пусто");
    }
  }
});

// с помощью toggle работало криво, так норм
function filterTodos(event) {
  todos = todoList.querySelectorAll("li");
  console.log(todos);
  todos.forEach((todo) => {
    console.log(todo.classList);
    switch (event.target.innerText) {
      case "All":
        todo.style.display = "flex";
        break;
      case "Active":
        if (todo.classList.contains("completed")) {
          todo.style.display = "none";
          break;
        } else {
          todo.style.display = "flex";
          break;
        }
      case "Done":
        if (todo.classList.contains("completed")) {
          todo.style.display = "flex";
          break;
        } else {
          todo.style.display = "none";
          break;
        }
    }
  });
}

function countTodosLeft(todos) {
  let count = 0;
  todos.forEach((todo) => {
    if (todo.classList.contains("completed")) {
      count++;
    }
  });
  return count;
}
