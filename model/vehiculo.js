const Sequelize = require('sequelize');
const Model = Sequelize.Model;
const sequelize = new Sequelize('Taller', 'root', '', {
    dialect: 'mysql'
})
class Vehiculo extends Model {}
Vehiculo.init({
    PLACA: {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true
    },
    CODIGO: {
        type: Sequelize.STRING,
        references: {
            model: 'marca',
            key: 'CODIGOMARCA'
        }
    },
    PROPIETARIO: {
        type: Sequelize.STRING,
        references: {
            model: 'propietario',
            key: 'cedula'
        }
    },
    CODIGOMODELO: {
        type: Sequelize.STRING,
        references: {
            model: 'modelo',
            key: 'CODIGOMODELO'
        }
    },
    ANIO: {
        type: Sequelize.NUMBER
            // allowNull defaults to true
    },
    MOTOR: {
        type: Sequelize.NUMBER
            // allowNull defaults to true
    },
    TRANSMISION: {
        type: Sequelize.STRING
            // allowNull defaults to true
    }
}, {
    sequelize,
    modelName: 'vehiculo',
    freezeTableName: true,
    timestamps: false
        // options
});

module.exports = {
    Vehiculo
}