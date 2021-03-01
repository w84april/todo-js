let todos = [];
let countLeft = 0;
const input = document.querySelector(".input");
const filterOptions = document.querySelector(".buttons");
const todoList = document.querySelector(".todo_list");
const checkBox = document.querySelector(".checkbox");
const clearDone = document.querySelector(".todos_clear");

filterOptions.addEventListener("click", filterTodos);
clearDone.addEventListener("click", handleClearDone);

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
        countTodosLeft();
      });

      checkBox.addEventListener("click", (event) => {
        let elem = event.target.closest(".listitem");
        elem.classList.toggle("completed");
        countTodosLeft();
      });

      todoList.addEventListener("dblclick", (event) => {
        console.log(event.target);
        let inputEdit = document.createElement("input");
        inputEdit.className = "input_edit";
        event.target.closest("li").replaceChild(inputEdit, message);

        inputEdit.addEventListener("keydown", (event) => {
          if (event.key == "Enter") {
            message.innerText = event.target.value;
            event.target.closest("li").replaceChild(message, inputEdit);
          }
        });
      });

      listItem.appendChild(checkBox);
      listItem.appendChild(message);
      listItem.appendChild(deleteIcon);

      ul.append(listItem);
      countTodosLeft();
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

function countTodosLeft() {
  const todosLeft = document.querySelector(".todos_left");
  const todos = todoList.querySelectorAll("li");
  let count = 0;
  for (let i of todos) {
    if (i.style.opacity != 0.5) count++;
    console.log(count);
  }
  todosLeft.innerHTML = `${count} todos left`;
}

function handleClearDone() {
  todos = todoList.querySelectorAll("li");

  for (let i of todos) {
    if (i.classList.contains("completed")) {
      i.remove();
      console.log("hi");
    }
  }
  countTodosLeft();
}
