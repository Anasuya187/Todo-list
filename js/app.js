//add an eventListener to the from
const form = document.querySelector('#itemForm'); // select form
const itemInput = document.querySelector('#itemInput'); // select input box from form
const itemList = document.querySelector('.item-list');
const feedback = document.querySelector('.feedback');
const clearButton = document.querySelector('#clear-list');

let todoItems = [];
let editMode = false; // Tracks if we are in edit mode
let editIndex = null; // Stores index of item being edited

const handleItem = function(itemName){

    const items = itemList.querySelectorAll('.item');
 
    items.forEach(function(item){
        
        if(item.querySelector('.item-name').textContent === itemName){
            //complete event listener
            item.querySelector('.complete-item').addEventListener('click', function(){
                item.querySelector('.item-name').classList.toggle('completed');
                this.classList.toggle('visibility');
            });
            // edit event listener
            item.querySelector('.edit-item').addEventListener('click', function(){
                itemInput.value = itemName; // Populate input with the item for editing
                editMode = true; // Set the edit mode to true
                editIndex = todoItems.indexOf(itemName); // Store the index of the item being edited
            });


            // delete event listener
            item.querySelector('.delete-item').addEventListener('click', function(){
                debugger;
                itemList.removeChild(item);

                todoItems = todoItems.filter(function(item){
                    return item !== itemName;
                });

                showFeedback('item delete', 'success');
            })
        }
    })
}
const removeItem = function(item){
    console.log(item);
    const removeIndex = (todoItems.indexOf(item));
    console.log(removeIndex);
    todoItems.splice(removeIndex, 1);
}

const getList = function(todoItems){
    itemList.innerHTML = '';

        todoItems.forEach(function(item){
            itemList.insertAdjacentHTML('beforeend', `<div class="item my-3"><h5 class="item-name text-capitalize">${item}</h5><div class="item-icons"><a href="#" class="complete-item mx-2 item-icon"><i class="far fa-check-circle"></i></a><a href="#" class="edit-item mx-2 item-icon"><i class="far fa-edit"></i></a><a href="#" class="delete-item item-icon"><i class="far fa-times-circle"></i></a></div></div>` );

            handleItem(item);
        });
}

const getLocalStorage = function(){

    const todoStorage = localStorage.getItem('todoItems');
    if (todoStorage === 'undefined' || todoStorage === null){
        todoItems = [];
    } else {
        todoItems = JSON.parse(todoStorage);
        getList(todoItems);
    }
}

const setLocalStorage = function(todoItems){
    localStorage.setItem('todoItems', JSON.stringify(todoItems));
}
// get local storage from page
getLocalStorage();

// Add an item to the list or update an existing item in edit mode
form.addEventListener('submit', function(e){ 
    e.preventDefault();
    const itemName = itemInput.value;
    
    if (itemName.length === 0){
        feedback.innerHTML = 'Please Enter Valid Value';
        feedback.classList.add('showItem', 'alert-danger');
        setTimeout(function(){
            feedback.classList.remove('showItem');
        }, 3000);
    } else {
        if (editMode) {
            // Update existing item in the array
            todoItems[editIndex] = itemName;
            editMode = false; // Exit edit mode after updating
            editIndex = null; // Reset edit index
        } else {
            // Add new item
            todoItems.push(itemName);
        }

        setLocalStorage(todoItems); // Update local storage
        getList(todoItems); // Re-render the updated list
    }
    
    itemInput.value = ''; // Clear input after adding or editing
});


    //clear all items from the list
clearButton.addEventListener('click', function(){
    todoItems = [];
    localStorage.clear();
    getList(todoItems);
})
