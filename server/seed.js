const faker = require('faker');
const constants = require('./constants');
const Contact = require('./models/contact');

function createContact() {
  return {
    name: faker.name.firstName(),
    surname: faker.name.lastName(),
    email: faker.internet.email(),
    phone: faker.phone.phoneNumber(),
    image: faker.image.avatar()
  };
}

module.exports = () => {
    for (var i = 0; i < constants.CONTACTS_TO_ADD; i++) {
        const newContact = createContact();
        Contact.create(newContact);
    }
}


