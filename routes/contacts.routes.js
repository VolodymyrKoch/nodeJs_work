// const express = require('express');
const { Router } = require('express');

const ContactsController = require('../controllers/contacts.controllers.js');

const router = Router();

router.get('/', ContactsController.listContacts);
// router.get('/:contactId', contactsController.validateId, ContactsController.getContactsId);
router.post(
  '/',
  ContactsController.validateRequiredAdd,
  ContactsController.addContact,
);
// router.delete('/:contactId');
router.patch(
  '/:contactId',
  ContactsController.validateContactId,
  ContactsController.validateUpdateContact,
  ContactsController.updateContact,
);

module.exports = router;
