// find element

const todoForm = document.querySelector(".todo-form");
const todoInput = document.querySelector("#inputTodo");
const todoList = document.getElementById("list");
const messageElement = document.getElementById("message");


// Show - message

const showMessage = (text, status) =>{
    messageElement.textContent = text;
    messageElement.classList.add(`bg-${status}`);
    setTimeout(()=>{
        messageElement.textContent = " ";
        messageElement.classList.remove(`bg-${status}`);
    },1000

    )
}



// CreatTodo
const createTodo = (todoId, todoVelu ) =>{
    const todoElement = document.createElement("li");
    todoElement.id = todoId;
    todoElement.classList.add("li-style");
    todoElement.innerHTML = `
    <span> ${todoVelu} </span>
    <span> <button class= "addTodoButton" id= "deleteButton">  
    <i class= "fa fa-trash"> </i>
    </button> </span>
    
    `;
    
    todoList.appendChild(todoElement);

    const deleButton = todoElement.querySelector("#deleteButton");
    deleButton.addEventListener("click", deleteTodo)
}

// delete Todo 

const deleteTodo = (event) =>{
    const selecteTodo = event.target.parentElement.parentElement.parentElement;


    todoList.removeChild(selecteTodo);
    showMessage("Todo is deleted", "danger")


    let todos = getTodosFromLocalStorage();
    todos = todos.filter((todo) => todo.todoId !== selecteTodo.id);

    localStorage.setItem("mytodos", JSON.stringify(todos));
};

//getTodosFromLocalStorage

const getTodosFromLocalStorage = () =>{
   return localStorage.getItem("mytodos") ? JSON.parse(localStorage.getItem("mytodos")) : []; 

};


// addTodo

const addTodo = (event) => {
event.preventDefault();
const todoVelu = todoInput.value;

// Unique id create for valu

const todoId = Date.now().toString();
createTodo (todoId, todoVelu);
showMessage("Todo is added", "success");

// adding todo to localStorage

const todos = getTodosFromLocalStorage();
todos.push({todoId, todoVelu});
localStorage.setItem("mytodos", JSON.stringify(todos));

todoInput.value = " ";



};


// loadTodos


const loadTodos = () => {
    const todos = getTodosFromLocalStorage();
    todos.map((todo) => createTodo(todo.todoId, todo.todoVelu))
};



// Adding listeners

todoForm.addEventListener("submit", addTodo);
window.addEventListener("DOMContentLoaded", loadTodos);