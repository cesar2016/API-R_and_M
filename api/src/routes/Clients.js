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

server.post('/register', (req, res) => {
	Client.create(req.body.data)
	.then(data => res.send(data))
	.catch(err => console.log(err))
})

// server.post('/insertClients', (req, res, next) => {
// 	Client.create(req.body)
// 	.then(date => {
// 	  res.send(date)
//   })
// })

server.put('/update/:id', (req, res) => {
	const { name, lastname, dni, password, email } = req.body;
	console.log("este es id", req.params.id)
	Client.findOne({
		where: { id: req.params.id }
	}).then(cliente => {
		console.log("este es cliente", cliente)
		cliente.update({
			name,
			lastname,
			dni,
			password,
			email
		})
	})
})

server.delete('/delete/:id', (req, res) => {
	Client.findOne({
		where: {
			id: req.params.id
		}
	}).then(cliente => {
		var aux = cliente
		cliente.destroy()
		res.send(aux).status(201)
	})
	.catch(err => console.log(err))
})


module.exports = server;
