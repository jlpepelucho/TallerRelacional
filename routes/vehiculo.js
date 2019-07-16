const express = require('express');
const { Vehiculo } = require('../model/Vehiculo')
const { Propietario } = require('../model/propietario')
const app = express();
app.get('/', function (req, res) {
    res.json('arriba')


})

app.get('/app/vehiculo/:id', function (req, res) {
    let id = req.params.id
    Vehiculo.findAll({
        where: {
            PLACA: id

        }
    })
        .then(buscaVehiculo => {
            Propietario.findAll({
                where: {
                    CEDULA: buscaVehiculo[0].PROPIETARIO

                }
            })
                .then(busca => {
                    buscaVehiculo[0].PROPIETARIO = busca;
                    res.json(buscaVehiculo)
                })

        })

})

app.get('/app/vehiculo/Marca/:id', function (req, res) {
    let id = req.params.id
    Vehiculo.findAll({
        where: {
            CODIGO: id

        }
    })
        .then(buscaVehiculo => {
            res.json(buscaVehiculo)

        })

})
app.get('/app/vehiculo/Modelo/:id', function (req, res) {
    let id = req.params.id
    Vehiculo.findAll({
        where: {
            CODIGOMODELO: id

        }
    })
        .then(buscaVehiculo => {
            res.json(buscaVehiculo)

        })

})
app.get('/app/vehiculo', function (req, res) {
    Vehiculo.findAll({})
        .then(buscaVehiculo => {
            res.json(buscaVehiculo)

        })

})

app.put('/app/vehiculo/propietarios', function (req, res) {
    let body = req.body;
    
    Vehiculo.update({ PROPIETARIO: req.body.PROPIETARIO.CEDULA}, {
        where:{
            PLACA: req.body.PLACA
        }
    }) .then(buscaVehiculo => {
           
            res.json(buscaVehiculo);

        }).catch(() => {
            return res.status(404).json();
        })

})

app.get('/app/vehiculo/propietarios/:id', function (req, res) {
    let id = req.params.id
    Propietario.findAll({}).then(respuesta => {
            var resultado = [];
            if (respuesta.length == 0) {
                return res.status(404).json();
            }
            for (var i = 0; i < respuesta.length; i++) {

                var hoy = new Date();
                var cumpleanos = new Date(respuesta[i].FECHANACIMIENTO);
                var edad = hoy.getFullYear() - cumpleanos.getFullYear();
                var m = hoy.getMonth() - cumpleanos.getMonth();

                if (m < 0 || (m === 0 && hoy.getDate() < cumpleanos.getDate())) {
                    edad--;
                }
                console.log(edad)
                console.log(id)



                if (id < edad) {

                    Vehiculo.findAll({
                        where: {
                            PROPIETARIO: respuesta[i].CEDULA

                        }
                    }).then(buscaux => {
                        //
                        for (var j = 0; j < buscaux.length; j++) {
                        resultado.push(buscaux[j]);
                        console.log(buscaux[j])
                        }
                        
                        
                    })
                }
              
            }
            
            if (resultado.length != 0) {

                res.json(resultado);
            } else {
                res.json(resultado);
                // return res.status().json();

            }
           
        })

})

app.post('/app/vehiculo', function (req, res) {
    let body = req.body;
    Propietario.findAll({
        where: {
            CEDULA: body.PROPIETARIO.CEDULA

        }
    })
        .then(busca => {
            if (busca.length === 0) {
                Propietario.create({
                    CEDULA: body.PROPIETARIO.CEDULA,
                    NOMBRE: body.PROPIETARIO.NOMBRE,
                    FECHANACIMIENTO: body.PROPIETARIO.FECHANACIMIENTO

                })
                    .then((created) => {

                        return res.json(created);

                    }).catch(() => {
                        return res.status(404).json();
                    })
            }
            if ((body.ANIO <= 2019) && (body.ANIO >= 1800)) {
                if ((body.MOTOR < 10000) && (body.MOTOR > 0)) {
                    if ((body.TRANSMISION == "MAN") || (body.TRANSMISION == "AUT")) {
                        if (body.PLACA.length <= 7) {
                            Vehiculo.create({
                                PLACA: body.PLACA,
                                CODIGO: body.CODIGO,
                                PROPIETARIO: body.PROPIETARIO.CEDULA,
                                CODIGOMODELO: body.CODIGOMODELO,
                                ANIO: body.ANIO,
                                MOTOR: body.MOTOR,
                                TRANSMISION: body.TRANSMISION
                            })
                                .then((created) => {
                                    return res.json(created);


                                }).catch(() => {
                                    return res.status(404).json();
                                })
                        } else { return res.status(404).json(); }
                    } else { return res.status(404).json(); }
                } else { return res.status(404).json(); }
            } else { return res.status(404).json(); }
        })


})

module.exports = app;