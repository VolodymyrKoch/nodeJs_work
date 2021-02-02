const contacts = require('../models/contacts.json');
const { v4: uuid } = require('uuid');
const Joi = require('joi');
const fs = require('fs').promises;
const path = require('path');

const contactsPath = path.normalize('../models/contacts.json');
// const contactsPath = path.join(__dirname, '../models/Contacts.json');
// console.log('contactsPath', contactsPath);
// console.log(JSON.parse(contactsPath));

class ContactsController {
  listContacts(req, res) {
    res.json(contacts);
    res.status(200);
  }

  findContactIndex = contactId => {
    const numberId = +contactId;
    return contacts.findIndex(({ id }) => id === numberId);
  };

  getContactsId = (req, res) => {
    const {
      params: { contactId },
    } = req;
    const numberId = +contactId;
    console.log(contactId);
    const findContact = this.findContactIndex(contactId);
    res.json(contacts[findContact]);
    res.status(200);
  };

  addContact(req, res) {
    const { body } = req;

    const createContact = {
      id: uuid(),
      ...body,
    };
    contacts.push(createContact);
    console.log('contacts', contacts);
    fs.writeFile(contactsPath, JSON.stringify(contacts));
    res.json(createContact);
    res.status(201);
    // res.status(201).send(createContact);
  }

  validateRequiredAdd(req, res, next) {
    const validationRules = Joi.object({
      name: Joi.string().required(),
      email: Joi.string().required(),
      phone: Joi.string().required(),
    });
    const validationResult = validationRules.validate(req.body);
    if (validationResult.error) {
      return res.status(400).send({ message: 'missing required name field' });
    }
    next();
  }

  deleteContactsId(req, res) {
    res.json(contacts);
    res.status(200);
  }

  updateContact = (req, res) => {
    const { contactId } = req.params;

    console.log('params', req.params);
    console.log('contactId', contactId);

    const сontactIndex = this.findContactIndex(contactId);
    // const numberId = +contactId;
    // const сontactIndex = contacts.findIndex(({ id }) => id === numberId);

    const updateDContact = {
      ...contacts[сontactIndex],
      ...req.body,
    };
    contacts[сontactIndex] = updateDContact;
    fs.writeFile(contactsPath, JSON.stringify(contacts));
    console.log('contacts', contacts);
    console.log('сontactIndex', сontactIndex);
    res.json(updateDContact);
    res.status(200);
  };

  validateContactId(req, res, next) {
    const {
      params: { contactId },
    } = req;
    const numberId = +contactId;
    const сontactIndex = contacts.findIndex(({ id }) => id === numberId);
    if (сontactIndex === -1) {
      return res.status(400).send('User is not found');
    }
    // const contactById = contacts.find(contact => contact.id === contactId);
    // if (!contactById) {
    //   return res.status(404).send({ message: 'User is not found' });
    // }
    next();
  }

  validateUpdateContact(req, res, next) {
    const validationRules = Joi.object({
      name: Joi.string(),
      email: Joi.string(),
      phone: Joi.string(),
    });

    const validationResult = validationRules.validate(req.body);

    if (validationResult.error) {
      return res.status(400).send({ message: 'missing required name field' });
    }

    next();
  }
}

module.exports = new ContactsController();
