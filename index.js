
const contacts = require('./contacts.js');
const argv = require('yargs').argv;

// const message = 'node is cool  ';
// console.log(message);

// console.log(contacts.listContacts());
// console.log(contacts.getContactById());

// TODO: рефакторить
function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case 'list':
      contacts.listContacts();
      break;

    case 'get':
      contacts.getContactById(id);
      break;

    case 'add':
      contacts.addContact(name, email, phone);
      break;

    case 'remove':
      contacts.removeContact(id);
      break;

    default:
      console.warn('\x1B[31m Unknown action type!');
  }
}

invokeAction(argv);
