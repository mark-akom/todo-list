// this file will be the application logic

const appDataStorage = (function() {
    localStorage.setItem('appData', JSON.stringify({"Default": []}));

    function returnProjects() {
        let appProjects = localStorage.getItem('appData');
        appProjects = JSON.parse(appProjects);
        return appProjects;
    }

    function saveData(appProjects) {
        localStorage.setItem('appData', JSON.stringify(appProjects));
    }

    return {
        returnProjects,
        saveData,
    }
})()

const todoApp = (function () {
    // hold all projectFolders or projectNames and their task
    // const projects = appDataStorage.returnProjects();

    function createTask(title, description, dueDate, priority, projectName) {
        const id = new Date().getTime().toString();
        
        return {
            id,
            title,
            description,
            dueDate,
            priority,
            complete: false,
            projectName
        }
    }

    function returnAllProjects() {
        return appDataStorage.returnProjects();
    }

    function saveTask(task, projectName = 'defaultFolder') {
        const proj = appDataStorage.returnProjects();
        proj[projectName].push(task);
        appDataStorage.saveData(proj);
        console.log(task);
    }

    function createProject(name) {
        const proj = appDataStorage.returnProjects();
        proj[name] = [];
        appDataStorage.saveData(proj);
    }

    function updateStatus(projectName, taskId) { // change the state of a project
        let proj = appDataStorage.returnProjects();
        const project = proj[projectName];
        let task = project.filter(item => item.id === taskId)[0];
        task.complete = !(task.complete);
        appDataStorage.saveData(proj);
        return task.complete;
    }

    function deleteTask(projectName, taskId) {
        const proj = appDataStorage.returnProjects();
        let project = proj[projectName];
        proj[projectName] = project.filter(item => item.id !== taskId);
        appDataStorage.saveData(proj);
    }

    function editTask(oldTask, taskObj) {
        const proj = appDataStorage.returnProjects();
        // taskObj is the edited task
        if (oldTask.projectName !== taskObj.projectName) { 
            const newtask = {};
            Object.assign(newtask, oldTask, taskObj);
            proj[taskObj.projectName].push(newtask);
            proj[oldTask.projectName] = proj[oldTask.projectName].filter(item => item.id !== oldTask.id);
        } else {
            proj[taskObj.projectName].forEach((taskItem) => {
                if (taskItem.id === oldTask.id) {
                    Object.assign(taskItem, taskObj);
                }
            });
        }
        appDataStorage.saveData(proj);
    }

    return {
        createTask,
        returnAllProjects,
        saveTask,
        updateStatus,
        deleteTask,
        createProject,
        editTask,
    }
})()

const uiControl = (function() {
    function checkForTask(projectName, period) {
        const projects = todoApp.returnAllProjects();
        const projectNames = Object.keys(projects);
        let taskCount = 0;
        let tasks = [];
        projectNames.forEach(name => {
            if(projects[name].length > 0 || projectName === name || projectName === 'all') {
                if (period === 'all') {
                    taskCount++;
                    tasks = tasks.concat(projects[name]);
                }
            }
        });
        if (taskCount) {
            return tasks
        } else {
            return tasks
        }
    }

    function displayTask(projectName, period) {
        const taskList = document.createElement('div');
        taskList.classList.add('task-list');
        const introP = document.createElement('p');
        introP.classList.add('intro-heading');
        let tasks = checkForTask(projectName, period);
        if (tasks.length > 0) {
            introP.textContent = 'Some task available';
            taskList.appendChild(introP);
            tasks.forEach(task => {
                const taskComponent = createTaskDisplay(task)
                taskList.appendChild(taskComponent);
            })
        } else {
            introP.textContent =  'Looks like you are free. Add a new task';
            taskList.appendChild(introP);
        }


        return taskList;
    }

    function updateTaskDisplay(projectName, period) {
        const mainContent = document.querySelector('.main-content');
        const taskContainer = document.querySelector('.task-list');

        mainContent.removeChild(taskContainer);
        const tasks = displayTask(projectName, period);
        mainContent.insertBefore(tasks, mainContent.firstElementChild);
    }

    function createTaskDisplay(task) {
        const taskContainer = document.createElement('div');
        taskContainer.classList.add('task-container');
        if (task.priority === 'high') {
            taskContainer.style.borderLeftColor = 'red'
        } else if (task.priority === 'normal') {
            taskContainer.style.borderLeftColor = 'orange';
        } else {
            taskContainer.style.borderLeftColor = 'green';
        }

        const taskHeader = document.createElement('div');
        taskHeader.classList.add('task-header');

        const taskFooter = document.createElement('div')
        taskFooter.classList.add('task-footer');

        const taskTitle = document.createElement('h2');
        taskTitle.classList.add('task-title');
        taskTitle.textContent = task.title;

        const taskProjectName = document.createElement('p')
        taskProjectName.classList.add('task-project-name');
        taskProjectName.textContent = task.projectName;

        taskHeader.appendChild(taskTitle);
        taskHeader.appendChild(taskProjectName);

        const taskDescription = document.createElement('p');
        taskDescription.classList.add('task-description');
        taskDescription.textContent = task.description;

        const taskDueDate = document.createElement('p');
        taskDueDate.classList.add('task-due-date');
        taskDueDate.textContent = `Due: ${task.dueDate}`;

        const iconsContainer = document.createElement('div');
        iconsContainer.classList.add('icons-container');

        ['check_circle' ,'edit', 'delete'].forEach(iconName => {
            const span = document.createElement('span');
            span.classList.add('material-icons-outlined', 'icons', iconName);
            span.textContent = iconName;
            span.setAttribute('data-project', task.projectName);
            span.setAttribute('data-id', task.id);
            span.setAttribute('title', iconName);
            if (iconName === 'check_circle') {
                span.setAttribute('title', 'mark complete')
                if (task.complete) {
                    span.style.color = 'green';
                }
            }
            iconsContainer.appendChild(span);
        });  
        
        taskFooter.appendChild(taskDueDate);
        taskFooter.appendChild(iconsContainer);

        taskContainer.appendChild(taskHeader);
        taskContainer.appendChild(taskDescription);
        taskContainer.appendChild(taskFooter);

        taskContainer.addEventListener('click', (e) => {
            // handle click on icons 
            if (e.target.tagName === 'SPAN') {
                const span = e.target;
                const projectName = span.dataset.project;
                const id = span.dataset.id
                if(span.textContent === 'check_circle') {
                    const status = todoApp.updateStatus(projectName, id);
                    status ? span.style.color = 'green' : span.style.color = 'gray'
                }

                if(span.textContent === 'delete') {
                    todoApp.deleteTask(projectName, id)
                    updateTaskDisplay(projectName, 'all');
                }

                if (span.textContent === 'edit') {
                    // get the task
                    let tasks = todoApp.returnAllProjects()[projectName];
                    let singleTask = tasks.filter(task => task.id === id)[0];
                    let editing = true;
                    const modal = document.querySelector('.modal');
        
                    modal.appendChild(createAddTaskForm(editing, singleTask));
                    modal.style.display = 'block';
                }

            } else {
                taskDescription.classList.toggle('task-description-toggle');
            }

        })

        return taskContainer;
    }

    function listProjects() {
        let projectNames = Object.keys(todoApp.returnAllProjects());

        // build the projects list for the sidebar;
        const projectUl = document.createElement('ul');
        projectUl.classList.add('project-list');

        projectNames.forEach(name => {
            if (name !== 'Default') {
                const li = document.createElement('li');
                const liText = document.createTextNode(name);
                const span  = document.createElement('span');
                span.classList.add('material-icons-outlined');
                span.textContent = 'bookmark';
                li.appendChild(span);
                li.appendChild(liText);
                projectUl.appendChild(li);
            }
        })
        return projectUl;
    }

    function createModal() {
        // a modal to display the form
        const modal = document.createElement('div');
        modal.classList.add('modal');
        modal.addEventListener('click', (e) => {
            if (e.target.classList.contains('modal')) {
                e.target.removeChild(e.target.firstElementChild);
                e.target.style.display = 'none';
            }
        })
        return modal;
    }

    function createAddTaskForm(editing, task) {
        // create form for entering task info used for creating new task and also editing a task
        let projectNames = Object.keys(todoApp.returnAllProjects());

        const modalContent = document.createElement('div');
        modalContent.classList.add('modal-content');

        const form = document.createElement('form');
        form.classList.add('add-task-form');

        // DOM element for title
        const divTitle = document.createElement('div');
        divTitle.classList.add('form-data-container');
        const titleLabel = document.createElement('label');
        titleLabel.htmlFor = 'title';
        titleLabel.textContent = 'Title:';

        const titleInput = document.createElement('input');
        titleInput.type = 'text';
        titleInput.id = 'title';
        titleInput.required
        editing ? titleInput.value =  task.title : titleInput.value = '';

        divTitle.appendChild(titleLabel);
        divTitle.appendChild(titleInput);

        // DOM element for description
        const divDescription = document.createElement('div');
        divDescription.classList.add('form-data-container');
        const descriptionLabel = document.createElement('label');
        descriptionLabel.htmlFor = 'description';
        descriptionLabel.textContent = 'Description:';

        const description = document.createElement('textarea');
        description.id = 'description';
        editing ? description.value = task.description : description.value = '';

        divDescription.appendChild(descriptionLabel);
        divDescription.appendChild(description);

        // DOM element for Save to
        const divSaveTo = document.createElement('div');
        divSaveTo.classList.add('form-data-container');

        const saveToHeading = document.createElement('p');
        saveToHeading.textContent = 'Save to:'

        const saveToRadioBtnGroup = document.createElement('div');
        saveToRadioBtnGroup.classList.add('save-to-radio-btn-group');

        projectNames.forEach(name => {
            const radioInput = document.createElement('input');
            const label = document.createElement('label');
            radioInput.type = 'radio';
            radioInput.id = name;
            radioInput.value = name;
            radioInput.name = 'save_to';

            if (editing) {
                if (name === task.projectName) {
                    radioInput.checked = true
                }
            }

            label.htmlFor = name;
            label.textContent = name;
            saveToRadioBtnGroup.appendChild(radioInput);
            saveToRadioBtnGroup.appendChild(label);
        });

        divSaveTo.appendChild(saveToHeading);
        divSaveTo.appendChild(saveToRadioBtnGroup);

        // DOM element for priority

        const divPriority = document.createElement('div');
        divPriority.classList.add('form-data-container');

        const priorityHeading = document.createElement('p');
        priorityHeading.textContent = 'Priority:'

        const priorityRadioBtnGroup = document.createElement('div');
        priorityRadioBtnGroup.classList.add('priority-radio-btn-group');

        ['high', 'normal', 'low'].forEach(name => {
            const radioInput = document.createElement('input');
            const label = document.createElement('label');
            radioInput.type = 'radio';
            radioInput.id = name;
            radioInput.value = name;
            radioInput.name = 'priority';

            if (editing) {
                if (name === task.priority) {
                    radioInput.checked = true
                }
            }

            label.htmlFor = name;
            label.textContent = name;
            priorityRadioBtnGroup.appendChild(radioInput);
            priorityRadioBtnGroup.appendChild(label);
        });

        divPriority.appendChild(priorityHeading);
        divPriority.appendChild(priorityRadioBtnGroup);

        // DOM element for due date
        const divDueDate = document.createElement('div');
        divDueDate.classList.add('form-data-container');
        const dueDateLabel = document.createElement('label');
        dueDateLabel.htmlFor = 'due-date';
        dueDateLabel.textContent = 'Due Date:';

        const calender = document.createElement('input');
        calender.classList.add('calender-due-date');
        calender.id = 'due-date';
        calender.type = 'date';

        editing ? calender.value = task.dueDate : calender.value = '';

        divDueDate.appendChild(dueDateLabel);
        divDueDate.appendChild(calender);

        // Button Element

        const submitTaskBtn = document.createElement('button');
        submitTaskBtn.classList.add('submit-btn');
        editing ? submitTaskBtn.textContent = 'Save Edit' : submitTaskBtn.textContent = 'Add New Task';

        submitTaskBtn.addEventListener('click', (e) => {
            e.preventDefault();
            handleTaskSubmission(editing, task);
        })

        // append elements to the parent
        form.appendChild(divTitle);
        form.appendChild(divDescription);
        form.appendChild(divSaveTo);
        form.appendChild(divPriority);
        form.appendChild(divDueDate);
        form.appendChild(submitTaskBtn);
        modalContent.appendChild(form);

        return modalContent;
    }

    function createAddProjectForm() {
        const modalContent = document.createElement('div');
        modalContent.classList.add('modal-content');
        const form = document.createElement('form');

        // DOM element for project name
        const projectNameDiv = document.createElement('div');
        projectNameDiv.classList.add('form-data-container');
        const nameLabel = document.createElement('label');
        nameLabel.htmlFor = 'project-name';
        nameLabel.textContent = 'Project Name:';

        const nameInput = document.createElement('input');
        nameInput.type = 'text';
        nameInput.id = 'project-name';

        projectNameDiv.appendChild(nameLabel);
        projectNameDiv.appendChild(nameInput);

        // Button Element

        const submitProjectBtn = document.createElement('button');
        submitProjectBtn.classList.add('submit-btn');
        submitProjectBtn.textContent = 'Add';

        submitProjectBtn.addEventListener('click', (e) => {
            e.preventDefault();
            handleProjectNameSubmission();
        })

        form.appendChild(projectNameDiv);
        form.appendChild(submitProjectBtn);
    
        modalContent.appendChild(form);
        return modalContent;
    }

    function handleProjectNameSubmission() {
        // handles the submission of project name
        const projectName = document.querySelector('#project-name').value;

        if (projectName === '') {
            alert('Enter all field(s)');
            return
        }

        todoApp.createProject(projectName);
        document.querySelector('#project-name').value = '';
        closeModal();

        const projectList = document.querySelector('.project-list');
        const parent = projectList.parentNode;
        const lastChild = parent.lastElementChild;
        parent.removeChild(projectList);
        parent.insertBefore(uiControl.listProjects(), lastChild);
    }

    function handleTaskSubmission(editing, taskObj) {
        // handles the submission of a new task or editing of a task
        const title = document.querySelector('#title').value;
        const description = document.querySelector('#description').value;
        const inputs = document.querySelectorAll('input');
        let dueDate;
        let priority;
        let projectName;
        inputs.forEach(input => {
            if(input.type === 'radio' && input.checked) {
                input.name === 'priority' ? priority = input.value : projectName = input.value;
            }

            if (input.type === 'date') {
                 dueDate = input.value;
            }
        });

        if (title === '' || description === '' || priority == undefined || projectName == undefined || dueDate == '') {
            alert('Enter all field(s)');
            return
        }
        
        if (editing) {
            const editedTask = { title, description, dueDate, priority, projectName }
            todoApp.editTask(taskObj, editedTask);
        } else {
            const task = todoApp.createTask(title, description, dueDate, priority, projectName);
            todoApp.saveTask(task, projectName);
        }
        updateTaskDisplay(projectName, 'all');
        closeModal();
    }

    function closeModal() {
        const modal = document.querySelector('.modal');
        modal.removeChild(modal.firstElementChild);
        modal.style.display = 'none';
    }

    return {
        displayTask,
        listProjects,
        createModal,
        createAddTaskForm,
        createAddProjectForm,
        updateTaskDisplay,
    }
})()

export { todoApp, uiControl };