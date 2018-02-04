var express = require('express');

var port = 3000;
// create express app and start serving files from public folder
var app = express();
app.use(express.static('public'));

app.listen(port, function () {
    console.log('Muzkat Frame listening on port ' + port + '!');
});