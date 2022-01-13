// this file will be the application logic

const todoApp = (function () {
    const projects = {
        defaultFolder:  []
    }

    function createTask(title, description, dueDate, priority) {
        return {title, description, dueDate, priority};
    }

    function returnAllProjects() {
        return projects
    }

    function saveTask(task, folderName = 'defaultFolder') {
        projects[folderName].push(task);
    }

    return {
        createTask,
        returnAllProjects,
        saveTask
    }
})()

export { todoApp };