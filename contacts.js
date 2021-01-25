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
    .then(list => console.table(JSON.parse(list)));
  return (
    JSON.parse(list.toString())
      // .then(list => console.log(JSON.parse(list)))
      .catch(err => console.log(err.message))
  );
}

function getContactById(contactId) {
  fs.readFile(contactsPath, 'utf-8')
    .then(list => JSON.parse(list))
    // .then(list => console.log(list.find(contact => contact.id === contactId)))
    .then(list => console.table(list.find(contact => contact.id === contactId)))

    .catch(err => console.log(err));
}

function removeContact(contactId) {
  fs.readFile(contactsPath, 'utf-8')
    .then(list => JSON.parse(list))
    // .then(list => console.log(list.filter(contact => contact.id !== contactId)))
    // .then(list =>console.table(list.filter(contact => contact.id !== contactId)))

    .then(list => {
      const filteredСontact = list.filter(contact => contact.id !== contactId);
      // console.log('filteredСontact:', JSON.stringify(filteredСontact));
      const newArr = fs.writeFile(
        contactsPath,
        JSON.stringify(filteredСontact),
        'utf8',
      );
      console.log('Contact removed:');
      console.table(filteredСontact);
    })
    // -----------------------------
    // .then(list => {
    //   console.log(
    //     JSON.parse(
    //       fs.writeFile(
    //         contactsPath,
    //         JSON.stringify(list.filter(contact => contact.id !== contactId)),
    //       ),
    //     ),
    //   );
    // })

    .catch(err => console.log(err));
}

function addContact(name, email, phone) {
  // ...твой код
  newContact = {
    id: uuidv4(),
    name: name,
    email: email,
    phone: phone,
  };

  fs.readFile(contactsPath, 'utf8')
    .then(list => JSON.parse(list))
    .then(list => {
      // console.log('list', list);
      const newList = [...list, newContact];
      // const newList = list.push(newContact);
      // console.log('newContact', newContact);
      fs.writeFile(contactsPath, JSON.stringify(newList), 'utf8');
      const consoleNewList = list;
      // console.log('newList', newList);
      console.log('consoleNewList', consoleNewList);
      // return newList
    })
    .catch(err => console.log(err));
}
module.exports = { addContact, removeContact, getContactById, listContacts };
