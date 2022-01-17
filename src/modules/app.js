// this file will be the application logic

const todoApp = (function () {
    const projects = {
        defaultFolder:  []
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
    }
})()

const uiControl = (function() {
    function displayTask() {
        const projects = todoApp.returnAllProjects();
        const projectNames = Object.keys(projects);
        let taskCount = 0;
        projectNames.forEach(name => {
            if(projects[name].length > 0) {
                taskCount++;
            }
        });

        if (taskCount > 0) {
            return 'Some task available';
        } else {
            return 'Looks like you are free. Add a new task';
        }
    }

    return {
        displayTask,
    }
})()

export { todoApp, uiControl };