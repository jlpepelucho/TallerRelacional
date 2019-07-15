const Sequelize = require('sequelize');
const Model = Sequelize.Model;
const sequelize = new Sequelize('Taller', 'root', '', {
    dialect: 'mysql'
})
class Marca extends Model {}
Marca.init({
    CODIGO: {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true
    },
    NOMBRE: {
        type: Sequelize.STRING
            // allowNull defaults to true
    }
}, {
    sequelize,
    modelName: 'marca',
    freezeTableName: true,
    timestamps: false
        // options
});

module.exports = {
    Marca
}