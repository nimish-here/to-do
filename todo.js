let tasks=[];
const taskList=document.getElementById('list');
const addTaskInput=document.getElementById('add');
const tasksCounter=document.getElementById('tasks-counter');
//console.log("Working");
function  fetchTodos(){
    fetch('https://jsonplaceholder.typicode.com/todos')
    .then(function(response){
        console.log(response);
        return response.json();
    }).then(function(data){
        tasks=data.slice(0,10);
        renderList();
    })
    .catch(function(error){
        console.log(error);
    })

}
function addTaskstoDOM(task){
    const li=document.createElement('li');
    li.innerHTML=` 
    
    
    <input type="checkbox" id="${task.id}" ${task.completed ?'checked':''}
    class="custom-checkbox">
    <label for="${task.id}">${task.title}</label>
    <img src="http://cdn.onlinewebfonts.com/svg/img_513596.png" class="delete" data-id="${task.id}" />
     
    `;
    taskList.append(li);
}
function renderList(){
    taskList.innerHTML='';
    for(let i=0; i<tasks.length;i++)
    {
         addTaskstoDOM(tasks[i]);
    }
    tasksCounter.innerHTML=tasks.length;

}
function addTask(task){
if(task)
{
    tasks.push(task);
    renderList();
    showNotification('Task added successfully');
    return;

}
else{
    showNotification('Task cannot be added');
}
}
function deleteTask(taskId){
const newTasks=tasks.filter(function(task){
    return task.id !== Number(taskId);

})
tasks=newTasks;
renderList();

}
function toggleTask(taskId){
    const task=tasks.filter(function(task){
        return task.id ===Number( taskId);
    
    });
    if(task.length>0)
    {
        const currentTask=task[0];
        currentTask.completed=!currentTask.completed;
        renderList();
        showNotification('Task toggled successfully');
        return


    }
    showNotification('could not toggle the task');

}
function showNotification(text){
    alert(text);

}
function handleInputKeypress(e){
    
    if(e.key=='Enter'){
        const text=e.target.value;
        
        if(!text){
            showNotification('Task text cannot be empty');
            return;
        }
    
    const task={
        title:text,
        id:Date.now(),
        completed:false
    }
    e.target.value='';
    addTask(task);
}

}
function handleClickListener(e){
    const target=e.target;
    if(target.className=='delete'){
        const taskId=target.dataset.id;
        deleteTask(taskId);
         return;

    }else if(target.className=='custom-checkbox'){
        const taskId=target.id;
        toggleTask(taskId);
        return;
    }
}
function initialiseApps(){
    fetchTodos();
addTaskInput.addEventListener('keyup',handleInputKeypress);
document.addEventListener('click',handleClickListener);
}
initialiseApps();