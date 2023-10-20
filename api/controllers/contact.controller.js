const db = require("../models");
const Contacts = db.contacts;
const Phones = db.phones;
const Op = db.Sequelize.Op;

// Create contact
exports.create = async (req, res) => {
    const { name } = req.body;
    return await Contacts.create({
      name: name,
  })
  .then((result)=>{
      res.status(200).send(`${result.name} Contact created`);
  })
  .catch((err)=>{
      res.status(500).send(`Contact not created`);
  })
};

// Get all contacts
exports.findAll = async (req, res) => {
  return await Contacts.findAll()
  .then((result)=>{
      res.status(200).send(result);
  })
  .catch((err)=>{
      res.status(500).send(`unable to retrive contacts`);
  })
};

// Get one contact by id
exports.findOne = async (req, res) => {
    const id = parseInt(req.params.contactId);
    return await Contacts.findOne({where: { id: id }})
    .then((result)=>{
      result != null ? res.status(200).send(result) : res.status(404).send(`details not found`);
    })
    .catch((err)=>{
      res.status(500).send(`unable to retrive details`);
  })
  
};

// Update one contact by id
exports.update = async (req, res) => {
  const id = parseInt(req.params.contactId);
  const { name } = req.body;
  return await Contacts.update({ name: name }, {
    where: {
        id: id,
    },
  })
  .then((name)=>{
      res.status(200).send("updated successfully");
  })
  .catch((err)=>{
      res.status(500).send(`unable to retrive contacts`);
    })
};

// Delete one contact by id
exports.delete = async (req, res) => {
  const id = parseInt(req.params.contactId);
  return await Contacts.destroy({  where: { id: id }, })
  .then((name)=>{
        res.status(200).send("contact deleted");
  })
  .catch((err)=>{
        res.status(500).send(`unable to delete contact`);
  })
};