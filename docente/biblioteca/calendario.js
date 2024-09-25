document.addEventListener("DOMContentLoaded", function () {
  const calendarDays = document.getElementById("calendar-days");
  const addEventBtn = document.getElementById("add-event-btn");
  const eventModal = document.getElementById("event-modal");
  const closeModalBtn = document.getElementById("close-modal-btn");
  const saveEventBtn = document.getElementById("save-event-btn");
  const eventTitleInput = document.getElementById("event-title");
  const eventDateInput = document.getElementById("event-date");
  const eventStartTimeInput = document.getElementById("event-start-time");
  const eventEndTimeInput = document.getElementById("event-end-time");
  const eventList = document.getElementById("event-list");
  const monthYearDisplay = document.getElementById("month-year");

  let events = JSON.parse(localStorage.getItem('events')) || [];
  let currentDate = new Date();

  function renderCalendar() {
      const month = currentDate.getMonth();
      const year = currentDate.getFullYear();

      // Actualizar encabezado con mes y año
      monthYearDisplay.textContent = `${currentDate.toLocaleString('es-ES', { month: 'long' })} ${year}`;
      calendarDays.innerHTML = '';

      // Obtener el primer día del mes
      const firstDay = new Date(year, month, 1).getDay();
      const lastDate = new Date(year, month + 1, 0).getDate();

      // Rellenar días vacíos antes del 1 del mes
      for (let i = 0; i < firstDay; i++) {
          const blankDay = document.createElement("div");
          blankDay.classList.add("day");
          calendarDays.appendChild(blankDay);
      }

      // Rellenar los días del mes
      for (let i = 1; i <= lastDate; i++) {
          const dayElement = document.createElement("div");
          dayElement.classList.add("day");
          dayElement.textContent = i;

          // Resaltar día actual
          if (i === currentDate.getDate() && month === new Date().getMonth() && year === new Date().getFullYear()) {
              dayElement.classList.add("current-day");
          }

          // Resaltar días con eventos
          const eventForDay = events.find(event => event.date === `${year}-${String(month + 1).padStart(2, '0')}-${String(i).padStart(2, '0')}`);
          if (eventForDay) {
              dayElement.classList.add("event-day");
          }

          calendarDays.appendChild(dayElement);
      }

      renderEventList();
  }

  function renderEventList() {
      eventList.innerHTML = '';
      events.forEach(event => {
          const eventItem = document.createElement("li");
          eventItem.classList.add("event-item");
          eventItem.innerHTML = `${event.date} ${event.startTime} - ${event.endTime}: ${event.title}`;

          const deleteBtn = document.createElement("button");
          deleteBtn.classList.add("delete-btn");
          deleteBtn.textContent = "Eliminar";
          deleteBtn.onclick = function () {
              events = events.filter(e => e !== event);
              localStorage.setItem('events', JSON.stringify(events));
              renderCalendar();
          };

          eventItem.appendChild(deleteBtn);
          eventList.appendChild(eventItem);
      });
  }

  addEventBtn.addEventListener("click", () => {
      eventModal.style.display = "flex";
  });

  closeModalBtn.addEventListener("click", () => {
      eventModal.style.display = "none";
  });

  saveEventBtn.addEventListener("click", () => {
      const eventTitle = eventTitleInput.value;
      const eventDate = eventDateInput.value;
      const startTime = eventStartTimeInput.value;
      const endTime = eventEndTimeInput.value;

      if (eventTitle && eventDate && startTime && endTime) {
          events.push({
              title: eventTitle,
              date: eventDate,
              startTime: startTime,
              endTime: endTime
          });
          localStorage.setItem('events', JSON.stringify(events));
          eventTitleInput.value = '';
          eventDateInput.value = '';
          eventStartTimeInput.value = '';
          eventEndTimeInput.value = '';
          eventModal.style.display = "none";
          renderCalendar();
      }
  });

  function updateCurrentDate() {
      const now = new Date();
      if (now.getDate() !== currentDate.getDate() || now.getMonth() !== currentDate.getMonth() || now.getFullYear() !== currentDate.getFullYear()) {
          currentDate = now;
          renderCalendar();
      }
  }

  // Actualizar automáticamente el calendario al pasar al siguiente día
  setInterval(updateCurrentDate, 1000 * 60 * 60); // Verificar cada hora

  renderCalendar();
});
