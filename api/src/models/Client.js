const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  const Client = sequelize.define('client', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    species: {
      type: DataTypes.STRING,      
    },
    
    type: {
    	type: DataTypes.STRING,
    },    
    gender: {
    	type: DataTypes.STRING,
    },
    origin:{
      type: DataTypes.STRING,
    },
    image: {
    	type: DataTypes.STRING,
    }    
  });
};
