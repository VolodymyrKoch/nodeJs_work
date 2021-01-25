const path = require('path');
const fs = require('fs').promises;
// import { v4 as uuidv4 } from 'uuid';
const { v4: uuidv4 } = require('uuid');
const contactsPath = path.normalize('./db/contacts.json');
console.log('contactsPath', contactsPath);

// TODO: задокументировать каждую функцию
function listContacts() {
  const list = fs
    .readFile(contactsPath, 'utf-8')
    .then(list => console.table(JSON.parse(list)))
    .catch(err => console.log(err.message));
}

function getContactById(contactId) {
  fs.readFile(contactsPath, 'utf-8')
    .then(list => JSON.parse(list))
    .then(list => console.table(list.find(contact => contact.id === contactId)))
    .catch(err => console.log(err));
}

function removeContact(contactId) {
  fs.readFile(contactsPath, 'utf-8')
    .then(list => JSON.parse(list))
    // .then(list =>console.table(list.filter(contact => contact.id !== contactId)))
    .then(list => {
      const filteredСontact = list.filter(contact => contact.id !== contactId);
      fs.writeFile(contactsPath, JSON.stringify(filteredСontact), 'utf8');
      console.log('Contact removed:');
      console.table(filteredСontact);
    })
    .catch(err => console.log(err));
}

function addContact(name, email, phone) {
  newContact = {
    id: uuidv4(),
    name: name,
    email: email,
    phone: phone,
  };
  fs.readFile(contactsPath, 'utf8')
    .then(list => JSON.parse(list))
    .then(list => {
      const newList = [...list, newContact];
      fs.writeFile(contactsPath, JSON.stringify(newList), 'utf8');
      console.table(newList);
    })
    .catch(err => console.log(err));
}
module.exports = { addContact, removeContact, getContactById, listContacts };
