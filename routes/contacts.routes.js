const express = require('express');
const { Router } = require('express');

const ContactsController = require('../controllers/contacts.controllers.js');

const router = Router();

router.get('/', ContactsController.getContacts);
router.get('/:contactId', contactsController.validateId, ContactsController.getContactsId);
// router.post('/');
// router.delete('/:contactId');
// router.patch('/:contactId');

module.exports = router;
