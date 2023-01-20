import { data } from "./data.js";

export class ListPersons {
    constructor() {
        this.persons = JSON.parse(localStorage.getItem('persons'));
        this.currentId = 0;
        if (!this.persons || this.isEmpty(this.persons)) {
            this.persons = data;
        } 
        try{
            this.currentId = this.persons[this.persons.length - 1].id + 1;
        }catch(e) {
            this.currentId = 1;
        }
    }

    isEmpty(persons) {
        return persons.length < 0;
    }

    save(){
        localStorage.setItem('persons', JSON.stringify(this.persons));
    }

    getPersons() {
        return this.persons;
    }

    addPerson(person) {
        person.id = this.currentId;
        this.persons.push(person);
        this.save();
        this.currentId++;
        return person.id;
    }

    editPerson(id, person) {
        const index = this.findPerson(id);
        this.persons[index].name = person.name;
        this.persons[index].address = person.address;
        this.persons[index].phone_number = person.phone_number;
        this.persons[index].email = person.email;
        this.save();
    }

    removePerson(id) {
        const index = this.findPerson(id);
        //console.log(index);
        this.persons.splice(index, 1); // Eliminamos un elemento del arreglo
        //console.log(this.persons);
        this.currentId--;
        this.save();
    }

    findPerson(id) {
        return this.persons.findIndex((p) => p.id === id);
    }
}

export const person = {
    id: 0,
    name: '',
    address: '',
    phone_number: '',
    email: ''
};