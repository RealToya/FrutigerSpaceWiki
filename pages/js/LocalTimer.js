document.addEventListener('DOMContentLoaded', () => {  

    // 1. Clock/Date Display (Optional but Thematic)
    const header = document.querySelector('.header');  //  put clock in header
    if (header) {
        const clockDiv = document.createElement('div');
        clockDiv.classList.add('clock-display');
        header.appendChild(clockDiv);

        function updateClock() {
            const now = new Date();
            const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
            const dateString = now.toLocaleDateString([], { year: 'numeric', month: 'short', day: 'numeric' });
            clockDiv.innerHTML = `<span style="font-size:1.2em">${timeString}</span><span style="font-size:0.8em">${dateString}</span>`;
        }

        updateClock();
        setInterval(updateClock, 1000); // Update every second
    }

});