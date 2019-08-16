const path = require('path');
const express = require('express');
const app = new express();
const publicPath = path.join(__dirname, '..', 'public');
const port = process.env.PORT || 3000;

console.log(process.env);

app.use(express.static(publicPath));

app.get('*', (req, res) => {
  res.sendFile(path.join(publicPath, 'index.html'));
  // res.redirect(`https://${req.headers.host}${req.url}`);
});

app.listen(port, () => {
  console.log('Server is up!');
}); // port, callback function when server is up
