import { todoApp } from "./modules/app";
import createTopBar from './UI/navbar';
import createSideBar from "./UI/sidebar";

import './UI/styles.css';

const appBody = document.querySelector('#app-body');
const contentBody = document.createElement('div');
contentBody.classList.add('content-body');

contentBody.appendChild(createSideBar());

appBody.appendChild(createTopBar());
appBody.appendChild(contentBody);

// console.log(todoApp.returnAllProjects());
// let task = todoApp.createTask('Cook', 'rice and stew', new Date(), 'normal');
// todoApp.saveTask(task);
// console.log(todoApp.returnAllProjects());
// todoApp.changePriority('defaultFolder', '1', 'high');
// console.log(todoApp.returnAllProjects());
// todoApp.deleteTask('defaultFolder', '1');
// console.log(todoApp.returnAllProjects());
