const Contact = require('../models/contact');

exports.addContact = (req, res, next) => {
  const newContact = new Contact(req.body);
  Contact.create(newContact)
    .then(contact => {
      return res.json( contact );
    })
    .catch(next);
}

exports.getAllContacts = (req, res, next) => {
  const offset = parseInt(req.query.offset);
  const limit = parseInt(req.query.limit);

  const query = Contact.find({ })
    .skip(offset)
    .limit(limit)

    return Promise.all([query, Contact.find({ }).count()])
    .then((results) => {
      return res.json({ 
        contacts: results[0],
        offset,
        count: results[1]
      });
    })
    .catch(next);
}

exports.getContact = (req, res, next) => {
  Contact.findById(req.params.id)
    .then( contact => {
      return res.json( contact );
    })
    .catch(next);
}

exports.updateContact = (req, res, next) => {
  Contact.findByIdAndUpdate(req.body._id, req.body.contact)
    .then( contact => {
      return res.json( contact );
    })
    .catch(next);
}

exports.removeContact = (req, res, next) => {
  Contact.findByIdAndRemove(req.body._id)
    .then( contact => {
      return res.json({ contact });
    })
    .catch(next);
}



