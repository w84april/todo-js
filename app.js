let todos = [];
let countLeft;
let filterState = "All";
const input = document.querySelector(".input");
const filterOptions = document.querySelector(".buttons");
const todoList = document.querySelector(".todo_list");
const checkBox = document.querySelector(".checkbox");
const clearDone = document.querySelector(".todos_clear");
const globalCheckBox = document.querySelector(".arrow_down");
const bottomLine = document.querySelector(".bottom_line");

filterOptions.addEventListener("click", changeFilter, filterTodos);
clearDone.addEventListener("click", handleClearDone);
globalCheckBox.addEventListener("click", handleGlobalCheckBox);
input.addEventListener("keydown", (e) => {
  let val = e.target.value;
  if (e.key == "Enter") {
    if (val.trim() !== "") {
      todos.push(val.trim());
      console.log(todos);
      e.target.value = "";

      setTimeout(ifEmty, 0);

      let listItem = document.createElement("li");
      listItem.className = "listitem";

      let listStart = document.createElement("div");
      listStart.className = "liststart";

      let message = document.createElement("div");
      message.innerText = val;
      message.className = "message";

      let deleteIcon = document.createElement("img");
      deleteIcon.src = "img/deleteIcon.png";
      deleteIcon.className = "delete_icon";

      let checkBox = document.createElement("input");
      checkBox.type = "checkbox";

      deleteIcon.addEventListener("click", (event) => {
        let elem = event.target.closest(".listitem");
        elem.remove();
        console.log(!todoList.firstChild);

        countTodosLeft();
      });

      checkBox.addEventListener("click", (event) => {
        let elem = event.target.closest(".listitem");
        elem.classList.toggle("completed");
        filterTodos(filterState);
        console.log(filterState);

        countTodosLeft();
      });

      todoList.addEventListener("dblclick", (event) => {
        if (event.target.tagName != "INPUT") {
          console.log(event.target);
          let inputEdit = document.createElement("input");
          inputEdit.className = "input_edit";

          event.target.closest(".listitem").replaceChild(inputEdit, listStart);

          inputEdit.addEventListener("keydown", (event) => {
            if (event.key == "Enter") {
              message.innerText = event.target.value;
              event.target
                .closest(".listitem")
                .replaceChild(listStart, inputEdit);
            }
          });
        }
      });

      listStart.appendChild(checkBox);
      listStart.appendChild(message);

      listItem.appendChild(listStart);
      listItem.appendChild(deleteIcon);

      ul.append(listItem);
      filterTodos(filterState);
      countTodosLeft();
    } else {
      alert("Поле пусто");
    }
  }
});

function ifEmty() {
  if (document.querySelector(".listitem")) {
    bottomLine.style.display = "flex";
  } else {
    bottomLine.style.display = "none";
  }
}

function changeFilter(event) {
  let buttons = document.querySelectorAll(".button");
  if (event.target.tagName != "UL") {
    buttons.forEach((item) => item.classList.remove("button_active"));
    event.target.classList.add("button_active");
  }

  //tagname
  filterState = event.target.innerText;
  filterTodos(filterState);
}

// с помощью toggle работало криво, так норм
function filterTodos(filter) {
  list = todoList.querySelectorAll("li");
  list.forEach((todo) => {
    switch (filter) {
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
  const list = todoList.querySelectorAll("li");
  let count = 0;
  for (let i of list) {
    if (!i.classList.contains("completed")) count++;
    console.log(count);
  }
  todosLeft.innerHTML = `${count} todos left`;
  countLeft = count;
}

function handleClearDone() {
  list = todoList.querySelectorAll("li");

  for (let i of list) {
    if (i.classList.contains("completed")) {
      i.remove();
      console.log("hi");
    }
  }

  countTodosLeft();
}

function handleGlobalCheckBox() {
  list = todoList.querySelectorAll("li");
  if (countLeft !== 0)
    for (let i of list) {
      if (!i.classList.contains("completed")) {
        i.classList.toggle("completed");
        i.firstChild.firstChild.checked = true;
        filterTodos(filterState);
        countTodosLeft();
      }
    }
  else {
    for (let i of list) {
      i.classList.remove("completed");
      i.firstChild.firstChild.checked = false;
      filterTodos(filterState);
      countTodosLeft();
    }
  }
}
