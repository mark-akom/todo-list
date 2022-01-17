// this file will be the application logic

const todoApp = (function () {
    const projects = {
        defaultFolder:  [{a: 'n'}]
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

export { todoApp };