console.log('Front end JS for modal');

document.addEventListener('DOMContentLoaded', function () {
    const modalClass = 'open-modal';

    // Function to create a simple modal
    const createModal = (url) => {
        const modal = document.createElement('div');
        modal.classList.add('modal-overlay');
        modal.setAttribute('role', 'dialog');
        modal.setAttribute('aria-modal', 'true');
        modal.innerHTML = `
            <div class="modal-content" tabindex="0">
                <iframe src="${url}" frameborder="0" allow="autoplay; fullscreen" allowfullscreen></iframe>
                <button class="modal-close" aria-label="Close Modal">Close</button>
            </div>
        `;
        document.body.appendChild(modal);

        // Add the 'is-active' class to display the modal
        setTimeout(() => {
            modal.classList.add('is-active');
        }, 10); // Small delay for transition to apply

        // Focus management
        const modalContent = modal.querySelector('.modal-content');
        modalContent.focus();

        // Trap focus inside modal
        const trapFocus = (e) => {
            if (e.key === 'Tab') {
                const focusableElements = modal.querySelectorAll('button, iframe');
                const firstElement = focusableElements[0];
                const lastElement = focusableElements[focusableElements.length - 1];
                if (e.shiftKey) { // shift + tab
                    if (document.activeElement === firstElement) {
                        e.preventDefault();
                        lastElement.focus();
                    }
                } else { // tab
                    if (document.activeElement === lastElement) {
                        e.preventDefault();
                        firstElement.focus();
                    }
                }
            }
        };

        document.addEventListener('keydown', trapFocus);

        // Close modal on click of close button
        modal.querySelector('.modal-close').addEventListener('click', () => {
            modal.classList.remove('is-active');
            setTimeout(() => modal.remove(), 300); // Delay for smooth removal after transition
            document.removeEventListener('keydown', trapFocus);
        });

        // Close modal on outside click
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('is-active');
                setTimeout(() => modal.remove(), 300);
                document.removeEventListener('keydown', trapFocus);
            }
        });

        // Close modal on 'Escape' key press
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                modal.classList.remove('is-active');
                setTimeout(() => modal.remove(), 300);
                document.removeEventListener('keydown', trapFocus);
            }
        });
    };

    // Handle button click for opening modals
    document.querySelectorAll(`.${modalClass}`).forEach((button) => {
        button.addEventListener('click', (event) => {
            event.preventDefault();
            const url = button.href;
            createModal(url);
        });
    });
});
