import {persons, person} from "./persons.js"

function edit(indice) {
    const table = document.getElementById('table');
    const row = table.getRow(indice);
}

function remove(index) {
    document.getElementById('table').deleteRow(index);
}


function messageHidden() {
    document.getElementById('alert').hidden = true;
}

function loadData() {
    const tbody = document.getElementsByTagName('tbody')[0];
    persons.forEach((p) => {
        let row = document.createElement('tr'); // creamos una fila
        row.setAttribute('id', p.id);
        row.innerHTML = `
            <td>${p.id}</td>
            <td>${p.name}</td>
            <td>${p.address}</td>
            <td>${p.email}</td>
            <td class="center" colspan="2" ></td>
        `;

        // Agregamos los buttons
        let btnEdit = document.createElement('button');
        btnEdit.classList.add('btn', 'btn-info', 'my-1', 'mx-1');
        btnEdit.innerText = 'Editar';

        let btnRemove = document.createElement('button');
        btnRemove.classList.add('btn', 'btn-danger', 'my-1', 'mx-1');
        btnRemove.innerText = 'Eliminar';

        row.children[4].appendChild(btnEdit);
        row.children[4].appendChild(btnRemove);

        //Agregamos la fila al cuerpo de la tabla
        tbody.appendChild(row);
    });
}

function add(event) {
    // Evita que el formulario se envie 
    event.preventDefault();
    //console.log('funcionando');
    const txtName = document.getElementById('name');
    const txtAddress = document.getElementById('address');
    const txtPhone = document.getElementById('phone_number');
    const txtEmail = document.getElementById('email');
    if (txtName !== '' || txtAddress !== '' || txtPhone !== '' ||
        txtEmail !== '') {
        console.log('Entra');
        person.id = Date.now();
        person.name = txtName.value;
        person.address = txtAddress.value;
        person.email = txtEmail.value;

        persons.push({...person});
        //console.log(persons);
        // Recargar la table
        
    } else {
        messageAlert.classList.add('alert-danger');
        messageAlert.hidden = false;
    }

}

let band = false;
const messageAlert = document.getElementById('alert');
const form = document.getElementById('formPerson');
form.addEventListener('submit', add);

loadData();