document.addEventListener('DOMContentLoaded', function () {
    const modalClass = 'is-button-open-in-modal';

    // Function to create a simple modal
    const createModal = (url) => {
        const modal = document.createElement('div');
        modal.classList.add('mello-modal__overlay');
        modal.setAttribute('role', 'dialog');
        modal.setAttribute('aria-modal', 'true');
        modal.innerHTML = `
            <div class="mello-modal__content" tabindex="0">
                <iframe src="${url}" frameborder="0" allow="autoplay; fullscreen" allowfullscreen></iframe>
                <button class="mello-modal__close" aria-label="Close Modal">
                  <svg viewBox="0 0 11 11" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M4.54289 5.25L0.146423 9.64641L0.853534 10.3535L5.25 5.9571L9.64647 10.3535L10.3536 9.64641L5.95711 5.25L10.3536 0.853586L9.64647 0.146484L5.25 4.5429L0.853534 0.146484L0.146424 0.853586L4.54289 5.25Z" fill="currentColor" />
                  </svg>
                </button>
            </div>
        `;
        document.body.appendChild(modal);

        // Add the 'is-active' class to display the modal
        setTimeout(() => {
            modal.classList.add('mello-modal--active');
        }, 10); // Small delay for transition to apply

        // Focus management
        const modalContent = modal.querySelector('.mello-modal__content');
        if (modalContent) {
            modalContent.focus();
        }

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
        modal.querySelector('.mello-modal__close').addEventListener('click', () => {
            modal.classList.remove('mello-modal--active');
            setTimeout(() => modal.remove(), 300);
            document.removeEventListener('keydown', trapFocus);
        });

        // Close modal on outside click
        modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    modal.classList.remove('mello-modal--active');
                    setTimeout(() => modal.remove(), 300);
                    document.removeEventListener('keydown', trapFocus);
                }
        });

        // Close modal on 'Escape' key press
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                modal.classList.remove('mello-modal--active');
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
