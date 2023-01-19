export class Alert {

    constructor(type) {
        this.div = document.getElementById('alerts');
        this.type = type;
    }

    show(message) {
        this.div.innerHTML = `
            <div id="alert-danger" class="alert alert-dismissible alert-${this.type} fade show"
                role="alert">
                <strong>${message}</strong>
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        `;
    }

}