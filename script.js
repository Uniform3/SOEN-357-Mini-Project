/**************************************************
 * GENERAL MODAL HANDLING
 **************************************************/
const closeButtons = document.querySelectorAll('.close-modal');

window.addEventListener('click', (event) => {
  // Close the modal if user clicks outside of it
  if (event.target.classList.contains('modal')) {
    event.target.style.display = 'none';
  }
});

closeButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    // Close whichever modal is open
    btn.closest('.modal').style.display = 'none';
  });
});

/**************************************************
 * MEDICATIONS PAGE
 **************************************************/
const addMedButton = document.getElementById('addMedButton');
const addMedModal = document.getElementById('addMedModal');
const saveMedBtn = document.getElementById('saveMedBtn');
const medList = document.getElementById('medList');

if (addMedButton) {
  addMedButton.addEventListener('click', () => {
    addMedModal.style.display = 'block';
  });
}

if (saveMedBtn) {
  saveMedBtn.addEventListener('click', () => {
    const medName = document.getElementById('medName').value.trim();
    const medDose = document.getElementById('medDose').value.trim();
    const medFreq = document.getElementById('medFreq').value.trim();

    if (medName && medDose && medFreq) {
      const li = document.createElement('li');
      li.textContent = `${medName} (${medDose}) - ${medFreq}`;
      medList.appendChild(li);

      // Clear fields
      document.getElementById('medName').value = '';
      document.getElementById('medDose').value = '';
      document.getElementById('medFreq').value = '';

      // Close modal
      addMedModal.style.display = 'none';
    } else {
      alert('Please fill out all medication fields.');
    }
  });
}

/**************************************************
 * APPOINTMENTS PAGE
 **************************************************/
const addApptButton = document.getElementById('addApptButton');
const calendarModal = document.getElementById('calendarModal');
const calendarGrid = document.getElementById('calendarGrid');
const calendarTitle = document.getElementById('calendarTitle');
const selectedDateDisplay = document.getElementById('selectedDateDisplay');
const selectedDateSpan = document.getElementById('selectedDate');
const timeSlotsDiv = document.getElementById('timeSlots');
const bookApptBtn = document.getElementById('bookApptBtn');
const apptList = document.getElementById('apptList');

// Simple data for available time slots and doctor names
const availableTimeSlots = [
  { time: '09:00 AM', doctor: 'Dr. Brown' },
  { time: '10:00 AM', doctor: 'Dr. Smith' },
  { time: '01:00 PM', doctor: 'Dr. Adams' },
  { time: '03:00 PM', doctor: 'Dr. Lee' },
];

let selectedDay = null;
let selectedTimeSlot = null;

if (addApptButton) {
  addApptButton.addEventListener('click', () => {
    // Open the modal
    calendarModal.style.display = 'block';
    // Build the calendar for the current month
    buildCalendar();
  });
}

/**
 * Build a simple calendar grid for the current month only
 */
function buildCalendar() {
  // Clear old calendar cells
  calendarGrid.innerHTML = '';
  timeSlotsDiv.innerHTML = '';
  selectedDateDisplay.style.display = 'none';
  bookApptBtn.style.display = 'none';
  selectedDay = null;
  selectedTimeSlot = null;

  // Get current date info
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth(); // 0-based
  const firstDayOfMonth = new Date(year, month, 1);
  const lastDayOfMonth = new Date(year, month + 1, 0);
  const monthName = firstDayOfMonth.toLocaleString('default', { month: 'long' });
  calendarTitle.textContent = `Select a Date (${monthName} ${year})`;

  // Generate days for the current month
  const numDays = lastDayOfMonth.getDate();
  for (let day = 1; day <= numDays; day++) {
    const cell = document.createElement('div');
    cell.classList.add('calendar-cell');
    cell.textContent = day;

    cell.addEventListener('click', () => {
      // Deselect previously selected day
      const allCells = document.querySelectorAll('.calendar-cell');
      allCells.forEach(c => c.classList.remove('selected'));

      // Select this cell
      cell.classList.add('selected');
      selectedDay = day;

      // Show available time slots
      showTimeSlots(day, month, year, monthName);
    });

    calendarGrid.appendChild(cell);
  }
}

/**
 * Display time slots for the selected date
 */
function showTimeSlots(day, month, year, monthName) {
  timeSlotsDiv.innerHTML = '';
  selectedTimeSlot = null;
  selectedDateSpan.textContent = `${monthName} ${day}, ${year}`;
  selectedDateDisplay.style.display = 'block';
  bookApptBtn.style.display = 'none'; // Hide until user selects a time slot

  availableTimeSlots.forEach(slot => {
    const slotDiv = document.createElement('div');
    slotDiv.classList.add('time-slot');
    slotDiv.textContent = `${slot.time} - ${slot.doctor}`;

    slotDiv.addEventListener('click', () => {
      // Deselect previously selected times
      const allSlots = document.querySelectorAll('.time-slot');
      allSlots.forEach(s => s.classList.remove('selected'));

      // Select this slot
      slotDiv.classList.add('selected');
      selectedTimeSlot = slot;
      bookApptBtn.style.display = 'inline-block';
    });

    timeSlotsDiv.appendChild(slotDiv);
  });
}

// Handle booking the appointment
if (bookApptBtn) {
  bookApptBtn.addEventListener('click', () => {
    if (selectedDay && selectedTimeSlot) {
      // For proof of concept, simply add to the appointment list
      const today = new Date();
      const year = today.getFullYear();
      const month = today.getMonth(); // For a real app, you'd store the selected month
      const dateObj = new Date(year, month, selectedDay);
      const monthName = dateObj.toLocaleString('default', { month: 'long' });
      const apptText = `${selectedTimeSlot.doctor} - ${monthName} ${selectedDay}, ${year} @ ${selectedTimeSlot.time}`;

      const li = document.createElement('li');
      li.textContent = apptText;
      apptList.appendChild(li);

      alert(`Appointment booked:\n${apptText}`);

      // Close modal
      calendarModal.style.display = 'none';
    } else {
      alert('Please select a day and time slot.');
    }
  });
}

/**************************************************
 * MESSAGES PAGE
 **************************************************/
const newMessageBtn = document.getElementById('newMessageBtn');
const newMsgModal = document.getElementById('newMsgModal');
const sendMsgBtn = document.getElementById('sendMsgBtn');

if (newMessageBtn) {
  newMessageBtn.addEventListener('click', () => {
    newMsgModal.style.display = 'block';
  });
}

if (sendMsgBtn) {
  sendMsgBtn.addEventListener('click', () => {
    const messageBody = document.getElementById('messageBody').value.trim();
    if (messageBody) {
      alert(`Message submitted:\n\n${messageBody}`);
      // Clear the field
      document.getElementById('messageBody').value = '';
      // Close modal
      newMsgModal.style.display = 'none';
    } else {
      alert('Please enter a message.');
    }
  });
}
