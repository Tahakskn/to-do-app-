//UI vars 
const form = document.querySelector('form');
const input = document.querySelector('#txtTaskName');
const btnDeleteAll = document.querySelector('#btnDeleteAll');
const taskList = document.querySelector('#task-list');
let items;

//item yükleme
loadItems();

//call event listiners
eventListerners();

//add new item 
function eventListerners(){
    //submit event
    form.addEventListener('submit',addNewItem);

    //delete an item
    taskList.addEventListener('click',deleteItem);

    btnDeleteAll.addEventListener('click',deleteAllItems);
}


function loadItems() {
    items = getItemsFromLS();
    items.forEach(function(item){
    createItem(item);
});
}

function getItemsFromLS(){
    if(localStorage.getItem('items')===null){
        items= [];
    }else {
        items = JSON.parse(localStorage.getItem('items'));
    }
    return items;
}

function setItemToLS(text){
    items = getItemsFromLS();
    items.push(text);
    localStorage.setItem('items',JSON.stringify(items));
}

function deleItemsFromLS(text){
    items = getItemsFromLS();
    items.forEach(function(item,index){
        if(item===text){
        items.splice(index,1);
         }
    });
    localStorage.setItem('items',JSON.stringify(items));
}

function createItem(text){
//create a,li
const li= document.createElement('li');
li.className='list-group-item list-group-item-secondary';
li.appendChild(document.createTextNode(text));

const a = document.createElement('a');
a.classList='delete-item float-right';
a.setAttribute('href','#');
a.innerHTML='<i class="fas fa-times"></i>';
// add a to li 
li.appendChild(a);
    
// add to ul
taskList.appendChild(li);
}

//add new item 
function addNewItem(e){

    if(input.value===''){
        alert('add new item');
    }

        createItem(input.value);

        // LS'ye kaydetme
        setItemToLS(input.value);

        //clear input
        input.value='';
       


   e.preventDefault();

}

//delete
function deleteItem(e){  
    if(e.target.className==='fas fa-times'){
        if(confirm('are u sure ? ')){
       e.target.parentElement.parentElement.remove();
       
       deleItemsFromLS(e.target.parentElement.parentElement.textContent);
    }
}

    e.preventDefault();
}


function deleteAllItems(e) {
    
    if(confirm('are u sure ? ')) {
       while(taskList.firstChild){
        taskList.removeChild(taskList.firstChild);
       }
        localStorage.clear();
    } 
    e.preventDefault();
}