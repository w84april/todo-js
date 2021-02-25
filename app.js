let todos = [];

input.addEventListener("keydown", (e) => {
  let val = document.getElementById("input").value;
  if (e.key == "Enter") {
    if (val.trim() !== "") {
      todos.push(val.trim());
      console.log(todos);
      document.getElementById("input").value = "";

      let listItem = document.createElement("li");

      let deleteIcon = document.createElement("img");
      deleteIcon.src = "img/deleteIcon.png";

      listItem.innerHTML = "<div>" + val + " </div> <img>";
      ul.append(listItem);
    } else {
      alert("Поле пусто");
    }
  }
});
