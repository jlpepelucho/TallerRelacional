const express = require('express');
const { Marca } = require('../model/marca')
const app = express();
app.get('/', function(req, res) {
    res.json('arriba')


})

app.get('/app/marca/:id', function(req, res) {
    let id = req.params.id
    Marca.findOne({
            where: {
                codigo: id
            }

        })
        .then(busca => {
            res.json(busca)
        })
})

app.get('/app/marca', function(req, res) {
    const body = req.body;

    Marca.findAll({

        })
        .then(busca => {
            res.json(busca)
        })

})


app.post('/app/marca', function(req, res) {
    let body = req.body;
    Marca.create({
        CODIGO: body.codigo,
        NOMBRE: body.nombre
    })

    .then((created) => {


        return res.json(created);
    }).catch(() => {
        return res.status(500).json();
    })

})

module.exports = app;