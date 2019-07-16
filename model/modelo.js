const Sequelize = require('sequelize');
const Model = Sequelize.Model;
const sequelize = new Sequelize('Taller', 'root', '', {
    dialect: 'mysql'
})
class Modelo extends Model {}
Modelo.init({
    CODIGOMODELO: {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true
    },
    CODIGO: {
        type: Sequelize.STRING,
    },
    NOMBRE: {
        type: Sequelize.STRING
            // allowNull defaults to true
    }
}, {
    sequelize,
    modelName: 'modelo',
    freezeTableName: true,
    timestamps: false
        // options
});

module.exports = {
    Modelo
}