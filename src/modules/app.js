// this file will be the application logic

const todoApp = (function () {
    const projects = {
        defaultFolder:  []
    }

    function createTask(title, description, dueDate, priority) {
        const id = new Date().getTime() + '';
        
        return {id, title, description, dueDate, priority};
    }

    function returnAllProjects() {
        return projects
    }

    function saveTask(task, folderName = 'defaultFolder') {
        projects[folderName].push(task);
    }

    // todo - functions for changing status, priority and editing

    return {
        createTask,
        returnAllProjects,
        saveTask
    }
})()

export { todoApp };