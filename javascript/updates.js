function renderUpdates() {
    const updatesList = document.querySelector('.updates-section ul');
    updatesList.innerHTML = ''; // Clear existing list
    updates.forEach(update => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `<span class="update-date">${update.date}</span> - ${update.text}`;
        updatesList.appendChild(listItem);
    });
}

// Call this function when the page loads
document.addEventListener('DOMContentLoaded', renderUpdates);
