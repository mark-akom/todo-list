import { todoApp } from "../modules/app";
import { uiControl } from "../modules/app";

function createContent() {
    // needed elements and their css classes
    const contentSection = document.createElement('div');
    contentSection.classList.add('content-body');

    const sideBarSection = document.createElement('div');
    sideBarSection.classList.add('app-sidebar');

    const navLinks = document.createElement('ul');
    navLinks.classList.add('nav-links');

    const linkText = ['Home'];

    // creating links for the nav
    linkText.forEach(text => {
        const li = document.createElement('li');
        li.textContent = text;

        li.addEventListener('click', (e) => {
            uiControl.updateTaskDisplay('all', 'all');
        })
        navLinks.appendChild(li);
    });

    // project section for the sidebar
    const projectSection = document.createElement('div');
    projectSection.classList.add('project-section');

    const projectTitle = document.createElement('h2');
    projectTitle.classList.add('project-title');
    projectTitle.textContent = 'Projects';

    const addProjectBtn = document.createElement('button')
    addProjectBtn.classList.add('add-project-btn');
    addProjectBtn.textContent = 'Add Project';

    addProjectBtn.addEventListener('click', () => {
        const modal = document.querySelector('.modal');
        
        modal.appendChild(uiControl.createAddProjectForm());
        modal.style.display = 'block';
    })


    projectSection.appendChild(projectTitle);
    projectSection.appendChild(uiControl.listProjects());
    projectSection.appendChild(addProjectBtn);

    // the main content section
    const mainDiv = document.createElement('div');
    mainDiv.classList.add('main-content');

    const addTaskBtn = document.createElement('button');
    addTaskBtn.classList.add('add-task-btn');
    addTaskBtn.textContent = 'Add A Task';

    addTaskBtn.addEventListener('click', () => {
        const modal = document.querySelector('.modal');
        modal.appendChild(uiControl.createAddTaskForm());
        modal.style.display = 'block';
    });

    mainDiv.appendChild(uiControl.displayTask('default', 'all'));
    mainDiv.appendChild(addTaskBtn);
    mainDiv.appendChild(uiControl.createModal());


    // append the various element to their parents
    sideBarSection.appendChild(navLinks);
    sideBarSection.appendChild(projectSection);
    contentSection.appendChild(sideBarSection);
    contentSection.appendChild(mainDiv);

    return contentSection;
}

export default createContent;