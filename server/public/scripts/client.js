$(document).ready(docReady);

function docReady(){
    // on load, display list of to-do's
    fetchTask();
    // Allow a user to create a Task
    $('#addTaskButton').on('click', handleAddTask);
    // Delete task from database
    $('#taskListOut').on('click', '.deleteTaskButton', handleDeleteTask);
    // change styles state when marked complete
    $('#taskListOut').on('click', '.check', checkStatus);

} // end docReady


function handleAddTask(){
    console.log('add Task clicked');
    // Get input field values
    let taskIn = {
        taskDescription: $('#taskDescription').val(),
        completeStatus: false
    }
    console.log('taskIn', taskIn);
    // Save taskIn to server
    saveTask(taskIn);
    // clear task input field
    $('#taskDescription').val('');
} // end handleAddTask


function saveTask(taskToBeSaved){
    console.log('saving task:', taskToBeSaved);
    $.ajax({
        method: "POST",
        url: '/task',
        data: taskToBeSaved
    }).then( function(){
        console.log('back from POST');
        // Fetch updated tasks from /task
        fetchTask();
    }).catch(function (error) {
        alert('POST to /task failed', error);
    });
} // end saveTask


function fetchTask(){
    console.log('in fetchTask');
    $.ajax({
        method: 'GET',
        url: '/task'
    }).then(function (response) {
        console.log('getting tasks', response);
        // show recently added task with previous tasks
        displayTask(response);
        // check if complete status is checked
    }).catch(function (error) {
        alert('GET request from /task failed', error);
    });
} // end fetchTask


function displayTask(tasksToDisplay){
    console.log('in displayTask');
    // empty task output
    $('#taskListOut').empty();
    // display each task description in a card on DOM
    tasksToDisplay.forEach(task => {
        //console.log('task', task);
        let newTask = $(`
            <li class="list-group-item">
                <div class="row">
                    <div class="col">
                        <input type="checkbox" class="check" data-id="${task.id}">
                    </div>
                    <div class="col-sm-10">
                        <p>${task.taskDescription}</p>
                    </div>
                    <div class="col flush-right">
                        <button class="deleteTaskButton" data-id="${task.id}"><span><i class="fas fa-trash"></i></span></button>
                    </div>
                </div>
            </li>
            `);
        $('#taskListOut').append(newTask);
        newTask.data('id', task.id);

    });
} // end displayTask


function handleDeleteTask(){
    console.log('in handleDeleteTask');
    // confirm with user yes/no option when delete is clicked
    let confirmClick = confirm('Are you sure you want to delete this task?');
    if (confirmClick === true) {
        console.log('you clicked ok');
        // Target selected task id
        let selectedTaskId = $(this).data().id;
        // Remove task from database-- > deleteTask()
        $.ajax({
            method: "DELETE",
            url: `/task/${selectedTaskId}`,
        }).then(function () {
            // get updated task and display on DOM
            fetchTask();
        }).catch(function (error) {
            alert('DELETE request failed', error);
        });
    } else {
        console.log('you clicked cancel');
        
    };
    
} // end handleDeleteTask


function checkStatus(){
    console.log('in checkStatus');
    let status = false;
    // check if checkbox is checked
    if (this.checked) {
        console.log('checkbox is checked');
        // change background to mark if task is complete
        $(this).closest('li').css({"background-color": "#FEE777", "opacity": ".5"});
        $(this).closest('li').find('p').css({"text-decoration": "line-through"});
        status = true;
    } else {
        console.log('checkbox is unchecked');
        $(this).closest('li').css({ "background-color": "white", "opacity": "100" });
        $(this).closest('li').find('p').css('text-decoration', 'none');
        status = false;
    };
    console.log('status', status);
    // update status to server
    $.ajax({
        method: 'PUT',
        url: '/task/' + $(this).data().id,
        data: {
            completeStatus: status
        }
    }).then( function() {
        console.log('back from PUT request');
    }).catch( function(error) {
        alert('PUT request failed', error);
    });
} // end checkStatus
