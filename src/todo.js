"use-strict";
let todoForm = document.getElementById("js-todo-form");
let taskInput = document.getElementById("js-task-input");
let addButton = document.getElementById("js-add-task");
let tasks = document.getElementById("js-tasks");

//function to set attributes//
function setAttributes(el, attrs) {
  for (let key in attrs) {
    el.setAttribute(key, attrs[key]);
  }
}

//creating div for search and filter//
  let filterContainer = document.createElement("div");
  setAttributes(filterContainer, { class: " flex flex-col mt-2 md:flex-row items-center justify-center gap-4 mb-2" });
  let searchLabel = document.createElement("label");
  setAttributes(searchLabel, { for: "js-search-tasks" });
  searchLabel.textContent = "SearchTask:";
  filterContainer.appendChild(searchLabel)
  //searchTask//
  let taskSearch = document.createElement("input");
  setAttributes(taskSearch, { id: "js-search-tasks", class: "w-72 mt-2 py-1 pl-2 ml-1  rounded  mb-3  text-black border-2 border-black" });
  filterContainer.appendChild(taskSearch);
  //creating dropDown//
  let filterDropDown = document.createElement('select');
  filterDropDown.setAttribute('class', 'p-1 rounded-md border-2 border-black w-1/10  outline-none')
  filterDropDown.setAttribute('id', 'filterCondition')

  let categories = ['All', 'Completed', 'Incomplete'];
  categories.map((item) => {
    let option = document.createElement('option');
    option.value = item
    option.innerHTML = item;
    filterDropDown.appendChild(option)
  })
  filterContainer.appendChild(filterDropDown);
  todoForm.insertAdjacentElement("afterend", filterContainer)
//creation Ends here//

//setting local storage//
let allTasks = JSON.parse(localStorage.getItem("allTasks")) || [];//task is taken as an empty object //
let allTasksCopy = [...allTasks]; //copy will help in filtering items//

if (localStorage.getItem("allTasks")) {
  allTasks.map((task) => {
    createTask(task);

  });
}

function createTask(task) {
  //li has been created
  let listedTask = document.createElement("li");

  //task container has been created here//
  let taskContainer = document.createElement("div");
  setAttributes(taskContainer, { class: "flex justify-between bg-blue-400 text-white pl-8 pr-6 pt-2 pb-3 mb-2" });
  listedTask.appendChild(taskContainer);

  //span has been created//
  let addedTask = document.createElement("span");
  setAttributes(addedTask, { class: "text-lg " });

  //text node of task title//
  let taskContent = document.createTextNode(task.title);
  addedTask.appendChild(taskContent);
  taskContainer.appendChild(addedTask);

  //div El acting as btns container//  
  let btnsContainer = document.createElement("div");
  setAttributes(btnsContainer, { class: "flex gap-4" });

  //btn of task status//
  let taskStatus = document.createElement("button");
  setAttributes(taskStatus, { class: "bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded-full border-2 border-white" });
  taskStatus.textContent = "Completed";
  btnsContainer.appendChild(taskStatus);

  //delete btn //
  let deleteBtn = document.createElement("button");
  setAttributes(deleteBtn, { class: "bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded-full border-2 border-white" });
  deleteBtn.textContent = "Delete";
  btnsContainer.appendChild(deleteBtn);
  taskContainer.appendChild(btnsContainer);
  tasks.appendChild(listedTask);

  //event listened on delete btn// 
  deleteBtn.addEventListener("click", function () {
    //filteration of tasks which needs to be removed//
    let updatedTasks = allTasks.filter((item) => item.id !== task.id)
    allTasks = [...updatedTasks];
    localStorage.setItem("allTasks", JSON.stringify(allTasks));
    listedTask.remove();

  });

  //event listened on completed btn//
  taskStatus.addEventListener("click", function (e) {
    e.preventDefault();
    task.completed = task.completed ? false : true;
    if (task.completed) {
      addedTask.style.textDecoration = "line-through";
      taskStatus.textContent = "Incomplete";
    }
    else {
      addedTask.style.textDecoration = "none";
      taskStatus.textContent = "Complete";
    }


  });
  taskInput.value = "";



}
//addition of tasks //

let addTask = function (ev) {
  ev.preventDefault();
  if (!taskInput.value) {
    return;
  }
  //if value is truthy//
  let task = {};
  task.id = Date.now() + Math.random();
  task.title = taskInput.value;//property created of obj task//
  task.completed = false;//property created of obj task//
  //adding task(obj) to array//  

  allTasks.unshift(task);
  allTasksCopy = [...allTasks];//creating a copy which we won't mutate//
  localStorage.setItem("allTasks", JSON.stringify(allTasks));
  createTask(task);//rendering ui//

}
//search functionality functions//
function suggestedTasks(value) {
  if (!value) {
    tasks.innerHTML = "";
    tasks.style.display = "none";
  }
  if (value) {
    tasks.style.display = "block";

    let tasksFound = allTasks.filter((item) => {
      return item.title.toLowerCase().startsWith(value);
    })
  if (tasksFound.length === 0) {
      tasks.style.display = "none";
    }
  else {
      tasks.innerHTML = "";
      tasksFound.map((task) => {
        createTask(task);
      })
    }


  }
}

function relevantTasks(ev) {
  let valueEntered = ev.target.value;
  valueEntered = valueEntered.trim().toLowerCase();
  console.log(valueEntered);
  if (valueEntered) {
    suggestedTasks(valueEntered);//suggested tasks has been called with users' value//
  }

}
// search functionality functions ends here//

//All events listeners---//

//filtering on the basis of dropdown click//
filterDropDown.addEventListener("click", function (ev) {
  let optionSelected = ev.target.value;
  optionSelected = optionSelected.toLowerCase();
  
  if (optionSelected === "all") {
    allTasks = allTasksCopy;
    localStorage.setItem("alltasks", JSON.stringify(allTasks));
    tasks.innerHTML = "";
    allTasks.map((task) =>
      createTask(task));
      
  }
   if(taskSearch.value.length>0){
        allTasksCopy.filter((task)=>task.title.toLowerCase().startsWith(taskSearch.value))
   }

  if (optionSelected === "completed") {

    let tasksTodisplay = allTasksCopy.filter((task) => task.completed === true);
    allTasks = [...tasksTodisplay];
    localStorage.setItem("alltasks", JSON.stringify(allTasks))
    tasks.innerHTML = "";
    allTasks.map((task) =>
      createTask(task));
    if(taskSearch.value.length>0){
        tasksTodisplay.filter((task)=>task.title.toLowerCase().startsWith(taskSearch.value))
   }
  }

  if (optionSelected === "incomplete") {
    let tasksTodisplay = allTasksCopy.filter((task) => task.completed === false);
    allTasks = tasksTodisplay;
    localStorage.setItem("allTasks", JSON.stringify(allTasks));
    tasks.innerHTML = "";
    allTasks.map((task) =>
      createTask(task));
    if(taskSearch.value.length>0){
        tasksTodisplay.filter((task)=>task.title.toLowerCase().startsWith(taskSearch.value))
   }  

  }

})

//taskSearch input event listened//
taskSearch.addEventListener("input", relevantTasks);

//add button event listened//
addButton.addEventListener("click", addTask);