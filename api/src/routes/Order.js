const server = require('express').Router();
const { Order } = require('../db.js');

//POST --> Generar o buscar una order

server.post('/', (req, res, next) => {
  console.log("Lo que me llega como body es: ", req.body)
  Order.findOne({
    where: {
      clientId: req.body.clientId,
      status: "true"
    }})
    .then(order => {
      if(!order) {
        Order.create({
          clientId: req.body.clientId,
          status: "true"
        })
    .then(created =>
      res.status(200)
      .send(created)
      )}
      else
        return res.status(201).send(order)
  }).catch(next);
});

//GET --> Obtiene todas las ordenes existentes

server.get('/', (req, res, next) => {
  Order.findAll()
    .then(order => {
        res.send(order);
    })
    .catch(next)
});

//GET --> Obtener una orden por su ID

server.get('/:id', (req, res, next) => {
  Order.findAll({
    where: {
      clientId: req.params.id
    }
  })
  .then(order => {
    res.send(order)
  })
  .catch(next)
})

module.exports = server;