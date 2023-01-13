import {person} from "./data.js";
import { StoragePerson } from "./model.js";

function messageHidden() {
    document.getElementById('alert').hidden = true;
}

function addPersonTable(person, tbody) {
    let row = document.createElement('tr'); // creamos una fila
    row.setAttribute('id', person.id);
    row.innerHTML = `
        <td>${person.id}</td>
        <td>${person.name}</td>
        <td>${person.address}</td>
        <td>${person.phone_number}</td>
        <td>${person.email}</td>
        <td class="center" colspan="2" ></td>
    `;

    // Agregamos los buttons
    let btnEdit = document.createElement('button');
    btnEdit.classList.add('btn', 'btn-info', 'my-1', 'mx-1');
    btnEdit.innerText = 'Editar';

    let btnRemove = document.createElement('button');
    btnRemove.classList.add('btn', 'btn-danger', 'my-1', 'mx-1');
    btnRemove.innerText = 'Eliminar';

    row.children[5].appendChild(btnEdit);
    row.children[5].appendChild(btnRemove);

    //Agregamos la fila al cuerpo de la tabla
    tbody.appendChild(row);
}

function loadData() {
    const tbody = document.getElementsByTagName('tbody')[0];
    storagePerson.persons.forEach((p) => {
        addPersonTable(p, tbody);
    });
}

function add(event) {
    // Evita que el formulario se envie 
    event.preventDefault();
    //console.log('funcionando');
    const tbody = document.getElementsByTagName('tbody')[0];
    const txtName = document.getElementById('name');
    const txtAddress = document.getElementById('address');
    const txtPhone = document.getElementById('phone_number');
    const txtEmail = document.getElementById('email');
    if (txtName !== '' || txtAddress !== '' || txtPhone !== '' ||
        txtEmail !== '') {
        //console.log('Entra');
        
        person.name = txtName.value;
        person.address = txtAddress.value;
        person.phone_number = txtPhone.value;
        person.email = txtEmail.value;

        const index = storagePerson.addPerson({...person});
        person.id = index;
        addPersonTable({...person}, tbody);
        //console.log(persons);
        // Recargar la table

        
    } else {
        messageAlert.classList.add('alert-danger');
        messageAlert.hidden = false;
    }

}

function clear() {
    const txtName = document.getElementById('name');
    const txtAddress = document.getElementById('address');
    const txtPhone = document.getElementById('phone_number');
    const txtEmail = document.getElementById('email');
    txtName.value = '';
    txtAddress.value = '';
    txtPhone.value = '';
    txtEmail.value = '';
}

let band = false;
const messageAlert = document.getElementById('alert');
const form = document.getElementById('formPerson');
form.addEventListener('submit', add);
const btnClear = document.getElementById('btn_clear');
btnClear.onclick = clear();
const storagePerson = new StoragePerson();
loadData();
