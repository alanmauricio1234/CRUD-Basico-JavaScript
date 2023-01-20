import { Alert } from "./alert.js";



export class Modal {
    constructor() {
        this.person = null;
        this.name = document.getElementById('modal_name');
        this.address = document.getElementById('modal_address');
        this.phone_number = document.getElementById('modal_phone_number');
        this.email = document.getElementById('modal_email');
        this.btnEdit = document.getElementById('btn_modal_edit');
        this.alert = new Alert('danger', 'alerts-modal');
    }


    setPerson(person) {
        this.person = person;
        this.name.value = person.name;
        this.address.value = person.address;
        this.phone_number.value = person.phone_number;
        this.email.value = person.email;
    }

    onClick(callback) {
        this.btnEdit.onclick = (event) => {
            if (this.valuesIsEmpty()){
                this.alert.show('Los valores no deben ser vacíos :(');
            }
            // Esconder el modal
            console.log('Entra en el modal');
            callback({
                'id': this.person.id,
                'name': this.name.value,
                'address': this.address.value,
                'phone_number': this.phone_number.value,
                'email': this.email.value
            });
        };
    }

    valuesIsEmpty() {
        return this.name.value === '' && this.address.value === '' &&
                this.phone_number.value === '' && this.email.value === '';
    }
}