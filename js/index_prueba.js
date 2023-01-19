import {person} from "./data.js";
import { StoragePerson } from "./model.js";
import { Alert } from "./alert.js";

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
    btnEdit.setAttribute('data-bs-toggle', 'modal');
    btnEdit.setAttribute('data-bs-target', '#edit-modal');
    btnEdit.innerText = 'Editar';
    btnEdit.onclick = (e) => {
        editPerson(person.id);
    }

    let btnRemove = document.createElement('button');
    btnRemove.classList.add('btn', 'btn-danger', 'my-1', 'mx-1');
    btnRemove.innerText = 'Eliminar';
    btnRemove.onclick = (e) => {
        removePerson(person.id, person.name);
    }

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

function editPerson(id) {
    const person = storagePerson.findPerson(id);
    const txtName = document.getElementById('modal_name');
    const txtAddress = document.getElementById('modal_address');
    const txtPhone = document.getElementById('modal_phone_number');
    const txtEmail = document.getElementById('modal_email');
    
    return;
}

function removePerson(id, name) {
    // Eliminamos el nodo del documento
    document.getElementById(id).remove();
    // Eliminamos a la persona del documento
    alertDanger.show(`Se elimino ${name}`);
    storagePerson.removePerson(id);

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
        //console.log(person.id);
        addPersonTable({...person}, tbody);

        // alert
        alertSuccess.show(`Se agrego a ${person.name}`);
        // Clear
        txtName.value = '';
        txtAddress.value = '';
        txtPhone.value = '';
        txtEmail.value = '';

        
    } else {
        alertDanger.show('No debe haber campos vacios :(');
        // messageAlert.hidden = false;
    }

}


// let band = false;
const form = document.getElementById('formPerson');
form.addEventListener('submit', add);
const storagePerson = new StoragePerson();
const alertDanger = new Alert('danger');
const alertSuccess = new Alert('success');


loadData();
//console.log(storagePerson.currentId);