import { todoApp } from "./modules/app";
import createTopBar from './UI/navbar';

const appBody = document.querySelector('#app-body');

appBody.appendChild(createTopBar());

// console.log(todoApp.returnAllProjects());
// let task = todoApp.createTask('Cook', 'rice and stew', new Date(), 'normal');
// todoApp.saveTask(task);
// console.log(todoApp.returnAllProjects());
// todoApp.changePriority('defaultFolder', '1', 'high');
// console.log(todoApp.returnAllProjects());
// todoApp.deleteTask('defaultFolder', '1');
// console.log(todoApp.returnAllProjects());
