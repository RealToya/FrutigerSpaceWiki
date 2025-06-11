const backgroundManager = {
    defaultBackground: 'assets/asadal_stock_13.jpg',
    
    applyBackground(imagePath) {
        const backgroundImg = document.querySelector('.background-area img');
        if (backgroundImg) {
            backgroundImg.src = imagePath;
            localStorage.setItem('backgroundImage', imagePath);
            this.updatePreview(imagePath);
            this.showSaveNotification();
        }
    },

    resetBackground() {
        localStorage.removeItem('backgroundImage');
        const backgroundImg = document.querySelector('.background-area img');
        if (backgroundImg) {
            backgroundImg.src = this.defaultBackground;
        }
        this.updatePreview(this.defaultBackground);
        this.showSaveNotification('Background reset to default!');
    },

    updatePreview(imagePath) {
        const previewContainer = document.querySelector('.current-bg-preview');
        if (previewContainer) {
            previewContainer.innerHTML = `<img src="${imagePath}" alt="Current background preview">`;
        }
    },    showSaveNotification(message = 'Background saved!') {
        const notification = document.createElement('div');
        notification.className = 'vista-notification';
        
        notification.innerHTML = `
            <div class="notification-glow"></div>
            <div class="notification-content">
                <div class="notification-icon">✓</div>
                <div class="notification-text">${message}</div>
            </div>
            <div class="notification-shine"></div>
        `;
        
        document.body.appendChild(notification);

        setTimeout(() => {
            notification.classList.add('show');
        }, 100);

        setTimeout(() => {
            notification.classList.add('fade-out');
            setTimeout(() => {
                notification.remove();
            }, 500);
        }, 3000);
    },

    loadSavedBackground() {
        const savedBackground = localStorage.getItem('backgroundImage');
        const currentBackground = savedBackground || this.defaultBackground;
        
        const backgroundImg = document.querySelector('.background-area img');
        if (backgroundImg) {
            backgroundImg.src = currentBackground;
        }
        
        this.updatePreview(currentBackground);
    }
};

document.addEventListener('DOMContentLoaded', () => {
    backgroundManager.loadSavedBackground();

    const fileInput = document.getElementById('bgImageUpload');
    if (fileInput) {
        fileInput.addEventListener('change', function(e) {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    const dataUrl = e.target.result;
                    backgroundManager.applyBackground(dataUrl);
                };
                reader.readAsDataURL(file);
            }
        });
    }

    const resetButton = document.getElementById('resetBackground');
    if (resetButton) {
        resetButton.addEventListener('click', function() {
            backgroundManager.resetBackground();
        });
    }
});
