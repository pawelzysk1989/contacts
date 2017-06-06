const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define our model
const contactSchema = new Schema({
  name: String,
  surname: String,
  email: String,
  phone: String,
  image: String
});


// Create the model class
const ModelClass = mongoose.model('Contact', contactSchema);

// Export the model
module.exports = ModelClass;


