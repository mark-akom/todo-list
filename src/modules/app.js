// this file will be the application logic

const todoApp = (function () {
    const projects = {
        defaultFolder:  [{a: 'b'}]
    }

    function createTask(title, description, dueDate, priority) {
        const id = '1';
        
        return {
            id,
            title,
            description,
            dueDate,
            priority,
            complete: false,
        }
    }

    function returnAllProjects() {
        return projects
    }

    function saveTask(task, projectName = 'defaultFolder') {
        projects[projectName].push(task);
    }

    // todo - functions for changing status, priority and editing

    function createProject(name) {
        projects[name] = []
        console.log(projects);
    }

    function updateStatus(projectName, taskId) {
        const project = projects[projectName];
        let task = project.filter(item => item.id === taskId)[0];
        task.complete = !(task.complete);
    }

    function changePriority(projectName, taskId, priority) {
        const project = projects[projectName];
        let task = project.filter(item => item.id === taskId)[0];
        task.priority = priority;
    }

    function deleteTask(projectName, taskId) {
        let project = projects[projectName];
        projects[projectName] = project.filter(item => item.id !== taskId);   
        console.log(project);
    }

    return {
        createTask,
        returnAllProjects,
        saveTask,
        updateStatus,
        changePriority,
        deleteTask,
        createProject,
    }
})()

const uiControl = (function() {
    function checkForTask() {
        const projects = todoApp.returnAllProjects();
        const projectNames = Object.keys(projects);
        let taskCount = 0;
        projectNames.forEach(name => {
            if(projects[name].length > 0) {
                taskCount++;
            }
        });
        return taskCount;
    }

    function displayHome() {
        const introP = document.createElement('p');
        let taskCount = checkForTask();
        if (taskCount > 0) {
            introP.textContent = 'Some task available';
        } else {
            introP.textContent =  'Looks like you are free. Add a new task';
        }

        return introP;
    }

    function listProjects() {
        let projectNames = Object.keys(todoApp.returnAllProjects());

        // build the projects list for the sidebar;
        const projectUl = document.createElement('ul');
        projectUl.classList.add('project-list');

        projectNames.forEach(name => {
            if (name !== 'defaultFolder') {
                const li = document.createElement('li');
                li.textContent = name;
                projectUl.appendChild(li);
            }
        })
        return projectUl;
    }

    function createModal() {
        const modal = document.createElement('div');
        modal.classList.add('modal');
        modal.addEventListener('click', () => {
            modal.removeChild(modal.firstElementChild);
            modal.style.display = 'none';
        })
        return modal;
    }

    function createAddTaskForm() {
        let projectNames = Object.keys(todoApp.returnAllProjects());

        const modalContent = document.createElement('div');
        modalContent.classList.add('modal-content');

        const form = document.createElement('form');
        form.classList.add('add-task-form');

        const titleInput = document.createElement('input');
        titleInput.type = 'text';

        const description = document.createElement('textarea');

        const saveToHeading = document.createElement('p');
        saveToHeading.textContent = 'Save to:'

        const saveToRadioBtnGroup = document.createElement('div');
        saveToHeading.classList.add('save-to-radio-btn-group');

        projectNames.forEach(name => {
            const radioInput = document.createElement('input');
            const label = document.createElement('label');
            radioInput.type = 'radio';
            radioInput.id = name;
            radioInput.value = name;
            radioInput.name = 'save_to';

            label.htmlFor = name;
            label.textContent = name;
            saveToRadioBtnGroup.appendChild(radioInput);
            saveToRadioBtnGroup.appendChild(label);
        });

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

            label.htmlFor = name;
            label.textContent = name;
            priorityRadioBtnGroup.appendChild(radioInput);
            priorityRadioBtnGroup.appendChild(label);
        })

        const calender = document.createElement('input');
        calender.classList.add('calender-due-date');
        calender.type = 'date';

        // append elements to the parent
        form.appendChild(titleInput);
        form.appendChild(description);
        form.appendChild(saveToHeading);
        form.appendChild(saveToRadioBtnGroup);
        form.appendChild(priorityHeading);
        form.appendChild(priorityRadioBtnGroup);
        form.appendChild(calender);
        modalContent.appendChild(form);

        return modalContent;
    }

    return {
        displayHome,
        listProjects,
        createModal,
        createAddTaskForm,
    }
})()

export { todoApp, uiControl };