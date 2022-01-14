const newTaskInput = document.querySelector('#taskInput');
const tasks = document.querySelector('.tasks');
let task = document.querySelectorAll('.task');
let activeCount = 0;
let activeTasks = document.querySelectorAll('.active');
let activeClearBtn = document.querySelectorAll('.active .clear');
let activeEmptyCircleTask = document.querySelectorAll('.active .emptyCircleTask');
let activeTaskTitle = document.querySelectorAll('.active .taskTitle');
let itemsLeft = document.querySelector('.itemsLeft');
let activeIconCheck = document.querySelectorAll('.active .iconCheck');
let h1 = document.querySelector('h1');
let typeTask = document.querySelectorAll('.typeTask');
const clearCompleted = document.querySelector('.clearCompleted');
const sun = document.querySelector('.sun');
const moon = document.querySelector('.moon');
const body = document.querySelector('body');
const header = document.querySelector('header');
const tasksBox = document.querySelector('.tasksBox');
const mobileFooterDown = document.querySelector('.mobileFooterDown');

let tasksObject = [];
let theme = 'dark';

function dragStart(e) {
        setTimeout(() => (this.classList.add('invisible')), 0);
        dragSrcEl = this;
        e.dataTransfer.effectAllowed = 'move';
        e.dataTransfer.setData('text/html', this.innerHTML);
};
    
function dragEnd() {
    var listItens = document.querySelectorAll('.task');
    [].forEach.call(listItens, function(item) {
        item.classList.remove('over');
    });
    this.classList.remove('invisible');
};

function dragOver(e) {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';

};

function dragEnter(e) {
    e.preventDefault();
    this.classList.add('over');
};

function dragLeave(e) {
    this.classList.remove('over');
};

function dragDrop(e) {
    if (dragSrcEl != this) {
        let idTemp = 0;
        dragSrcEl.innerHTML = this.innerHTML;
        idTemp = dragSrcEl.id;
        dragSrcEl.id = this.id;
        this.innerHTML = e.dataTransfer.getData('text/html');
        this.id = idTemp;      
    };
    refreshVarDom();
    clearTask();
    finishTask();
};
    

const dragAndDrop = () => {
    task.forEach(item => {
        item.addEventListener('dragstart', dragStart);
        item.addEventListener('dragend', dragEnd);
        item.addEventListener('dragover', dragOver);
        item.addEventListener('dragenter', dragEnter);
        item.addEventListener('dragleave', dragLeave);
        item.addEventListener('drop', dragDrop);
    });
};


sun.addEventListener('click', () => {
    theme = 'light';
    body.classList.add('lightBody');
    body.classList.remove('darkBody');
    header.classList.add('lightHeader');
    header.classList.remove('darkHeader');
    moon.style.display = 'block';
    sun.style.display = 'none';
    newTaskInput.classList.add('lightInput');
    newTaskInput.classList.remove('darkInput');
    tasksBox.classList.add('lightTasksBox');
    tasksBox.classList.remove('darkTasksBox');
    activeEmptyCircleTask.forEach(item => {
        item.style.background = 'hsl(0, 0%, 98%)';
    });
    typeTask.forEach(item => {
        item.classList.add('lightTypeTask');
        item.classList.remove('darkTypeTask');
    })
    clearCompleted.classList.add('lightClearCompleted');
    clearCompleted.classList.remove('darkClearCompleted');
    mobileFooterDown.classList.add('lightMobileFooterDown');
    mobileFooterDown.classList.remove('darkMobileFooterDown');
});

moon.addEventListener('click', () => {
    theme = 'dark';
    body.classList.remove('lightBody');
    body.classList.add('darkBody');
    header.classList.remove('lightHeader');
    header.classList.add('darkHeader');
    moon.style.display = 'none';
    sun.style.display = 'block';
    newTaskInput.classList.remove('lightInput');
    newTaskInput.classList.add('darkInput');
    tasksBox.classList.remove('lightTasksBox');
    tasksBox.classList.add('darkTasksBox');
    activeEmptyCircleTask.forEach(item => {
        item.style.background = 'hsl(235, 24%, 19%)';
    });
    typeTask.forEach(item => {
        item.classList.remove('lightTypeTask');
        item.classList.add('darkTypeTask');
    })
    clearCompleted.classList.remove('lightClearCompleted');
    clearCompleted.classList.add('darkClearCompleted');
    mobileFooterDown.classList.remove('lightMobileFooterDown');
    mobileFooterDown.classList.add('darkMobileFooterDown');
});

const refreshVarDom = () => {
    activeTasks = document.querySelectorAll('.active');
    activeClearBtn = document.querySelectorAll('.active .clear');
    activeEmptyCircleTask = document.querySelectorAll('.active .emptyCircleTask');
    activeTaskTitle = document.querySelectorAll('.active .taskTitle');
    activeIconCheck = document.querySelectorAll('.active .iconCheck');
    task = document.querySelectorAll('.task');
}

const clearTask = () => {
    activeClearBtn.forEach(item => {
        item.addEventListener('click', () => {
            let idNb =item.id.slice(5);
            activeTasks.forEach(el => {
                if (el.id == idNb) {
                    let taskToRemove = document.getElementById(idNb);
                    taskToRemove.parentNode.removeChild(taskToRemove);
                };
            });
            tasksObject.forEach(el => {
                if (el.id == idNb) {
                    tasksObject.splice(tasksObject.indexOf(el), 1);
                };
            });
            itemsLeftRefresh();
            refreshVarDom();
            finishTask();
        });
    });
};

const finishTask = () => {
    activeEmptyCircleTask.forEach(item => {
        item.addEventListener('click', () => {
            let idNb = item.id.slice(15);
            activeIconCheck.forEach(el => {
                if ('iconCheck' + idNb === el.id) {
                    el.style.display = 'block';
                };
            });
            activeTaskTitle.forEach(el => {
                if ('taskTitle' + idNb === el.id) {
                    el.style.textDecoration = 'line-through';
                    el.style.color = '#484b6a';
                };
            });
            tasksObject.forEach(el => {
                if (el.id == idNb) {
                    el.status = 'completed';
                };
            });
            itemsLeftRefresh();
            refreshVarDom();
            clearTask();
        });
    });
};

const addTask = () => {
    activeCount = activeCount + 1;
    tasksObject.push({id: activeCount, status: 'active', value: newTaskInput.value});
    tasks.insertAdjacentHTML('beforeend',`
        <li class="task active" id="${activeCount}" draggable="true">
            <div class="taskTitleBox">
            <div class="borderCircle">
                <div class="emptyCircle emptyCircleTask ${theme}EmptyCircleTask" id="emptyCircleTask${activeCount}"><img src="./images/icon-check.svg" alt="icon-check" class="iconCheck" id="iconCheck${activeCount}"></div>
            </div>
            <p class="taskTitle" id="taskTitle${activeCount}">${newTaskInput.value}</p>
            </div>
            <div class="clear" id="close${activeCount}">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18"><path fill="#494C6B" fill-rule="evenodd" d="M16.97 0l.708.707L9.546 8.84l8.132 8.132-.707.707-8.132-8.132-8.132 8.132L0 16.97l8.132-8.132L0 .707.707 0 8.84 8.132 16.971 0z"/></svg>
            </div>
        </li>
    `);

    refreshVarDom();
    
    itemsLeftRefresh();

    clearTask();
    finishTask();
    dragAndDrop();
    
    newTaskInput.value = '';
};

const itemsLeftRefresh = () => {
    let i = 0;
    tasksObject.forEach(item =>{
        if (item.status === 'active') {
            i = i + 1;
        };
    });
    if (i < 2) {
        itemsLeft.innerText = i + ' item left';
    } else {
        itemsLeft.innerText = i + ' items left';
    };
};

const completedFilter = () => {
    while (tasks.firstChild) {
        tasks.removeChild(tasks.firstChild);
    };
    tasksObject
        .filter((taskObject) => taskObject.status.includes('completed'))
        .map((taskObject) => {
            tasks.insertAdjacentHTML('beforeend',`
                <li class="task active" id="${taskObject.id}" draggable="true">
                    <div class="taskTitleBox">
                    <div class="borderCircle">
                        <div class="emptyCircle emptyCircleTask ${theme}EmptyCircleTask" id="emptyCircleTask${taskObject.id}"><img src="./images/icon-check.svg" alt="icon-check" class="iconCheck" id="iconCheck${taskObject.id}" style="display: block"></div>
                    </div>
                    <p class="taskTitle" id="taskTitle${taskObject.id}" style="color: #484b6a; text-decoration: line-through">${taskObject.value}</p>
                    </div>
                    <div class="clear" id="close${taskObject.id}">
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18"><path fill="#494C6B" fill-rule="evenodd" d="M16.97 0l.708.707L9.546 8.84l8.132 8.132-.707.707-8.132-8.132-8.132 8.132L0 16.97l8.132-8.132L0 .707.707 0 8.84 8.132 16.971 0z"/></svg>
                    </div>
                </li>
            `);
        });
    refreshVarDom();
    clearTask();
    finishTask();
    dragAndDrop();
};

const activeFilter = () => {
    while (tasks.firstChild) {
        tasks.removeChild(tasks.firstChild);
    };
    tasksObject
        .filter((taskObject) => taskObject.status.includes('active'))
        .map((taskObject) => {
            tasks.insertAdjacentHTML('beforeend',`
                <li class="task active" id="${taskObject.id}" draggable="true">
                    <div class="taskTitleBox">
                    <div class="borderCircle">
                        <div class="emptyCircle emptyCircleTask ${theme}EmptyCircleTask" id="emptyCircleTask${taskObject.id}"><img src="./images/icon-check.svg" alt="icon-check" class="iconCheck" id="iconCheck${taskObject.id}"></div>
                    </div>
                    <p class="taskTitle" id="taskTitle${taskObject.id}">${taskObject.value}</p>
                    </div>
                    <div class="clear" id="close${taskObject.id}">
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18"><path fill="#494C6B" fill-rule="evenodd" d="M16.97 0l.708.707L9.546 8.84l8.132 8.132-.707.707-8.132-8.132-8.132 8.132L0 16.97l8.132-8.132L0 .707.707 0 8.84 8.132 16.971 0z"/></svg>
                    </div>
                </li>
            `);
        });
    refreshVarDom();
    clearTask();
    finishTask();
    dragAndDrop();
};

const allFilter = () => {
    while (tasks.firstChild) {
        tasks.removeChild(tasks.firstChild);
    };
    tasksObject
        .filter((taskObject) => taskObject.status.includes('completed'))
        .map((taskObject) => {
            tasks.insertAdjacentHTML('beforeend',`
                <li class="task active" id="${taskObject.id}" draggable="true">
                    <div class="taskTitleBox">
                    <div class="borderCircle">
                        <div class="emptyCircle emptyCircleTask ${theme}EmptyCircleTask" id="emptyCircleTask${taskObject.id}"><img src="./images/icon-check.svg" alt="icon-check" class="iconCheck" id="iconCheck${taskObject.id}" style="display: block"></div>
                    </div>
                    <p class="taskTitle" id="taskTitle${taskObject.id}" style="color: #484b6a; text-decoration: line-through">${taskObject.value}</p>
                    </div>
                    <div class="clear" id="close${taskObject.id}">
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18"><path fill="#494C6B" fill-rule="evenodd" d="M16.97 0l.708.707L9.546 8.84l8.132 8.132-.707.707-8.132-8.132-8.132 8.132L0 16.97l8.132-8.132L0 .707.707 0 8.84 8.132 16.971 0z"/></svg>
                    </div>
                </li>
            `);
        });
    tasksObject
        .filter((taskObject) => taskObject.status.includes('active'))
        .map((taskObject) => {
            tasks.insertAdjacentHTML('beforeend',`
                <li class="task active" id="${taskObject.id}" draggable="true">
                    <div class="taskTitleBox">
                    <div class="borderCircle">
                        <div class="emptyCircle emptyCircleTask ${theme}EmptyCircleTask" id="emptyCircleTask${taskObject.id}"><img src="./images/icon-check.svg" alt="icon-check" class="iconCheck" id="iconCheck${taskObject.id}"></div>
                    </div>
                    <p class="taskTitle" id="taskTitle${taskObject.id}">${taskObject.value}</p>
                    </div>
                    <div class="clear" id="close${taskObject.id}">
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18"><path fill="#494C6B" fill-rule="evenodd" d="M16.97 0l.708.707L9.546 8.84l8.132 8.132-.707.707-8.132-8.132-8.132 8.132L0 16.97l8.132-8.132L0 .707.707 0 8.84 8.132 16.971 0z"/></svg>
                    </div>
                </li>
            `);
        });
    refreshVarDom();
    clearTask();
    finishTask();
    dragAndDrop();
};
 
typeTask.forEach(item => {
    switch (item.innerText) {
        case 'Completed':
            item.addEventListener('click', () => {
                typeTask.forEach(element => {
                    if (element.innerText !== item.innerText) {
                        element.style.color = 'hsl(235, 19%, 35%)';
                        element.addEventListener('mouseover', () => {
                            element.style.color = 'white';
                        });
                        element.addEventListener('mouseout', () => {
                            element.style.color = 'hsl(235, 19%, 35%)';
                        });
                    };
                });
                item.style.color = 'hsl(220, 98%, 61%)';
                completedFilter();
            });
            break;
        case 'Active':
            item.addEventListener('click', () => {
                typeTask.forEach(element => {
                    element.style.color = 'hsl(235, 19%, 35%)';
                });
                item.style.color = 'hsl(220, 98%, 61%)';
                activeFilter();
            });
            break;
        case 'All':
            item.addEventListener('click', () => {
                typeTask.forEach(element => {
                    element.style.color = 'hsl(235, 19%, 35%)';
                });
                item.style.color = 'hsl(220, 98%, 61%)';
                allFilter();
            });
            break;
        default:
            null;
    }
});

clearCompleted.addEventListener('click', () => {
    let tasksCompletedObject = [];
    for (let i = 0 ; i < tasksObject.length ; i++) {
        if (tasksObject[i].status === 'completed') {
            tasksCompletedObject.push(tasksObject[i]);
            activeTasks.forEach(el => {
                if (el.id == tasksObject[i].id) {
                    let taskToRemove = document.getElementById(tasksObject[i].id);
                    taskToRemove.parentNode.removeChild(taskToRemove);
                };
            });
            tasksObject.splice(tasksObject.indexOf(tasksObject[i]), 1);
            i = i - 1;
        };
    };
    itemsLeftRefresh();
    refreshVarDom();
});

itemsLeftRefresh();

newTaskInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        addTask();
    };
});

dragAndDrop();



