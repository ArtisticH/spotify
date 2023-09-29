const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.listen(5050, () => {
  console.log('listening on 5050...');
});

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use('/public', express.static(__dirname + '/public'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
});
