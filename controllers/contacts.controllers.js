// const contacts = require('../models/contacts.json');
// const { v4: uuid } = require('uuid');
const Joi = require('joi');
// const fs = require('fs').promises;
// const path = require('path');
//? -----
const {
  Types: { ObjectId },
} = require('mongoose');
//? -----

const Contact = require('../models/modelsContacts.js');

// const contactsPath = path.join(__dirname, '../models/Contacts.json');

class ContactsController {
  async listContacts(req, res) {
    const contacts = await Contact.find();
    res.json(contacts);
    res.status(200);
  }

  // findContactIndex = contactId => {
  //   const numberId = +contactId;
  //   return contacts.findIndex(({ id }) => id === numberId);
  // };

  async getById(req, res) {
    const {
      params: { contactId },
    } = req;
    const findContact = await Contact.findById(contactId);
    if (!contact) {
      return res.json("User isn't found"), res.status(400);
    }
    res.json(contact);
    res.status(200);
  }

  async addContact(req, res) {
    try {
      const { body } = req;
      const createContact = await Contact.create(body);
      res.json(createContact);
      res.status(200);
    } catch (error) {
      res.json(error.message);
      res.status(400);
    }
  }

  // validateRequiredAdd(req, res, next) {
  //   const validationRules = Joi.object({
  //     name: Joi.string().required(),
  //     email: Joi.string().required(),
  //     phone: Joi.string().required(),
  //   });
  //   const validationResult = validationRules.validate(req.body);
  //   if (validationResult.error) {
  //     return res.status(400).send({ message: 'missing required name field' });
  //   }
  //   next();
  // }

  async removeContact(req, res) {
    const { contactId } = req.params;
    const deleteContact = await Contact.findByIdAndDelete(contactId);
    // console.log('deleteContact', deleteContact);
    if (!deleteContact) {
      return res.json("User isn't found"), res.status(400);
    }
    res.json(deleteContact);
    res.status(200);
  }

  async updateContact(req, res) {
    const { contactId } = req.params;
    const updateDContact = await Contact.findByIdAndUpdate(
      contactId,
      req.body,
      { new: true },
    );

    if (!updateDContact) {
      return res.json("User isn't found"), res.status(400);
    }
    res.json(updateDContact);
    res.status(200);
  }

  validateId(req, res, next) {
    const {
      params: { contactId },
    } = req;
    if (!ObjectId.isValid(contactId)) {
      return res.status(404).send('id is Not found');
    }
    next();
  }

  // validateContactId(req, res, next) {
  //   const {
  //     params: { contactId },
  //   } = req;
  //   const numberId = +contactId;
  //   const сontactIndex = contacts.findIndex(({ id }) => id === numberId);
  //   if (сontactIndex === -1) {
  //     return res.status(404).send('Not found');
  //   }
  //   next();
  // }

  // validateUpdateContact(req, res, next) {
  //   const validationRules = Joi.object({
  //     name: Joi.string(),
  //     email: Joi.string(),
  //     phone: Joi.string(),
  //   }).min(1);

  //   const validationResult = validationRules.validate(req.body);

  //   if (validationResult.error) {
  //     return res.status(400).send({ message: 'missing required name field' });
  //   }

  //   next();
  // }
}

module.exports = new ContactsController();
