import { todoApp } from "../modules/app";

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
        let projectName = prompt('Enter the project name.');
        todoApp.createProject(projectName);
        console.log('clicked');
    })


    projectSection.appendChild(projectTitle);
    projectSection.appendChild(addProjectBtn);


    // append the various element to their parents
    sideBarSection.appendChild(navLinks);
    sideBarSection.appendChild(projectSection);
    contentSection.appendChild(sideBarSection);

    return contentSection;
}

export default createContent;