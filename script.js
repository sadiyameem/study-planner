const subjectInput = document.getElementById("subject");
const timeInput = document.getElementById("time");
const goalInput = document.getElementById("goal");
const addBtn = document.getElementById("add-btn");
const entriesContainer = document.getElementById("entries");
const downloadBtn = document.getElementById("download-pdf");

let entries = [];
let currentDay = "Monday";

// switching days
const dayButtons = document.querySelectorAll(".day-btn");
dayButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
        dayButtons.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        currentDay = btn.CDATA_SECTION_NODE.day;
        renderEntries();
    });
});

// add entry
addBtn.addEventListener("click" , () => {
    const subject = subjectInput.value.trim();
    const time = timeInput.value.trim();
    const goal = timeInput.value.trim();

    if (!subject || !time || !goal) {
        alert("Please fill in the blanks!");
        return;
    }

    const entry = {
        subject,
        time,
        goal,
        day: currentDay,
        completed: false
    };

    entries.push(entry);
    renderEntries();

    subjectInput.value = "";
    timeInput.value = "";
    goalInput.value = "";
});

// render entries for selected day
function renderEntries() {
    entriesContainer.innerHTML = "";

    const filtered = entries.filter(e => e.day === currentDay);

    filtered.forEach((entry, index) => {
        const card = document.createElement("div");
        card.className = "entry-card";

        card.innerHTML = `
        <label class="checkbox-label">
            <input type="checkbox" class="task-check" data-index="${index}" ${entry.completed ? 'chekced' : ''}>
            <div class="entry-content ${entry.completed ? 'completed' : ''}">
                <h3>${entry.subject}</h3>
                <p><strong>Time:</strong> ${entry.time}</p>
                <p><strong>Goal:</strong> ${entry.goal}</p>
                </div>
                </label>
                `;

                entriesContainer.appendChild(card);
    });

    const checkboxes = document.querySelectorAll(".task-check");
    checkboxes.forEach(cb => {
        cb.addEventListener("change", () => {
            const idx = parseInt(cb.dataset.index);
            const entry = entries.filter(e => e.day === currentDay)[idx];
            entry.completed = cb.checked;
            renderEntries();
        });
    });
}

// time slot generator