const Sequelize = require('sequelize');
const Model = Sequelize.Model;
const sequelize = new Sequelize('Taller', 'root', '', {
    dialect: 'mysql'
})
class Propietario extends Model {}
Propietario.init({
    CEDULA: {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true
    },
    NOMBRE: {
        type: Sequelize.STRING
            // allowNull defaults to true
    },FECHANACIMIENTO: {
        type: Sequelize.STRING
            // allowNull defaults to true
    }
},
 {
    sequelize,
    modelName: 'propietario',
    freezeTableName: true,
    timestamps: false
        // options
});

module.exports = {
    Propietario
}