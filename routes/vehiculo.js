const express = require('express');
const { Vehiculo } = require('../model/Vehiculo')
const app = express();
app.get('/', function(req, res) {
    res.json('arriba')


})

app.get('/app/vehiculo/:id', function(req, res) {
    let id = req.params.id

})

app.get('/app/vehiculo', function(req, res) {
    const body = req.body;


    Vehiculo.findAll({
        
        })
        .then(busca => {
            res.json(busca)
        })

})


app.post('/app/vehiculo', function(req, res) {
    let body = req.body;
    Vehiculo.create({
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