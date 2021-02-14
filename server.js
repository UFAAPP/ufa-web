const express = require('express');
const app = express();

app.use(express.static('./dist/law-and-order'));
app.get('/*', function (req, res) {
  res.sendFile('index.html', { root: 'dist/law-and-order' });
});
app.listen(process.env.PORT || 8080);
