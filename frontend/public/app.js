class ContactsApp {
    constructor() {
        this.apiBaseUrl = window.location.origin;
        this.init();
    }

    init() {
        this.bindEvents();
        this.loadContacts();
    }

    bindEvents() {
        const form = document.getElementById('contactForm');
        form.addEventListener('submit', (e) => this.handleSubmit(e));
    }

    async handleSubmit(e) {
        e.preventDefault();
        
        const formData = new FormData(e.target);
        const contact = {
            nom: formData.get('nom'),
            email: formData.get('email')
        };

        try {
            const response = await fetch(`${this.apiBaseUrl}/contacts`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(contact)
            });

            if (response.ok) {
                this.showMessage('Contact ajouté avec succès!', 'success');
                e.target.reset();
                this.loadContacts();
            } else {
                throw new Error('Erreur lors de l\'ajout du contact');
            }
        } catch (error) {
            console.error('Erreur:', error);
            this.showMessage('Erreur lors de l\'ajout du contact', 'error');
        }
    }

    async loadContacts() {
        const container = document.getElementById('contactsContainer');
        
        try {
            const response = await fetch(`${this.apiBaseUrl}/contacts`);
            
            if (!response.ok) {
                throw new Error('Erreur lors du chargement des contacts');
            }
            
            const contacts = await response.json();
            this.displayContacts(contacts);
        } catch (error) {
            console.error('Erreur:', error);
            container.innerHTML = '<p class="error">Erreur lors du chargement des contacts</p>';
        }
    }

    displayContacts(contacts) {
        const container = document.getElementById('contactsContainer');
        
        if (contacts.length === 0) {
            container.innerHTML = '<p class="empty">Aucun contact enregistré</p>';
            return;
        }

        const contactsHTML = contacts.map(contact => `
            <div class="contact-item">
                <div class="contact-name">${this.escapeHtml(contact.nom)}</div>
                <div class="contact-email">${this.escapeHtml(contact.email)}</div>
            </div>
        `).join('');

        container.innerHTML = contactsHTML;
    }

    showMessage(message, type) {
        const container = document.querySelector('.add-contact');
        const existingMessage = container.querySelector('.message');
        
        if (existingMessage) {
            existingMessage.remove();
        }

        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${type}-message`;
        messageDiv.textContent = message;
        
        container.insertBefore(messageDiv, container.querySelector('h2').nextSibling);

        setTimeout(() => {
            messageDiv.remove();
        }, 3000);
    }

    escapeHtml(unsafe) {
        return unsafe
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
    }
}

// Initialisation de l'application quand la page est chargée
document.addEventListener('DOMContentLoaded', () => {
    new ContactsApp();
});