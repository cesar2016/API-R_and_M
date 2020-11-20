const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  const Episode = sequelize.define('episode', {
    name: {
            type: DataTypes.STRING,
            allowNull: true,
        },
  });
};
