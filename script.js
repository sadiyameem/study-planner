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
const startTimeInput = document.getElementById("start-time");
const durationInput = document.getElementById("duration");
const generateSlotBtn = document.getElementById("generate-slot");

generateSlotBtn.addEventListener("click", () => {
    const startTime = startTimeInput.value;
    const duration = parseInt(durationInput.value);

    if (!startTime || isNaN(duration)) {
        alert("Please select both a start time and duration");
        return;
    }

    const [hours, minutes] = startTime.split(":").map(Number);
    const startDate = new Date();
    startDate.setHours(hours);
    startDate.setMinutes(minutes);

    const endDate = new Date(startDate.getTime() + duration * 60000);

    const formatTime = (date) =>
        date.toLocalTimeString({}, {hour: "2-digit", minute: "2-digit"});

    const timeSlot = `${formatTime(startDate)} - ${formateTime(endDate)}`;
    timeInput.value = timeSlot;
});

// download weekly timetable as pdf
downloadBtn.addEventListener("click", () => {
    const groupedEntries = groupEntriesByDay();

    let content = `
    <div style="padding: 1rem; font-family: 'Segoe UI', sans-serif;">
    <h1 style="text-align: center; color: #7b4ca0;">Weekly Study Timetable</h1>
    `;

    for (const day of Object.keys(groupedEntries)) {
        const dayEntries = groupedEntries[day];

        content += `<h2 style="color: #5f3d90; margin-top: 1rem;">${day}</h2>`;
        if(dayEntries.length === 0) {
            content += `<p>No entries.</p>`;
        } else {
            dayEntries.forEach(entry => {
                content += `
                <div style="background: #f8f1fa; padding: 10px; margin: 8px 0; border-left: 4px solid #a074c4; border-radius: 8px;">
                    <strong>Subject:</strong> ${entry.subject}<br/>
                    <strong>Time:</strong> ${entry.time}<br/>
                    <strong>Goal:</strong> ${entry.goal}
                    </div>
                    `;
            });
        }
    }

    content += `</div>`;

    const opt = {
        margin: 0.5,
        filename: 'Weekly_Timetable.pdf',
        image: {type: 'jpeg', quality: 0.98},
        html2canvas: {scale:2},
        jsPDF: {unit: 'in', format: 'a4', orientation: 'portrait'}
    };

    html2PDF().from(content).set(opt).save();
});

// group entries by day
function groupEntriesByDay() {
    const grouped = {
        Monday: [],
        Tuesday: [],
        Wednesday: [],
        Thursday: [],
        Friday: [],
        Saturday: [],
        Sunday: [],
    };

    entries.forEach(entry => {
        grouped[entry.day].push(entry);
    });

    return grouped;
}