import { Alert } from "./alert.js";
import { Modal, ModalView } from "./modal.js";
import { person } from "./model.js";

export class View {
    constructor() {
        this.listPersons = null;
        this.tbody = document.getElementsByTagName("tbody")[0];
        this.mapAlerts = new Map();
        document.getElementById('formPerson').addEventListener('submit', (event) => {
            event.preventDefault(); // Evita que el formulario se envíe
            this.add()
        });
        this.modalView = new ModalView();
        this.modalEdit = new Modal();
        this.modalEdit.onClick((person) => { this.edit(person) });
    }

    setAlert(type, contentId) {
        if (!this.mapAlerts.has(type)) {
            this.mapAlerts.set(type, new Alert(type, contentId));
        }
    }

    setListPersons(listPersons) {
        this.listPersons = listPersons;
    }

    render() {
        this.listPersons.persons.forEach((p) => {
            this.createRow(p);
        });
    }

    createRow(person) {
        const row = document.createElement("tr"); // creamos una fila
        row.setAttribute("id", person.id);
        row.innerHTML = `
        <td>${person.id}</td>
        <td>${person.name}</td>
        <td></td>
        <td class="center" colspan="2" ></td>
        `;

        // Se agrega el button del modal de detalle
        const btnDetails = document.createElement('button');
        btnDetails.innerText = 'Detalles';
        btnDetails.classList.add('btn', 'btn-primary');
        btnDetails.setAttribute('data-bs-toggle', 'modal');
        btnDetails.setAttribute("data-bs-toggle", "modal");
        btnDetails.setAttribute("data-bs-target", "#view-modal");
        btnDetails.onclick = (e) => {
            this.modalView.showPerson(person);

        };


        // Agregamos los buttons
        const btnEdit = document.createElement("button");
        btnEdit.classList.add("btn", "btn-info", "my-1", "mx-1");
        btnEdit.setAttribute("data-bs-toggle", "modal");
        btnEdit.setAttribute("data-bs-target", "#edit-modal");
        btnEdit.innerText = "Editar";
        btnEdit.onclick = (e) => {
            this.modalEdit.setPerson(person);
        };

        const btnRemove = document.createElement("button");
        btnRemove.classList.add("btn", "btn-danger", "my-1", "mx-1");
        btnRemove.innerText = "Eliminar";
        btnRemove.onclick = (e) => {
            this.remove(person.id, person.name);
        };
        // agregamos a la fila
        row.children[2].appendChild(btnDetails);
        row.children[3].appendChild(btnEdit);
        row.children[3].appendChild(btnRemove);

        //Agregamos la fila al cuerpo de la tabla
        this.tbody.appendChild(row);
    }

    add() {
        const txtName = document.getElementById('name');
        const txtAddress = document.getElementById('address');
        const txtPhone = document.getElementById('phone_number');
        const txtEmail = document.getElementById('email');
        if (txtName !== '' || txtAddress !== '' || txtPhone !== '' ||
            txtEmail !== '') {
            person.name = txtName.value;
            person.address = txtAddress.value;
            person.phone_number = txtPhone.value;
            person.email = txtEmail.value;

            const index = this.listPersons.addPerson({ ...person });
            person.id = index;
            this.createRow({ ...person });

            // alert
            this.mapAlerts.get('success').show(`Se agrego a ${person.name}`);
            // Clear
            txtName.value = '';
            txtAddress.value = '';
            txtPhone.value = '';
            txtEmail.value = '';
            return;
        }
        this.mapAlerts.get('danger').show('¡Se necesitan llenar todos los campos!');

    }

    edit(person) {
        // console.log('Entra en la View');
        // console.log(person);
        this.listPersons.editPerson(person.id, person);
        const row = document.getElementById(person.id);
        row.cells[1].innerText = person.name;
        // row.cells[2].innerText = person.address;
        // row.cells[3].innerText = person.phone_number;
        // row.cells[4].innerText = person.email;
        this.mapAlerts.get('info').show(`Se modificó a ${person.name}`);
     }

    remove(id, name) {
        document.getElementById(id).remove(); // Se elimina el elemento del DOM
        this.mapAlerts.get('danger').show(`Se eliminó a ${name}`);
        this.listPersons.removePerson(id);
     }
}
