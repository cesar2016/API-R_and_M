const server = require('express').Router();
const { Episode } = require('../db.js');

////////////////////////////
//    		/category	////
////////////////////////////

server.post('/', (req, res) => {
    Episode.create(req.body)
    .then(cat => res.send(cat))
    .catch(err => console.log(err))
})

server.get('/', (req, res) => {
    Episode.findAll()
    .then(cat => res.send(cat).status(200))
    .catch(err => console.log(err))
})

server.delete('/:id', (req, res) => {
    Episode.findOne({
        where: {
            id: req.params.id
        }
    }).then(cat => {
        var aux = cat
        cat.destroy()
        res.send(aux)
    })
    .catch(err => console.log(err))
})

module.exports = server;