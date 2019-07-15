const express = require('express')
const Sequelize = require('sequelize');

const app = express()
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }))
    // parse application/json
app.use(bodyParser.json())

app.use(require('./routes/marca'))

app.listen(3000, () => {
    console.log('servidor arriba');
})