var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/users', {useNewUrlParser: true, useNewUrlParser: true,  useUnifiedTopology: true});
var db = mongoose.connection;
//Bắt sự kiện error
db.on('error', function(err) {
  if (err) console.log(err)
});
//Bắt sự kiện open
db.once('open', function() {
  console.log("Kết nối thành công !");
});