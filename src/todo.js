let taskInput=document.getElementById("js-task-input");
let addButton=document.getElementById("js-add-task");
let tasks=document.getElementById("js-tasks");

//function to set attributes//
function setAttributes(el, attrs) {
    for(let key in attrs) {
      el.setAttribute(key, attrs[key]);
    }
  }
 

let task={};//task is taken as an empty object //



let addTask=function(ev){
    ev.preventDefault();

    if(!taskInput.value){
      return;
    }
    //if value is truthy//
    task.title=taskInput.value;//property created of obj task//
    task.completed=false;//property created of obj task//
   //li has been created
    let listedTask=document.createElement("li");
    setAttributes(listedTask,{class:"flex  justify-between bg-green-500 mb-4 py-2 pl-5 pr-8 text-white"});
    //span has been created//
    let addedTask=document.createElement("span");
    setAttributes(addedTask,{class:"text-lg"});
    //text node of task title//
    let taskContent=document.createTextNode(task.title);
    addedTask.appendChild(taskContent);
    listedTask.appendChild(addedTask); 
    //div El acting as btns container//  
    let btnsContainer=document.createElement("div");
    setAttributes(btnsContainer,{class:"flex gap-4 bg-blue-400 "});
    listedTask.appendChild(btnsContainer);
    //btn of task status//
    let taskStatus=document.createElement("button");
    setAttributes(taskStatus,{class:"bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded-full border-2 border-white"});
    btnsContainer.appendChild(taskStatus);
    taskStatus.textContent="Completed";
    //delete btn //
    let deleteBtn=document.createElement("button");
    setAttributes(deleteBtn,{class:"bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded-full border-2 border-white"}); 
    deleteBtn.textContent="Delete";
    btnsContainer.appendChild(deleteBtn);
    tasks.appendChild(listedTask);
    //event listened on delete btn// 
    deleteBtn.addEventListener("click",function(){
       listedTask.remove();
  });
    //event listened on completed btn//
    taskStatus.addEventListener("click",function (e){
       e.preventDefault();
       task.completed=task.completed ? false: true ;
       if(task.completed){
        addedTask.style.textDecoration="line-through";
        taskStatus.textContent="Incomplete";
       }
       else{
        addedTask.style.textDecoration="none";
        taskStatus.textContent="Complete";

       }
     
     
    });
    
  }

//add button event listened//
addButton.addEventListener("click",addTask);

