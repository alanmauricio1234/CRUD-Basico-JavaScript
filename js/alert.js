export class Alert {

    constructor(type, contentId) {
        this.content = document.getElementById(contentId);
        this.type = type;
    }

    setContentAlert(contentId) {
        this.content = document.getElementById(contentId);
    }

    show(message) {
        this.content.innerHTML = `
            <div id="alert-danger" class="alert alert-dismissible alert-${this.type} fade show"
                role="alert">
                <strong>${message}</strong>
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>
        `;
    }

}