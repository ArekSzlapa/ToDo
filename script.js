let todoInput; //user input holder
let errorInfo; //no events info
let addBtn; //add button
let ulList; //list of tasks, ul tags
let newTodos;

let popUp;
let popUpInfo;
let todoToEdit;
let popUpInput;
let popUpAddBtn;
let popUpCloseBtn;

const main = () => {
  prepareDOMElements();
  prepareDOMEvents();
};

const prepareDOMElements = () => {
  todoInput = document.querySelector(".todo-input");
  errorInfo = document.querySelector(".error-info");
  addBtn = document.querySelector(".btn-add");
  ulList = document.querySelector(".todolist ul");

  popUp = document.querySelector(".popup");
  popUpInfo = document.querySelector(".popup-info");
  popUpInput = document.querySelector(".popup-input");
  popUpAddBtn = document.querySelector(".accept");
  popUpCloseBtn = document.querySelector(".cancel");
};

const prepareDOMEvents = () => {
  addBtn.addEventListener("click", addNewTask);
  ulList.addEventListener("click", checkClick);
  popUpCloseBtn.addEventListener("click", closePopUp);
  popUpAddBtn.addEventListener("click", modifyPop);
  todoInput.addEventListener("keyup", checkKeyEnter);
  popUpInput.addEventListener("keyup", checkKeyEnter);
  popUpInput.addEventListener("keyup", checkEscapeKey);
};

//wpisanie zadania
//przycisk add:
//Pobranie value inputa
//przerobienie inputa na li
//dodanie li do ul
//wyczyszczenie inputa
const createTools = () => {
  const divArea = document.createElement("div");
  divArea.classList.add("tools");
  newTodos.append(divArea);

  const complete = document.createElement("button");
  complete.classList.add("complete");
  complete.innerHTML = '<i class="fas fa-check"></i>';

  const edit = document.createElement("button");
  edit.classList.add("edit");
  edit.textContent = "EDIT";

  const remove = document.createElement("button");
  remove.classList.add("delete");
  remove.innerHTML = '<i class="fas fa-times"></i>';

  divArea.append(complete, edit, remove);
};

const addNewTask = () => {
  if (todoInput.value.length === 0) {
    errorInfo.textContent = "Wpisz treść zadania";
    return;
  } else {
    newTodos = document.createElement("li");
    newTodos.textContent = todoInput.value;
    createTools();
    ulList.appendChild(newTodos);
    todoInput.value = "";
    errorInfo.textContent = "";
  }
};

const checkClick = (e) => {
  if (e.target.matches(".complete")) {
    e.target.closest("li").classList.toggle("completed");
    e.target.classList.toggle("completed");
  } else if (e.target.matches(".edit")) {
    editTodo(e);
  } else if (e.target.matches(".delete")) {
    deletePop(e);
  } else return;
};

const editTodo = (e) => {
  todoToEdit = e.target.closest("li");
  popUpInput.value = todoToEdit.firstChild.textContent;
  popUp.style.display = "flex";
};
const closePopUp = () => {
  popUp.style.display = "none";
  popUpInfo.textContent = "";
};
const modifyPop = (e) => {
  if (popUpInput.value.length === 0) {
    popUpInfo.textContent = "Wprowadz wartość";
  } else {
    todoToEdit.firstChild.textContent = popUpInput.value;
    closePopUp();
  }
};
const deletePop = (e) => {
  ulList.removeChild(e.target.closest("li"));
  const emptyList = document.querySelectorAll("ul li");
  if (emptyList.length === 0) {
    errorInfo.textContent = "Brak zadań na liście";
  }
};

const checkKeyEnter = (e) => {
  if (e.key === "Enter") {
    addNewTask();
    modifyPop();
  }
};

const checkEscapeKey = (e) => {
  if (e.key === "Escape") {
    closePopUp();
  }
};
// const errorMsg=()=>{
//     if //errorInfo
// }

document.addEventListener("DOMContentLoaded", main);
