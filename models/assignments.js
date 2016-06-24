var mongoose = require ('mongoose');

var assignShema = mongoose.Schema({
  assignment_number: { type: Number, required: true, unique: true },
  student_name: { type: String, required: true },
  score: { type: Number },
  date_completed: { type: Date }
});

var Assign = mongoose.model('assigns', assignShema );

module.exports = Assign;
