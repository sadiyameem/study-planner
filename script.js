document.addEventListener("DOMContentLoaded", function () {
    const tasksContainer = document.getElementById("tasks");
    const progressBar = document.getElementById("progressBar");
    const progressText = document.getElementById("progressText");

    function updateProgress() {
        const tasks = document.querySelectorAll(".task");
        const totalTasks = tasks.length;
        const completedTasks = documentSelectorAll(".completed").length;
        const progress = (completedTasks / totalTasks) * 100;

        progressBar.value = progress;
        progressText.textCOntent = `${Math.round(progress)}% complete`;
    }

    function toggleCompletion() {
        this.classList.toggle("completed");
        updateProgress();
    }

    function createTasksElement(taskName) {
        const taskElement = document.createElement("div");
        taskElement.className = "task";
        taskElement.innerHTML = `
        <span>${taskName}</span>
        <input type="checkbox">
        `;
        taskElement.querySelector("input").addEventListener("change", toggleTaskCompletion);

        return taskElement;
    }

    function addTask(taskName) {
        const taskElement = createTaskElement(taskName);
        tasksContainer.appendChild(taskElement);
        updateProgress();
    }

    addTask("Task-1");
    addTask("Task-2");
    addTask("Task-3");
    addTask("Task-4");
    addTask("Task-5");
    addTask("Task-6");
    addTask("Task-7");
    addTask("Task-8");
    addTask("Task-9");
    addTask("Task-10");
})