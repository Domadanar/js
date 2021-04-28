const contactsEndpoint = 'http://localhost:5000/';

const mainElement = document.getElementById('main_Box');

function renderTasks(tasks) {
	let i = 0;
	document.getElementById("main_Box").innerHTML = ' ';

		let checked = ' ';
		let taskDoneClass = ' ';

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
}


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

	if (target.checked) {
		taskTitleElement.classList.add("task_title_done");
		tasks[taskID].done = true;
	} else {
		taskTitleElement.classList.remove("task_title_done");
		tasks[taskID].done = false;
	}
	completeTasksVisibility(document.getElementById("ShowCheckbox"));
	console.log(tasks);
}

function deleteTask(target) {
	let taskElement = target.parentElement.parentElement.parentElement;
	let taskID = taskElement.id.split("_")[1];

	delete tasks[taskID];
	taskElement.remove();
	console.log(tasks);
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

	closeForm();
})