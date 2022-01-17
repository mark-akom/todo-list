import { todoApp } from "./modules/app";
import createTopBar from './UI/navbar';


import './UI/styles.css';

const appBody = document.querySelector('#app-body');


appBody.appendChild(createTopBar());

