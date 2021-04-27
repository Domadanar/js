class Task {
	constructor(title, description, date, done) {
		this.title = title;
		this.description = description;
		this.date = date;
		done === undefined ? this.done = false : this.done = done;
	}
}
let tasks = [
	new Task('Add task.', 'description', '2021.04.27', true),
	new Task('123.'),
	new Task('123', '', '2021.04.19', false),
	new Task('123', '', '2020.11.03', true)
]

const mainElement = document.getElementById('main_Box');

function renderTasks(tasks) {
	let i = 0;
	document.getElementById("main_Box").innerHTML = ' ';

	tasks.forEach(task => {
		const { title, description, date, done } = task;
		let titleElement;
		let descriptionElement;
		let dateElement;
		let fixDate = new Date(date);

		description === undefined ? descriptionElement = '' : descriptionElement = `<p class="task_Description">${description}</p>`;

		if (date === undefined || date === '') {
			dateElement = ' '
		} else {
			let dateStatus = ' ';
			if (new Date() > fixDate && !done) {
				dateStatus = 'task_Date_OverDue'
			} else {
				dateStatus = 'task_Date_notOverDue'
			}
			dateElement = `<div class="task_Date_Check"><p>Due date:</p><h5 class="${dateStatus}">${fixDate.toDateString()}</h5></div>`;
		};
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
		mainElement.innerHTML += `<section class="task" id="task_${i}">${titleElement} ${descriptionElement} ${dateElement}</section>`;
		i++;
	});

}
renderTasks(tasks);

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

	if (task['date'] !==  ' ') {
		let date = new Date(task['date']);
		console.log(date);
		if (date == 'Invalid Date') {
			alert('Invalid Date!');
			return;
		} else {
			task['date'] = date;
		}
	}
	tasks.push(task);
	renderTasks(tasks);
	taskForm.reset();
	closeForm();
})