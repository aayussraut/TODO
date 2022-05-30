const taskIDOM = document.querySelector(".task-edit-id");
const taskNameDOM = document.querySelector(".task-edit-name");
const taskCompletedDOM = document.querySelector(".task-edit-completed");
const editFormDOM = document.querySelector(".single-task-form");
const editBtnDOM = document.querySelector(".task-edit-btn");
const formAlertDOM = document.querySelector(".form-alert");
const params = window.location.search;
const id = new URLSearchParams(params).get("id");
let tempName;

const showTasks = async () => {
  try {
    await axios.get(`/api/tasks/${id}`).then((response)=>{
      const task=response.data;
      const { _id: taskID, completed, name } = task;
      taskIDOM.value = taskID;
      taskNameDOM.value = name;
      if (completed) {
        taskCompletedDOM.checked = true;
      }
    })
    
  } catch (err) {
    console.log(err);
  }
};

showTasks();

editFormDOM.addEventListener("submit", async (e) => {
  editBtnDOM.textContent = "Loading...";
  e.preventDefault();
  try {
     await axios.patch(`/api/tasks/${id}`, {
      name: taskNameDOM.value,
      completed: taskCompletedDOM.checked,
    }).then((response)=>{
      const task=response.data;
      const { _id: TaskID, completed, name } = task;
      taskIDOM.textContent = TaskID;
      taskNameDOM.value = name;
      tempName = name;
      if (completed) {
        taskCompletedDOM.checked = true;
      }
      formAlertDOM.style.display = "block";
      formAlertDOM.textContent = `Success, task updated`;
      formAlertDOM.classList.add('text-success')
    });

    
  } catch (err) {
    console.log(err);
    taskNameDOM.value = tempName;
    formAlertDOM.style.display = "block";
    formAlertDOM.innerHTML = `error, please try again`;
  }
  editBtnDOM.textContent = "Edit";
  setTimeout(() => {
    formAlertDOM.style.display = 'none'
    formAlertDOM.classList.remove('text-success')
  }, 3000)
});
