const contacts = require('../models/contacts.json');
const { v4: uuidv4 } = require('uuid');
const Joi = require('joi');

class ContactsController {
  getContacts(req, res) {
    res.json(contacts);
    res.status(200);
  }

  findContactIndex = id => {
    const elementId = +id;
    return contacts.findIndex(({ id }) => id === elementId);
  };

  getContactsId = (req, res) => {
    const {
      params: { contactId },
    } = req;
    // const numberId = +contactId;
    const findContact = this.findContactIndex(contactId);
    res.json(findContact);
    res.status(200);
  };

  postContacts(req, res) {
    res.json(contacts);
    res.status(200);
  }

  validateRequired(req, res, next) {
    const validationRules = Joi.object({
      name: Joi.string().required(),
      email: Joi.string().required(),
      password: Joi.string().required(),
    });
    const validationResult = validationRules.validate(req.body);
    if (validationResult.error) {
      return res.status(400).send(validationResult.error);
    }
    next();
  }

  deleteContactsId(req, res) {
    res.json(contacts);
    res.status(200);
  }

  patchContactsId(req, res) {
    res.json(contacts);
    res.status(200);
  }
}

module.exports = new ContactsController();
