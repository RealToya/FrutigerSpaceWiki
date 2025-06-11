async function fetchUpdates() {
    try {
        const response = await fetch('updates.json');
        const updates = await response.json();
        renderUpdates(updates);
    } catch (error) {
        console.error('Error fetching updates:', error);
    }
}

function renderUpdates(updates) {
    const updatesList = document.querySelector('.updates-section ul');
    updatesList.innerHTML = '';
    updates.forEach(update => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `<span class="update-date">${update.date}</span> - ${update.text}`;
        updatesList.appendChild(listItem);
    });
}

document.addEventListener('DOMContentLoaded', fetchUpdates);