(()=>{"use strict";const e=function(){const e={defaultFolder:[]};return{createTask:function(e,t,r,n){return{title:e,description:t,dueDate:r,priority:n}},returnAllProjects:function(){return e},saveTask:function(t,r="defaultFolder"){e[r].push(t)}}}();console.log(e.returnAllProjects());let t=e.createTask("Cook","rice and stew",new Date,"normal");e.saveTask(t),console.log(e.returnAllProjects())})();