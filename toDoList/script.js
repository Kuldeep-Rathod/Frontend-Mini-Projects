const taskInput = document.querySelector('.task-input input');
const form = document.querySelector('form');
filter = document.querySelectorAll('.filter span');
clearAll = document.querySelector('.clearAll');
const taskBox = document.querySelector('.taskBox');

let editId;
let isEditedTask = false;
//getting local storage todo-list
let todos = JSON.parse(localStorage.getItem("todo-list"));

filter.forEach((btn) => {
    btn.addEventListener("click", () => {
        document.querySelector('span.active').classList.remove("active");
        btn.classList.add("active");
        showTodo(btn.id)
    })
})

function showTodo(filter) {
    let li = "";
    if (todos) {
        todos.forEach((todo, id) => {
            //if status is completed , set the isCompleted value to checked
            let isCompleted = todo.status == "completed" ? "checked" : "";
            if (filter == todo.status || filter == "all") {
                li += `<li class="task flex justify-between border-b border-[#ccc] mb-5 pb-4">
                <label for="${id}" class="flex space-x-3 items-center">
                    <input onclick="updateStatus(this)" type="checkbox" name="" id="${id}" class="mt-1" ${isCompleted}>
                        <p class="${isCompleted}">${todo.name}</p>
                </label>
                <div class="setting cursor-pointer relative">
                    <i onclick="showMenu(this)" class="uil uil-ellipsis-h"></i>
                    <ul class="settingMenu bg-white absolute space-y-1 scale-0 hover:scale-100 duration-700 right-3 top-1">
                        <li onclick="editTask(${id}, '${todo.name}')" class="hover:bg-blue-200 px-3 py-1 flex"><i class="uil uil-pen pr-2"></i>Edit</li>
                        <li onclick="deleteTask(${id})" class="hover:bg-red-200 px-3 py-1 flex"><i class="uil uil-trash pr-2"></i>Delete</li>
                    </ul>
                </div>
            </li>`;
                    
            }

        });
    }
    //if li isn't empty, insert the value in taskbox else insert span
    taskBox.innerHTML = li || `<span>You don't have any task here</span>`;
}
showTodo("all");

function showMenu(selectedTask) {
    let settingMenu = selectedTask.parentElement.lastElementChild;
    settingMenu.classList.add("show");
    document.addEventListener("click", (e) => {
        if (e.target.tagName != "I" || e.target != selectedTask) {
            settingMenu.classList.remove("show");
        }
    });
}

function editTask(taskId, taskName) {
    editId = taskId;
    isEditedTask = true;
    taskInput.value = taskName;
}

function deleteTask(deleteId) {
    //removing selected task from array/todos
    todos.splice(deleteId, 1);
    localStorage.setItem("todo-list", JSON.stringify(todos));
    showTodo("all");
}

clearAll.addEventListener("click", () => {
    //removing all items from array/todos
    todos.splice(0, todos.length);
    localStorage.setItem("todo-list", JSON.stringify(todos));
    showTodo("all");
})

function updateStatus(selectedTask) {
    // getting paregraph that contain task name
    let taskName = selectedTask.parentElement.lastElementChild;
    // console.log(selectedTask);
    if (selectedTask.checked) {
        taskName.classList.add("checked");
        //updating the status of selected task to compeled
        todos[selectedTask.id].status = "completed";
    } else {
        taskName.classList.remove("checked");
        //updating the status of selected task to pending
        todos[selectedTask.id].status = "pending";

    }
    localStorage.setItem("todo-list", JSON.stringify(todos));
}

form.addEventListener('submit', function (e) {
    // e.preventDefault();//if we add this the we must refresh after every entry

    let userTask = taskInput.value.trim();
    if (userTask) {
        // let todos = JSON.parse(localStorage.getItem("todo-list"));
        if (!isEditedTask) {//if edited task isn't true
            if (!todos) {//if todos isn't exist, pass an empty array to todos
                todos = [];
            }
            let taskInfo = { name: userTask, status: "pending" }
            todos.push(taskInfo); //adding new task to todoss

        } else {
            isEditedTask = false;
            todos[editId].name = userTask;
        }

        taskInput.value = "";//every time empty input
        localStorage.setItem("todo-list", JSON.stringify(todos));
        showTodo("all");
    }
});