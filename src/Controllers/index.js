import { Contact } from '../Models/Contact.js';
import { Queue } from '../Models/Queue.js';

const queue = new Queue();

document.getElementById("btn_add").addEventListener("click", function() {
    const contactName = document.getElementById("contactName").value.trim();
    const number = document.getElementById("number").value.trim();
    
    if (contactName === '' || number === '') {
        alert("Por favor, ingrese tanto el nombre como el número del contacto.");
        return;
    }

    if (number.length !== 10 || isNaN(number)) {
        alert("El número de teléfono debe tener exactamente 10 dígitos numéricos.");
        return;
    }

    if (isDuplicate(contactName, number)) {
        alert("Este nombre o número de teléfono ya están en la lista de contactos.");
        return;
    }

    const contact = new Contact(contactName, number);
    queue.enqueue(contact);
    displayContacts();
});

function isDuplicate(contactName, number) {
    let currentContact = queue.top;
    while (currentContact) {
        if (currentContact.value.name === contactName || currentContact.value.number === number) {
            return true;
        }
        currentContact = currentContact.next;
    }
    return false;
}

document.getElementById("btn_delete").addEventListener("click", function() {
    const deletedContact = queue.dequeue();
    if (deletedContact) {
        alert(`Se ha eliminado con éxito el contacto "${deletedContact.name}" con número "${deletedContact.number}".`);
        displayContacts();
    } else {
        alert("No hay contactos en la lista para eliminar.");
    }
});

function displayContacts() {
    const contactListDiv = document.getElementById("contactList");
    contactListDiv.innerHTML = "";

    let currentContact = queue.top;
    while (currentContact) {
        const contactItem = document.createElement("div");
        contactItem.textContent = `Nombre: ${currentContact.value.name}, Número: ${currentContact.value.number}`;
        contactListDiv.appendChild(contactItem);
        currentContact = currentContact.next;
    }
}
