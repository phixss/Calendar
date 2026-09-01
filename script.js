document.addEventListener('DOMContentLoaded', function() {
    const monthYearEl = document.getElementById('month-year');
    const daysEl = document.getElementById('days');
    const prevMonthBtn = document.getElementById('prev-month');
    const nextMonthBtn = document.getElementById('next-month');
    const todayBtn = document.getElementById('today-btn');
    const eventPanel = document.getElementById('event-panel');
    const eventDateEl = document.getElementById('event-date');
    const eventListEl = document.getElementById('event-list');

    let currentDate = new Date();
    let selectedDate = null;

    const events = {
        '2026-6-8': [{time: '', text: 'Term 1: Teachers Contract Signing/Awarding of Load'}],
        '2026-6-9': [{time: '1st day', text: 'Orientation: Parents, Guardians, Learners, Distributions of Learning Materials'}],
        '2026-6-11': [{time: '3rd day', text: 'Orientation: Parents, Guardians, Learners, Distributions of Learning Materials'}],
        '2026-6-12': [{time: 'Regular Holiday', text: 'Independence Day'}],
        '2026-7-15': [{time: 'Term 1', text: 'First Summative Test'}],
        '2026-8-6': [{time: 'Term 1', text: 'Second Summative Test'}],
        '2026-8-20': [{time: '', text: 'Teachers General meeting (preparation for Term 1 Exams)'}],
        '2026-8-31': [{time: 'Regular Holiday', text: 'National Heroes Day'}],
        '2026-9-1': [{time: 'Term 1', text: 'Examination'}],
        '2026-9-3': [{time: 'Term 1', text: 'Examination'}],
        '2026-9-3': [{time: 'Term 1', text: 'Examination'}],
    };

    function renderCalendar() {
        const firstDay = new Date(
            currentDate.getFullYear(),
            currentDate.getMonth(),
            1
        );

        const lastDay = new Date(
            currentDate.getFullYear(),
            currentDate.getMonth() + 1,
            0
        );

        const prevLastDay = new Date(
            currentDate.getFullYear(),
            currentDate.getMonth(),
            0
        );

        const firstDayIndex = firstDay.getDay();
        const lastDayIndex = lastDay.getDay();
        const nextDays = 7 - lastDayIndex - 1;

        const months = [
            "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"
        ];

        monthYearEl.innerHTML = `${months[currentDate.getMonth()]} ${currentDate.getFullYear()}`;

        let days ="";

        for (let x = firstDayIndex; x > 0; x--) {
            const prevDate = prevLastDay.getDate() - x + 1;
            const dateKey = `${currentDate.getFullYear()}-${currentDate.getMonth()}-${prevDate}`;
            const hasEvent = events[dateKey] !== undefined;

            days +=  `<div class="day other-month${hasEvent ? 'has-events' : ''}">${prevDate}</div>`;
        }

        for (let i = 1; i <= lastDay.getDate(); i++) {
            const date = new Date(
                currentDate.getFullYear(),
                currentDate.getMonth(),
                i
            );

            const dateKey = `${currentDate.getFullYear()}-${currentDate.getMonth() +1}-${i}`;
            const hasEvent = events[dateKey] !== undefined;

            let dayClass = 'day';

            if (
                date.getDate() === new Date().getDate() &&
                date.getMonth() === new Date().getMonth() &&
                date.getFullYear() === new Date().getFullYear()
            ) {
                dayClass += ' today';
            }

            if (
                selectedDate &&
                date.getDate() === selectedDate.getDate() &&
                date.getMonth() === selectedDate.getMonth() &&
                date.getFullYear() === selectedDate.getFullYear()
            ) {
                dayClass += ' selected';
            }

            if (hasEvent) {
                dayClass += ' has-events';
            }

            days += `<div class="${dayClass}" data-date="${dateKey}">${i}</div>`;
        }

        for (let j = 1; j <= nextDays; j++) {
            const dateKey = `${currentDate.getFullYear()}-${currentDate.getMonth() + 2}-${j}`;
            const hasEvent = events[dateKey] !== undefined;

            days += `<div class="day other-month${hasEvent ? 'has-events' : ''}">${j}</div>`;
        }

        daysEl.innerHTML = days;

        document.querySelectorAll('.day:not(.other-month)').forEach(day => {
            day.addEventListener('click', () => {
                const dateStr = day.getAttribute('data-date');
                const [year, month, dayNum] = dateStr.split('-').map(Number);
                selectedDate = new Date(year, month - 1, dayNum);
                renderCalendar();
                showEvents(dateStr);
            });
        });
    }

    function showEvents(dateStr) {
        const [year,month, day] = dateStr.split('-').map(Number);
        const dateObj = new Date(year, month - 1, day);
        const months = [
            "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"
        ];

        const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        const dayName = dayNames[dateObj.getDay()];

        eventDateEl.textContent = `${dayName}, ${months[dateObj.getMonth()]} ${day}, ${year}`;

        eventListEl.innerHTML = '';

        if (events[dateStr]) {
            events[dateStr].forEach(event => {
                const eventItem = document.createElement('div');
                eventItem.className = 'event-item';
                eventItem.innerHTML = `
                    <div class="event-color"></div>
                    <div class="event-time">${event.time}</div>
                    <div class="event-text">${event.text}</div>
                `;
                eventListEl.appendChild(eventItem);
            });
        } else {
            eventListEl.innerHTML = '<div class="no-events">Select a date with events to view them here.</div>';
        }
    }

    prevMonthBtn.addEventListener('click', () => {
        currentDate.setMonth(currentDate.getMonth() - 1);
        renderCalendar();
        eventDateEl.textContent = 'Select a date';
        eventListEl.innerHTML = '<div class="no-events">Select a date with events to view them here.</div>';
    });

    nextMonthBtn.addEventListener('click', () => {
        currentDate.setMonth(currentDate.getMonth() + 1);
        renderCalendar();
        eventDateEl.textContent = 'Select a date';
        eventListEl.innerHTML = '<div class="no-events">Select a date with events to view them here.</div>';
    });

    todayBtn.addEventListener('click', () => {
        currentDate = new Date();
        selectedDate = new Date();
        renderCalendar();

        const dateStr = `${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-${currentDate.getDate()}`;
        showEvents(dateStr);
    });

    renderCalendar();
});


document.addEventListener('DOMContentLoaded', function() {
    const monthYearEl = document.getElementById('month-year2');
    const daysEl = document.getElementById('days2');
    const prevMonthBtn = document.getElementById('prev-month2');
    const nextMonthBtn = document.getElementById('next-month2');
    const todayBtn = document.getElementById('today-btn2');
    const eventPanel = document.getElementById('event-panel2');
    const eventDateEl = document.getElementById('event-date2');
    const eventListEl = document.getElementById('event-list2');

    let currentDate = new Date();
    let selectedDate = null;

    const events = {
        '2026-8-26': [
            {time: '10:00 AM', text: 'Team meeting'},
            {time: '2:00 PM', text: 'project'}
        ],
        '2026-8-30': [
            {time: '10:00 AM', text: 'Team meeting'}
        ],
        '2026-9-01': [
            {time: '10:00 AM', text: 'Team meeting'},
            {time: '2:00 PM', text: 'project'}
        ],
        '2026-9-12': [
            {time: '10:00 AM', text: 'Team meeting'}
        ],
        '2026-9-13': [
            {time: 'All day', text: 'Team meeting'}
        ],
        '2026-9-17': [
            {time: '10:00 AM', text: 'Team meeting'},
            {time: '2:00 PM', text: 'project'}
        ]
    };

    function renderCalendar() {
        const firstDay = new Date(
            currentDate.getFullYear(),
            currentDate.getMonth(),
            1
        );

        const lastDay = new Date(
            currentDate.getFullYear(),
            currentDate.getMonth() + 1,
            0
        );

        const prevLastDay = new Date(
            currentDate.getFullYear(),
            currentDate.getMonth(),
            0
        );

        const firstDayIndex = firstDay.getDay();
        const lastDayIndex = lastDay.getDay();
        const nextDays = 7 - lastDayIndex - 1;

        const months = [
            "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"
        ];

        monthYearEl.innerHTML = `${months[currentDate.getMonth()]} ${currentDate.getFullYear()}`;

        let days2 ="";

        for (let x = firstDayIndex; x > 0; x--) {
            const prevDate = prevLastDay.getDate() - x + 1;
            const dateKey = `${currentDate.getFullYear()}-${currentDate.getMonth()}-${prevDate}`;
            const hasEvent = events[dateKey] !== undefined;

            days2 +=  `<div class="day2 other-month${hasEvent ? 'has-events2' : ''}">${prevDate}</div>`;
        }

        for (let i = 1; i <= lastDay.getDate(); i++) {
            const date = new Date(
                currentDate.getFullYear(),
                currentDate.getMonth(),
                i
            );

            const dateKey = `${currentDate.getFullYear()}-${currentDate.getMonth() +1}-${i}`;
            const hasEvent = events[dateKey] !== undefined;

            let dayClass = 'day2';

            if (
                date.getDate() === new Date().getDate() &&
                date.getMonth() === new Date().getMonth() &&
                date.getFullYear() === new Date().getFullYear()
            ) {
                dayClass += ' today2';
            }

            if (
                selectedDate &&
                date.getDate() === selectedDate.getDate() &&
                date.getMonth() === selectedDate.getMonth() &&
                date.getFullYear() === selectedDate.getFullYear()
            ) {
                dayClass += ' selected2';
            }

            if (hasEvent) {
                dayClass += ' has-events2';
            }

            days2 += `<div class="${dayClass}" data-date="${dateKey}">${i}</div>`;
        }

        for (let j = 1; j <= nextDays; j++) {
            const dateKey = `${currentDate.getFullYear()}-${currentDate.getMonth() + 2}-${j}`;
            const hasEvent = events[dateKey] !== undefined;

            days2 += `<div class="day2 other-month${hasEvent ? 'has-events2' : ''}">${j}</div>`;
        }

        daysEl.innerHTML = days2;

        document.querySelectorAll('.day2:not(.other-month)').forEach(day => {
            day.addEventListener('click', () => {
                const dateStr = day.getAttribute('data-date');
                const [year, month, dayNum] = dateStr.split('-').map(Number);
                selectedDate = new Date(year, month - 1, dayNum);
                renderCalendar();
                showEvents(dateStr);
            });
        });
    }

    function showEvents(dateStr) {
        const [year,month, day] = dateStr.split('-').map(Number);
        const dateObj = new Date(year, month - 1, day);
        const months = [
            "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"
        ];

        const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        const dayName = dayNames[dateObj.getDay()];

        eventDateEl.textContent = `${dayName}, ${months[dateObj.getMonth()]} ${day}, ${year}`;

        eventListEl.innerHTML = '';

        if (events[dateStr]) {
            events[dateStr].forEach(event => {
                const eventItem = document.createElement('div');
                eventItem.className = 'event-item2';
                eventItem.innerHTML = `
                    <div class="event-color2"></div>
                    <div class="event-time2">${event.time}</div>
                    <div class="event-text2">${event.text}</div>
                `;
                eventListEl.appendChild(eventItem);
            });
        } else {
            eventListEl.innerHTML = '<div class="no-events2">Select a date with events to view them here.</div>';
        }
    }

    prevMonthBtn.addEventListener('click', () => {
        currentDate.setMonth(currentDate.getMonth() - 1);
        renderCalendar();
        eventDateEl.textContent = 'Select a date';
        eventListEl.innerHTML = '<div class="no-events2">Select a date with events to view them here</div>';
    });

    nextMonthBtn.addEventListener('click', () => {
        currentDate.setMonth(currentDate.getMonth() + 1);
        renderCalendar();
        eventDateEl.textContent = 'Select a date';
        eventListEl.innerHTML = '<div class="no-events2">Select a date with events to view them here</div>';
    });

    todayBtn.addEventListener('click', () => {
        currentDate = new Date();
        selectedDate = new Date();
        renderCalendar();

        const dateStr = `${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-${currentDate.getDate()}`;
        showEvents(dateStr);
    });

    renderCalendar();
});