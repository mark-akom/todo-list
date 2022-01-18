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

    return {
        displayHome,
        listProjects,
    }
})()

export { todoApp, uiControl };