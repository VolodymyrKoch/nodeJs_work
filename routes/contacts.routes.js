const { Router } = require('express');

const ContactsController = require('../controllers/contacts.controllers.js');

const router = Router();

router.get('/', ContactsController.listContacts);
router.get(
  '/:contactId',
  ContactsController.validateId,
  ContactsController.getById,
);
router.post('/', ContactsController.addContact);
router.delete(
  '/:contactId',
  ContactsController.validateId,
  ContactsController.removeContact,
);
router.patch(
  '/:contactId',
  ContactsController.validateId,
  ContactsController.updateContact,
);

module.exports = router;
