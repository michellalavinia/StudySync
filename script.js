// =========================
// STUDYSYNC DATA
// =========================

let tasks = [
  {
    id: 1,
    title: "Complete English Assignment",
    completed: false
  },
  {
    id: 2,
    title: "Study Calculus Chapter 4",
    completed: true
  },
  {
    id: 3,
    title: "Prepare Presentation Slides",
    completed: false
  }
];

let notes = [
  {
    id: 1,
    title: "Calculus Notes",
    content: "Derivatives and integration formulas."
  },
  {
    id: 2,
    title: "Physics Notes",
    content: "Kinematics, dynamics, momentum, and rotational motion."
  }
];

let notifications = [
  {
    id: 1,
    text: "English assignment due tomorrow."
  },
  {
    id: 2,
    text: "Pomodoro session completed."
  },
  {
    id: 3,
    text: "Weekly study goal achieved."
  }
];

const schedule = [
  {
    day: "Monday",
    subject: "Calculus",
    time: "08:00 - 10:00",
    room: "A201"
  },
  {
    day: "Tuesday",
    subject: "Electronics",
    time: "09:00 - 11:00",
    room: "B105"
  },
  {
    day: "Wednesday",
    subject: "Physics",
    time: "11:30 - 13:00",
    room: "C301"
  },
  {
    day: "Thursday",
    subject: "Telecommunications system",
    time: "09:00 - 11:00",
    room: "Lab 2"
  },
  {
    day: "Friday",
    subject: "English",
    time: "07:30 - 09:30",
    room: "D101"
  }
];

// =========================
// SIDEBAR NAVIGATION
// =========================

const navButtons = document.querySelectorAll(".nav-btn");
const sections = document.querySelectorAll(".page-section");
const pageTitle = document.getElementById("pageTitle");

navButtons.forEach(btn => {
  btn.addEventListener("click", () => {

    navButtons.forEach(b =>
      b.classList.remove("active")
    );

    sections.forEach(section =>
      section.classList.remove("active")
    );

    btn.classList.add("active");

    const target =
      btn.dataset.section;

    document
      .getElementById(target)
      .classList.add("active");

    pageTitle.textContent =
      btn.textContent.trim();
  });
});

// =========================
// DARK MODE
// =========================

const themeToggle =
  document.getElementById("themeToggle");

themeToggle.addEventListener("click", () => {

  document.body.classList.toggle("dark");

  localStorage.setItem(
    "theme",
    document.body.classList.contains("dark")
      ? "dark"
      : "light"
  );

});

if (
  localStorage.getItem("theme")
  === "dark"
) {
  document.body.classList.add("dark");
}

// =========================
// SCHEDULE
// =========================

function renderSchedule() {

  const tbody =
    document.getElementById(
      "scheduleTableBody"
    );

  tbody.innerHTML = "";

  schedule.forEach(item => {

    tbody.innerHTML += `
      <tr>
        <td>${item.day}</td>
        <td>${item.subject}</td>
        <td>${item.time}</td>
        <td>${item.room}</td>
      </tr>
    `;

  });
}

// =========================
// TASKS
// =========================

function renderTasks() {

  const taskList =
    document.getElementById("taskList");

  taskList.innerHTML = "";

  tasks.forEach(task => {

    taskList.innerHTML += `
      <div class="task-item">

        <div class="task-left">

          <input
            type="checkbox"
            ${task.completed ? "checked" : ""}
            onchange="toggleTask(${task.id})"
          >

          <span class="
            task-title
            ${task.completed ? 'task-completed' : ''}
          ">
            ${task.title}
          </span>

        </div>

        <button onclick="deleteTask(${task.id})">
          Delete
        </button>

      </div>
    `;

  });

  updateDashboard();
}

function toggleTask(id) {

  tasks = tasks.map(task =>
    task.id === id
      ? {
          ...task,
          completed: !task.completed
        }
      : task
  );

  renderTasks();
}

function deleteTask(id) {

  tasks =
    tasks.filter(
      task => task.id !== id
    );

  renderTasks();
}

document
  .getElementById("addTaskBtn")
  .addEventListener("click", () => {

    const title =
      prompt("Task title:");

    if (!title) return;

    tasks.push({
      id: Date.now(),
      title,
      completed: false
    });

    renderTasks();
});

// =========================
// NOTES
// =========================

function renderNotes() {

  const notesGrid =
    document.getElementById("notesGrid");

  notesGrid.innerHTML = "";

  notes.forEach(note => {

    notesGrid.innerHTML += `
      <div class="note-card">

        <h3>${note.title}</h3>

        <p>${note.content}</p>

        <br>

        <button
          onclick="deleteNote(${note.id})"
        >
          Delete
        </button>

      </div>
    `;

  });

  document.getElementById(
    "profileNotes"
  ).textContent = notes.length;
}

function deleteNote(id) {

  notes =
    notes.filter(
      note => note.id !== id
    );

  renderNotes();
}

document
  .getElementById("addNoteBtn")
  .addEventListener("click", () => {

    const title =
      prompt("Note title:");

    if (!title) return;

    const content =
      prompt("Note content:");

    notes.push({
      id: Date.now(),
      title,
      content
    });

    renderNotes();
});

// =========================
// NOTIFICATIONS
// =========================

function renderNotifications() {

  const container =
    document.getElementById(
      "notificationList"
    );

  container.innerHTML = "";

  notifications.forEach(item => {

    container.innerHTML += `
      <div class="notification-item">
        ${item.text}
      </div>
    `;

  });
}

// =========================
// PROFILE + DASHBOARD
// =========================

function updateDashboard() {

  const total =
    tasks.length;

  const completed =
    tasks.filter(
      task => task.completed
    ).length;

  const productivity =
    total === 0
      ? 0
      : Math.round(
          completed / total * 100
        );

  document.getElementById(
    "totalTasks"
  ).textContent = total;

  document.getElementById(
    "completedTasks"
  ).textContent = completed;

  document.getElementById(
    "productivity"
  ).textContent =
    productivity + "%";

  document.getElementById(
    "profileTasks"
  ).textContent = total;
}

// =========================
// POMODORO
// =========================

let timer;
let timeLeft = 1500;
let running = false;

const timerDisplay =
  document.getElementById(
    "timerDisplay"
  );

function updateTimerDisplay() {

  const minutes =
    Math.floor(timeLeft / 60);

  const seconds =
    timeLeft % 60;

  timerDisplay.textContent =
    `${String(minutes).padStart(2,"0")}:${String(seconds).padStart(2,"0")}`;
}

document
  .getElementById("startTimer")
  .addEventListener("click", () => {

    if (running) return;

    running = true;

    timer = setInterval(() => {

      if (timeLeft <= 0) {

        clearInterval(timer);

        running = false;

        alert(
          "Pomodoro Session Complete!"
        );

        notifications.unshift({
          id: Date.now(),
          text:
            "Pomodoro session completed."
        });

        renderNotifications();

        return;
      }

      timeLeft--;

      updateTimerDisplay();

    }, 1000);

  });

document
  .getElementById("pauseTimer")
  .addEventListener("click", () => {

    running = false;

    clearInterval(timer);

  });

document
  .getElementById("resetTimer")
  .addEventListener("click", () => {

    clearInterval(timer);

    running = false;

    timeLeft = 1500;

    updateTimerDisplay();

  });

// =========================
// CHART.JS
// =========================

function createCharts() {

  new Chart(
    document.getElementById(
      "progressChart"
    ),
    {
      type: "line",
      data: {
        labels: [
          "Mon",
          "Tue",
          "Wed",
          "Thu",
          "Fri",
          "Sat",
          "Sun"
        ],
        datasets: [{
          label: "Study Hours",
          data: [2,4,3,5,6,4,7],
          borderWidth: 2,
          tension: .4
        }]
      }
    }
  );

  new Chart(
    document.getElementById(
      "analyticsChart"
    ),
    {
      type: "bar",
      data: {
        labels: [
          "Physics",
          "Calculus",
          "English",
          "Electronics"
        ],
        datasets: [{
          label: "Hours",
          data: [12,8,6,15]
        }]
      }
    }
  );

}

// =========================
// STUDY PLANNER
// =========================

const studyPlan = [
  {
    subject: "Physics",
    target: "Complete Chapter 5",
    progress: 75
  },
  {
    subject: "Calculus",
    target: "Practice Integrals",
    progress: 50
  },
  {
    subject: "Electronics",
    target: "Solve DC Circuit Problems",
    progress: 90
  }
];

function renderPlanner() {

  const container =
    document.getElementById(
      "plannerContainer"
    );

  container.innerHTML = "";

  studyPlan.forEach(plan => {

    container.innerHTML += `
      <div class="planner-card">

        <h3>${plan.subject}</h3>

        <p>
          Target:
          ${plan.target}
        </p>

        <div class="progress-bar">

          <div
            class="progress-fill"
            style="
              width:${plan.progress}%;
            "
          ></div>

        </div>

        <span>
          ${plan.progress}%
          Complete
        </span>

      </div>
    `;

  });

}

// =========================
// INIT
// =========================

renderSchedule();
renderTasks();
renderNotes();
renderPlanner();
renderNotifications();
updateDashboard();
updateTimerDisplay();
createCharts();

document.getElementById(
  "studyHours"
).textContent = 45;

document.getElementById(
  "profileHours"
).textContent = 45;

