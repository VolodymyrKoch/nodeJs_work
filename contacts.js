const path = require('path');
const fs = require('fs');
// const contactsPath = path.basename('/Node.js_work/contacts.js'); //contacts.js
const contactsPath = path.basename(__dirname); //contacts.js
console.log('contactsPath', contactsPath);
// const a = 2;
// module.exports = { a };
// console.log('filename', __filename);
// J:\Node.js\HomeWork\Node.js_work\contacts.js
// TODO: задокументировать каждую функцию
function listContacts() {
  // ...твой код
  // const list = fs.readFile('./db/contacts.json');
  // const l = await fs.readFile('./db/contacts.json')
  // console.table('list', list);
}

function getContactById(contactId) {
  // ...твой код
}

function removeContact(contactId) {
  // ...твой код
}

function addContact(name, email, phone) {
  // ...твой код
}
module.exports = { addContact, removeContact, getContactById, listContacts };
