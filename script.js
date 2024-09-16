document.addEventListener('DOMContentLoaded', function() {
    const calendarBody = document.getElementById('calendar-body');
    const monthYear = document.getElementById('month-year');
    const prevMonth = document.getElementById('prev-month');
    const nextMonth = document.getElementById('next-month');

    const mois = [
        "Janvier", "Février", "Mars", "Avril", "Mai", "Juin",
        "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"
    ];

    let date = new Date();
    let currentMonth = date.getMonth();
    let currentYear = date.getFullYear();

    function renderCalendar(month, year) {
        calendarBody.innerHTML = '';
        monthYear.textContent = `${mois[month]} ${year}`;

        const firstDay = (new Date(year, month).getDay() + 6) % 7; // Ajuste pour que lundi soit le premier jour (0 = lundi)
        const daysInMonth = 32 - new Date(year, month, 32).getDate();

        let date = 1;
        for (let i = 0; i < 6; i++) {
            let row = document.createElement('tr');

            for (let j = 0; j < 7; j++) {
                if (i === 0 && j < firstDay) {
                    let emptyCell = document.createElement('td');
                    row.appendChild(emptyCell);
                } else if (date > daysInMonth) {
                    break;
                } else {
                    let cell = document.createElement('td');
                    cell.textContent = date;

                    // Vérifie si c'est le jour actuel
                    if (date === new Date().getDate() && year === new Date().getFullYear() && month === new Date().getMonth()) {
                        cell.classList.add('current-day');
                        // Applique les styles en ligne pour s'assurer que tout s'affiche correctement
                        cell.style.backgroundColor = '#C1815C';
                        cell.style.color = 'white';
                        cell.style.borderRadius = '50%';
                        cell.style.width = '30px';
                        cell.style.height = '30px';
                        cell.style.display = 'flex';
                        cell.style.alignItems = 'center';
                        cell.style.justifyContent = 'center';
                        cell.style.margin = '0 auto';
                        cell.style.position = 'absolute';
                        cell.style.top = '50%';
                        cell.style.left = '50%';
                        cell.style.transform = 'translate(-50%, -50%)';
                    }

                    row.appendChild(cell);
                    date++;
                }
            }

            calendarBody.appendChild(row);
        }
    }

    prevMonth.addEventListener('click', function() {
        currentMonth = (currentMonth === 0) ? 11 : currentMonth - 1;
        currentYear = (currentMonth === 11) ? currentYear - 1 : currentYear;
        renderCalendar(currentMonth, currentYear);
    });

    nextMonth.addEventListener('click', function() {
        currentMonth = (currentMonth === 11) ? 0 : currentMonth + 1;
        currentYear = (currentMonth === 0) ? currentYear + 1 : currentYear;
        renderCalendar(currentMonth, currentYear);
    });

    renderCalendar(currentMonth, currentYear);
});
