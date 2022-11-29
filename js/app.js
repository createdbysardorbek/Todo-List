const form = document.querySelector('.form'),
    taskInput = document.querySelector('.taskInput'),
    tasksList = document.querySelector('.todo-list'),
    tasksItems = document.querySelectorAll('.todo-list li'),

    activeCounter = document.querySelector('.items__left'),
    completed = document.querySelector('.completed'),
    all = document.querySelector('.all'),
    active = document.querySelector('.actived'),
    completed1 = document.querySelector('.completed1'),
    all1 = document.querySelector('.all1'),
    active1 = document.querySelector('.actived1'),
    clearCompleted = document.querySelector('.clear'),


    menu = document.querySelector('.menu'),
    navs = document.querySelectorAll('.menu li'),

    toggle = document.querySelector('img[alt="toggle"]'),
    moonToggle = document.querySelector('img[alt="moon"]');

// ! Creating array for tasks

let tasks = [];

// ! IF there is smth in localStorage adding to html page

if (localStorage.getItem('tasks')) {
    tasks = JSON.parse(localStorage.getItem('tasks'));
    tasks.forEach(task => renderTask(task));
}

// ! Calling function for the beginner result

countActive();

// ! Add Tasks

function addTask(event) {
    event.preventDefault();
    if (taskInput.value !== '') {
        const taskText = taskInput.value;
        const newTask = {
            text: taskText,
            id: Date.now(),
            done: false,
        };
        tasks.push(newTask);
        tasksList.innerHTML = ''
        tasks.forEach(elem => {
            renderTask(elem);
        })
    }
    countActive();
    saveToLocalStorage()
}

// ! Add HTML LI

function renderTask(elem) {
    const cssClass = elem.done ? 'todo__title done__line' : 'todo__title';
    const cssClass2 = elem.done ? 'done todo__done' : 'done';
    const taskHtml = `
            <li id="${elem.id}" class='todo-list__item'>
            <div class="textVsCheck">
            <div data-action="done" class="${cssClass2}"></div><span class="${cssClass}">${elem.text}</span>
            </div>
            <span  class="remove"><img data-action="remove" src="img/removeShape.svg" alt="remove"></span>
            </li>`;
    tasksList.insertAdjacentHTML("beforeend", taskHtml);
    taskInput.value = '';
    taskInput.focus();
}

// ! Call Function in Click

form.addEventListener('submit', addTask);

// ! Changing elements to done

function doneTask(event) {
    if (event.target.dataset.action !== 'done') return;
    event.target.classList.toggle('todo__done');
    const parentNode = event.target.closest('.todo-list__item');
    const id = +parentNode.id;
    const task = tasks.find(elem => elem.id === id);
    task.done = !task.done;
    const todoTitle = parentNode.querySelector('.todo__title');
    todoTitle.classList.toggle('done__line');

    countActive();
    saveToLocalStorage();
}

// ! Calling doneTask function in click

tasksList.addEventListener('click', doneTask);

// ! Deleting tasks from page and array

function deleteTask(event) {
    if (event.target.dataset.action !== 'remove') return;
    const parentNode = event.target.closest('.todo-list__item');
    const id = +parentNode.id;
    tasks = tasks.filter(elem => elem.id !== id);
    parentNode.remove();
    countActive();
    saveToLocalStorage();
}

// ! Calling deleteTask function in click

tasksList.addEventListener('click', deleteTask)


// ! MAking example for every change to save in localStorage

function saveToLocalStorage() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// ! Counting active tasks in tasks array

function countActive() {
    let counter = 0;
    tasks.forEach(elem => {
        if (elem.done !== true) {
            counter++;
        }
    })
    if (counter === 0) {
        activeCounter.innerHTML = 'There is no items!';
    } else {
        activeCounter.innerHTML = `${counter} items left`;
    }

}

// ! Displaying completed tasks

function completedTask() {
    tasksList.innerHTML = ''
    tasks.forEach((elem) => {
        if (elem.done) {
            renderTask(elem)
        }
    })
    activeCounter.innerHTML = 'There is no items!';
}

// ! CAlling completedTask in click

completed.addEventListener('click', completedTask);
completed1.addEventListener('click', completedTask);

// ! FUnction for displaying all tasks

function allTask() {
    all.style.color = '##3A7CFD';
    tasksList.innerHTML = ''
    tasks.forEach(elem => {
        renderTask(elem)
    });
    countActive()
}

// ! Calling allTAsk function in click

all.addEventListener('click', allTask);
all1.addEventListener('click', allTask);

// ! Function for displaying active tasks 

function activeTask() {
    tasksList.innerHTML = ''
    tasks.forEach(elem => {
        if (!elem.done) {
            renderTask(elem)
        }
    })
    countActive();
}

// ! CAlling activeTask in click

active.addEventListener('click', activeTask);
active1.addEventListener('click', activeTask);
// ! Competed task function

function deleteCompletedTasks() {
    tasks.forEach((elem, index) => {
        if (elem.done) {
            tasks.splice(index, 1);
        }
    })
    tasksList.innerHTML = ''
    tasks.forEach(elem => {
        renderTask(elem)
    })
    saveToLocalStorage();
}

// ! Calling function deleteCompletedTasks in click

clearCompleted.addEventListener('click', deleteCompletedTasks);


// ! For buttons below to make colourful

function tab(i) {
    navs.forEach(elem => {
        elem.classList.remove('active');
    });
    navs[i].classList.add('active');
}

// ! Displaying tabs in the bottom menu

function menuTask(e) {
    navs.forEach((elem, index) => {
        if (elem === e.target) {
            tab(index)
        }
    })
}

// ! Calling menuTask function in click

menu.addEventListener('click', menuTask);