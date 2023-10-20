const db = require("../models");
const Phones = db.phones;
const Op = db.Sequelize.Op;

// Create phone
exports.create = (req, res) => {
    const { name,number } = req.body;
    const contactId = parseInt(req.params.contactId);
    return Phones.create({
        name: name,
        number: number,
        contactId: contactId,
    })
    .then((result)=>{
        res.status(200).send(`${result.name} number added`);
    })
    .catch((err)=>{
        res.status(404).send(`number not added`);
    })
};

// Get all phones
exports.findAll = async (req, res) => {

    const contactId = parseInt(req.params.contactId);
    return await Phones.findAll({where: { contactId : contactId }})
    .then((result)=>{
        result != null ? res.status(200).send(result) : res.status(404).send(`details not found`);
      })
    .catch((err)=>{
        res.status(500).send(`unable to retrive contact phone numbers`);
    })
};

// Get one phone by id
exports.findOne = async (req, res) => {
    const contactId = parseInt(req.params.contactId);
    const phoneId = parseInt(req.params.phoneId);
    let result2 = await Phones.findAll({where: { id : phoneId }})
    return await Phones.findOne({where: { id : phoneId, contactId : contactId }})
    .then((result)=>{
        console.log("check result find one",result)
        console.log("check result find one check result",result2)
        result != null ? res.status(200).send(result) : res.status(404).send(`details not found`);
      })
      .catch((err)=>{
        res.status(500).send(`unable to retrive phone`);
    })
};

// Update one phone by id
exports.update = async (req, res) => {
    const contactId = parseInt(req.params.contactId);
    const phoneId = parseInt(req.params.phoneId);
    const { name,number } = req.body;
    return await Phones.update({ name: name , number,number }, {
        where: {
            id: phoneId,
            contactId : contactId,
        },
      })
      .then((result)=>{
          res.status(200).send(`phone updated successfully`);
      })
      .catch((err)=>{
          res.status(500).send(`phone not updated `);
       })
};

// Delete one phone by id
exports.delete = async (req, res) => {
    const contactId = parseInt(req.params.contactId);
    const phoneId = parseInt(req.params.phoneId);
    return await Phones.destroy({  where: { id: phoneId , contactId : contactId }, })
    .then((result)=>{
            res.status(200).send("phone number deleted");
    })
    .catch((err)=>{
            res.status(500).send(`unable to delete phone number`);
    })
};