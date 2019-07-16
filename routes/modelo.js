const express = require('express');
const { Modelo } = require('../model/modelo')
const app = express();
app.get('/', function(req, res) {
    res.json('arriba')


})

app.get('/app/modelo/:id', function(req, res) {
    let id = req.params.id
    Modelo.findAll({
        where:{
            CODIGOMODELO:id
        }
    })
    .then(busca => {
        res.json(busca)
    })
})

app.get('/app/modelo', function(req, res) {
    const body = req.body;


    Modelo.findAll({
        
        })
        .then(busca => {
            res.json(busca)
        })

})


app.post('/app/modelo', function(req, res) {
    let body = req.body;
    Modelo.create({
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