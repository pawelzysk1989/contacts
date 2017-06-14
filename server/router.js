
const contactController = require('./controllers/contactController');
module.exports = (app) => {
  app.get('/', function(req, res, next) {
    res.status(200).send("Hi, It works!")
  });
  app.post('/addContact', contactController.addContact);
  app.get('/getAllContacts', contactController.getAllContacts);
  app.get('/getContact/:id', contactController.getContact);
  app.put('/updateContact', contactController.updateContact);
  app.delete('/removeContact', contactController.removeContact);
}
