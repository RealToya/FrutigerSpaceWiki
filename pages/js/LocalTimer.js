document.addEventListener('DOMContentLoaded', () => {  

    // 1. Subtle Parallax Scrolling Background

    function updateBackgroundPosition() {
    const scrollY = window.scrollY;
    const backgroundImg = document.querySelector(".background-area img"); /* The update time here is essencial, no need for delays <-- Edited By Toya */

        backgroundImg.style.transform = `translateY(${scrollY / 8}px)`; /* You can use the css transitions to make it easy to do some effects <-- Edited By Toya */
    }

    window.addEventListener("scroll", updateBackgroundPosition);

    // 2. "Glassy" Element Hover Effects
    const glassElements = document.querySelectorAll('.topic-folder, .sidebar-box, .ko-fi-button, .box'); // Add more selectors as needed
    glassElements.forEach(el => {
        el.addEventListener('mouseover', (e) => {
            const shine = document.createElement('div');
            shine.classList.add('shine');
            // position the shine at a calculated point
            const rect = el.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            shine.style.left = `${x}px`;
            shine.style.top = `${y}px`;
            el.appendChild(shine);

            // start animation
            setTimeout(() => {
                shine.classList.add('animate');
            }, 10);

            el.addEventListener('mouseout', () => {
                shine.remove();
            }, { once: true });
        });
    });

    // 3. Retro Tooltips / Info Bubbles
    const tooltipElements = document.querySelectorAll('[data-tooltip]');  // Select elements with data-tooltip
    tooltipElements.forEach(el => {
        el.addEventListener('mouseover', (e) => {
            const tooltipText = el.getAttribute('data-tooltip');
            if (!tooltipText) return;

            const tooltip = document.createElement('div');
            tooltip.classList.add('retro-tooltip');
            tooltip.textContent = tooltipText;

            // position the tooltip
            const rect = el.getBoundingClientRect();
            const scrollY = window.scrollY; // important for absolute positioning
            const x = e.clientX - rect.left;
            const y = rect.bottom + window.scrollY;

            tooltip.style.left = `${rect.left + x - (tooltip.offsetWidth / 2)}px`;
            tooltip.style.top = `${y + 5}px`;  // 5px below the element

            document.body.appendChild(tooltip);

            el.addEventListener('mouseout', () => {
                tooltip.remove();
            }, { once: true });
        });
    });


    // 4. "Fading" Content Transitions on Internal Navigation (Simplified)
    const internalLinks = document.querySelectorAll('a[href^="#"]'); // Select internal links.
    internalLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault(); // Prevent default navigation

            const targetId = link.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);

            if (!targetElement) return;

            // 1. Fade out current content (simplified: entire body)
            document.body.style.opacity = '0';
            document.body.style.transition = 'opacity 0.5s ease-in-out';

            setTimeout(() => {
                // 2. Scroll to target
                targetElement.scrollIntoView({ behavior: 'smooth' });
                // 3.  Change content  (In a real app, fetch new content)
                // 4. Fade in new content.
                document.body.style.opacity = '1';
                document.body.style.transition = 'opacity 0.5s ease-in-out';
            }, 500);
        });
    });



    // 5. Subtle Sound Effects (sparingly!)
    const clickableElements = document.querySelectorAll('.topic-folder, .sidebar-box ul li a, .ko-fi-button');
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    let isMuted = false; // You'd add a mute button, and toggle this.

    function playClickSound() {
        if (isMuted || !audioContext) return;

        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();

        oscillator.type = 'triangle';  // A softer sound
        oscillator.frequency.setValueAtTime(400, audioContext.currentTime); // Ashort, mid-range frequency
        gainNode.gain.setValueAtTime(0.05, audioContext.currentTime);  // Very low gain (volume)
        gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.1); // Fade out quickly

        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);

        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.1); // Stop after fade out
    }

    clickableElements.forEach(el => {
        el.addEventListener('click', playClickSound);
    });


    // 7. Clock/Date Display (Optional but Thematic)
    const header = document.querySelector('.header');  //  put clock in header
    if (header) {
        const clockDiv = document.createElement('div');
        clockDiv.classList.add('clock-display');
        clockDiv.style.cssText = `
                font-family: 'Arial', sans-serif;
                font-size: 0.9em;
                color: #004d80;
                margin-top: 10px;
                text-shadow: 1px 1px 2px rgba(255, 255, 255, 0.5);
                display:flex;
                flex-direction: column;
                align-items: flex-end;
            `;
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