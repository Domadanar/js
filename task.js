const contactsEndpoint = 'http://localhost:5000/';

const mainElement = document.getElementById('main_Box');

function renderTasks(tasks) {
	
	document.getElementById("main_Box").innerHTML = ' ';
	
	console.log(tasks);
	tasks.forEach(renderNewTasks)
};
function renderNewTasks(task){
	const {title, description, dueDate, done, taskId} = task;
	let titleElement;
    let descriptionElement;
    let dateElement;

	description === null ? descriptionElement = '' : descriptionElement = `<p class="task_Description">${description}</p>`;

    if (dueDate === null || dueDate === ''){ 
        dateElement = ''
    } else {
        let fixDate = new Date(dueDate);
        let dateStatus = '';
        if (new Date() > fixDate  && !done) {
            dateStatus = 'task_Date_OverDue'
        } else {
			dateStatus = 'task_Date_notOverDue'
        }
		dateElement = `<div class="task_Date_Check"><p>Due date:</p><h5 class="${dateStatus}">${fixDate.toDateString()}</h5></div>`;
    }; 

    let checked = '';
    let taskDoneClass = ''; 

	if (done) {
        checked = 'checked';
        taskDoneClass = 'class="task_title_done"';
    };

		titleElement =
        `<div>
            <h2 ${taskDoneClass}>${title}</h2>
            <div>
                <input type="checkbox" class="task_checkbox" ${checked} onchange="completeTaskCheckbox(event.target)"> 
                <button onclick="deleteTask(event.target)">X</button>
            </div>
        </div>`;
		mainElement.innerHTML += `<section class="task" id="task_${taskId}">${titleElement} ${descriptionElement} ${dateElement}</section>`;
	};


function completeTasksVisibility(target) {
	let doneTasks = document.getElementsByClassName('task_checkbox');
	let display = 'flex';

	if (target.checked) {
		display = 'none';
	};

	for (let i = 0; i < doneTasks.length; i++) {
		if (doneTasks[i].checked) {
			doneTasks[i].parentElement.parentElement.parentElement.style.display = display;
		};
	};
};

function completeTaskCheckbox(target) {
	let taskElement = target.parentElement.parentElement.parentElement;
	let taskID = taskElement.id.split("_")[1];
	let taskTitleElement = taskElement.firstElementChild.firstElementChild;

	let bol = false;

	if (target.checked) {
		taskTitleElement.classList.add("task_title_done");
		bol = true;
	} else {
		taskTitleElement.classList.remove("task_title_done");
		bol = false;
	}
	updateTaskStatus(taskID, bol).then(response => console.log("UPDATED at " + response) );
	completeTasksVisibility(document.getElementById("ShowCheckbox"));
}

function deleteTask(target) {
	let taskElement = target.parentElement.parentElement.parentElement;
	let taskID = taskElement.id.split("_")[1];

	deleteTaskFromDB(taskID).then(response => {renderFetchTasks(), console.log("DELETED at '" + response + "'")} );
	taskElement.remove();
}


function openForm() {
	document.getElementById('FormBlock').style.display = 'flex';
}

function closeForm() {
	document.getElementById('FormBlock').style.display = 'none';
}

const taskForm = document.forms['AddTaskForm'];

taskForm.addEventListener('submit', (event) => {
	event.preventDefault();
	const formData = new FormData(taskForm);
	let task = Object.fromEntries(formData.entries());
	if (task['title'] ===  ' ') {
		alert('Title is required!')
		return;
	}
	createTask(task)
	.then(renderNewTask).catch(postError)
	.then(_ => taskForm.reset())
	closeForm();
})

function renderFetchTasks(){ 
    fetch(contactsEndpoint + 'lists/tasks?all=true')
    .then(response => response.json())
    .then(tasksResponse => {renderTasks(tasksResponse), tasks=tasksResponse})
    .catch(handleError);
}

function handleError() {
    alert("Can't load tasks.");
} 

function postError() {
    alert("Can't add task.");
} 
renderFetchTasks();