import { todoApp } from "./modules/app";

console.log(todoApp.returnAllProjects());
let task = todoApp.createTask('Cook', 'rice and stew', new Date(), 'normal');
todoApp.saveTask(task);
console.log(todoApp.returnAllProjects());