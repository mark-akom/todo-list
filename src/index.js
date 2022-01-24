import createTopBar from './UI/navbar';
import createContent from "./UI/content";

import './UI/styles.css';

const appBody = document.querySelector('#app-body');


appBody.appendChild(createTopBar());
appBody.appendChild(createContent());
