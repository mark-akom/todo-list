// this file will be the application logic

const todoApp = (function () {
    const projects = {
        defaultFolder:  [{a: 'b'}]
    }

    function createTask(title, description, dueDate, priority) {
        const id = new Date().getTime();
        
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
        modal.addEventListener('click', (e) => {
            if (e.target.classList.contains('modal')) {
                e.target.removeChild(e.target.firstElementChild);
                e.target.style.display = 'none';
            }
        })
        return modal;
    }

    function createAddTaskForm() {
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

        divDueDate.appendChild(dueDateLabel);
        divDueDate.appendChild(calender);

        // Button Element

        const submitTaskBtn = document.createElement('button');
        submitTaskBtn.classList.add('submit-btn');
        submitTaskBtn.textContent = 'Add';

        submitTaskBtn.addEventListener('click', (e) => {
            e.preventDefault();
            console.log('added');
            handleTaskSubmission();
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
        const projectName = document.querySelector('#project-name').value;
        todoApp.createProject(projectName);

        const projectList = document.querySelector('.project-list');
        const parent = projectList.parentNode;
        const lastChild = parent.lastElementChild;
        parent.removeChild(projectList);
        parent.insertBefore(uiControl.listProjects(), lastChild);
    }

    function handleTaskSubmission() {
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

        console.log(title, description, dueDate, priority, projectName);
        const task = todoApp.createTask(title, description, dueDate, priority);
        todoApp.saveTask(task, projectName);
    }

    return {
        displayHome,
        listProjects,
        createModal,
        createAddTaskForm,
        createAddProjectForm,
    }
})()

export { todoApp, uiControl };