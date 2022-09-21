const form = document.querySelector("form");
const input = document.querySelector("#in-text");
form.addEventListener('submit', () => {
    event.preventDefault();
    let localItems = JSON.parse(localStorage.getItem("localItem"));
    if (localItems === null) {
        taskList = [];
    } else {
        taskList = localItems;
    }

    let obj = {};
    obj.task = input.value;
    obj.isComplete = false;
    taskList.push(obj);
    localStorage.setItem("localItem", JSON.stringify(taskList));
    form.reset();
    showList();
})
showList();

function showList() {
    let output = "";
    let localItems = JSON.parse(localStorage.getItem("localItem"));
    let taskListShow = document.querySelector(".list-container");
    if (localItems === null) {
        taskList = [];
    } else {
        taskList = localItems;
    }
    taskList.forEach((obj, index) => {
        if (obj.isComplete) {
            output += `<div class="item">
        <input type="checkbox" checked onchange="checkUncheck(this,${index})">
        <label for="">${obj.task}</label>
        <button onclick="deleteItem(${index})">x</button>
    </div>`
        } else {
            output += `<div class="item">
        <input type="checkbox" onchange="checkUncheck(this,${index})">
        <label for="">${obj.task}</label>
        <button onclick="deleteItem(${index})">x</button>
    </div>`
        }
    })
    taskListShow.innerHTML = output;
    let tasks=taskList.filter(task=>{
        return !task.isComplete;
    })
    document.querySelector(".toggler label").innerText=`${tasks.length} items left`;
}

function showActiveList(actives) {
    let output = "";
    // let localItems=JSON.parse(localStorage.getItem("localItem"));
    let taskListShow = document.querySelector(".active-container");
    let temp;
    if (actives === null) {
        temp = [];
    } else {
        temp = actives;
    }
    temp.forEach((obj, index) => {
        if (obj.isComplete) {
            output += `<div class="item">
        <input type="checkbox" checked onchange="checkUncheck(this,${index})">
        <label for="">${obj.task}</label>
        <button onclick="deleteItem(${index})">x</button>
    </div>`
        } else {
            output += `<div class="item">
        <input type="checkbox" onchange="checkUncheck(this,${index})">
        <label for="">${obj.task}</label>
        <button onclick="deleteItem(${index})">x</button>
    </div>`
        }
    })
    taskListShow.innerHTML = output;
}

function showCompletedList(completed) {
    let output = "";
    // let localItems=JSON.parse(localStorage.getItem("localItem"));
    let temp;
    let taskListShow = document.querySelector(".completed-container");
    if (completed === null) {
        temp = [];
    } else {
        temp = completed;
    }
    temp.forEach((obj, index) => {
        if (obj.isComplete) {
            output += `<div class="item">
        <input type="checkbox" checked onchange="checkUncheck(this,${index})">
        <label for="">${obj.task}</label>
        <button onclick="deleteItem(${index})">x</button>
    </div>`
        } else {
            output += `<div class="item">
        <input type="checkbox" onchange="checkUncheck(this,${index})">
        <label for="">${obj.task}</label>
        <button onclick="deleteItem(${index})">x</button>
    </div>`
        }
    })
    taskListShow.innerHTML = output;
}

function showActive() {
    let localItems = JSON.parse(localStorage.getItem("localItem"));
    let actives = taskList.filter(task => {
        return !task.isComplete;
    })
    document.querySelector('.list-container').style.display = "none";
    document.querySelector('.active-container').style.display = "block";
    document.querySelector('.completed-container').style.display = "none";
    showActiveList(actives);
}

function showCompleted() {
    let localItems = JSON.parse(localStorage.getItem("localItem"));
    let completed = taskList.filter(task => {
        return task.isComplete;
    })
    document.querySelector('.list-container').style.display = "none";
    document.querySelector('.active-container').style.display = "none";
    document.querySelector('.completed-container').style.display = "block";
    showCompletedList(completed);
}

function showAll() {
    document.querySelector('.list-container').style.display = "block";
    document.querySelector('.active-container').style.display = "none";
    document.querySelector('.completed-container').style.display = "none";
    showList();
}

function deleteItem(index) {
    let localItems = JSON.parse(localStorage.getItem("localItem"));
    taskList.splice(index, 1);
    localStorage.setItem("localItem", JSON.stringify(taskList));
    showList();
}

function checkUncheck(event, index) {
    let localItems = JSON.parse(localStorage.getItem("localItem"));
    if (event.checked) {
        taskList[index].isComplete = true;
    } else {
        taskList[index].isComplete = false;
    }
    let tasks=taskList.filter(task=>{
        return !task.isComplete;
    })
    document.querySelector(".toggler label").innerText=`${tasks.length} items left`;
    localStorage.setItem("localItem", JSON.stringify(taskList));
}

function removeActives(links) {
    links.forEach(link => {
        link.classList.remove("active");
    })
}
let links = document.querySelectorAll(".toggler a");
links.forEach(link => {
    link.addEventListener('click', (event) => {
        removeActives(links);
        event.target.classList.add("active");
    })
})