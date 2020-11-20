const server = require('express').Router();
const { Client } = require('../db.js');
const { Op } = require('sequelize');

////////////////////////////
//    		/clients	////
////////////////////////////


server.get('/', (req, res, next) => {
	Client.findAll()
		.then(clientes => {
			res.send(clientes);
		})
		.catch(next);
});

server.get('/search', (req, res) => {
	const cliente = req.query.cliente
	Client.findAll({
		where: {
			[Op.or]: [{ cliente: { [Op.like]: `%${cliente}%`} }]
		}
	}).then(data => res.send(data))
	.catch(err => console.log(err))
})

server.post('/addClient', (req, res) => {
console.log(req.body)
	Client.create(req.body)
	.then(data => res.send(data))
	.catch(err => console.log(err))
})


server.put('/updateClient/:id', (req, res) => {
	const { name, status, species , type, gender, origin, image } = req.body
    //console.log(name, lastname, dni, email, phoneA, city, address, bussiness )
    Client.findOne({where: {id: req.params.id}})
    .then(cliente => {
		cliente.update({
			name,
			status, 
			species, 
			type, 
			gender, 
			origin, 
			image			 
        })
        return cliente
	})
    .then(cliente => {
        res.send(cliente)
    })
    .catch(err => {
        console.log("este es el error", err)
        return err
    })
})

server.delete('/delete/:id', (req, res) => {
	const { id } = req.params;
	Client.destroy({ where: { id } })
		.then(result => {            
			res.sendStatus(200);
		})
		.catch(() => res.status(404))
})

//GET --> Obtener una Solo personaje
server.get('/search/:id', (req, res, next) => {
	console.log(req.params.id)
	Client.findAll({
	  where: {
		id: req.params.id
	  }
	})
	.then(per => {
	  res.send(per)
	})
	.catch(next)
  })


module.exports = server;
