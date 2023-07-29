const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
    console.log('hello world')
 res.status(200).send('Hello World from the server!');
});

app.listen(port, () => {
 console.log('App listening on port: ' + port);
});