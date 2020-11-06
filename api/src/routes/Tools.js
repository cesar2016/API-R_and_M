const server = require('express').Router();
const e = require('express');
const { Tools, Category } = require('../db.js');


//**************************************
//|                T O O L S           |
//|                                    |
//**************************************
server.get('/', (req, res, next) => {
    Tools.findAll()
    .then(tools => {
        res.send(tools)
    })
    .catch(err => console.log(err))
})

server.get('/:id', (req, res, next) => {
    const { id } = req.params
    Tools.findOne({where: {id}})
    .then(tool => {
        res.send(tool)
    })
    .catch(next)
}) 

server.post('/insertTools', (req, res, next) => {
      Tools.create(req.body)
      .then(date => {
        res.send(date)
    })
  })

server.put('/update/:id', (req, res, next) => {
    const { name, description, stock, categoryId } = req.body
    //console.log(name, description, stock, categoryId)
    Tools.findOne({where: {id: req.params.id}})
    .then(tools => {
		tools.update({
			name,
			description,
            stock,
            categoryId
        })
        return tools
	})
    .then(tools => {
        res.send(tools)
    })
    .catch(err => {
        console.log("este es el error", err)
        return err
    })
});

// server.delete('/delete/:id', (req, res, next) => {
//     const id = req.params.id;
//     tools.destroy({ where: { id: id } })
//       .then((num) => {
//         if (num > 0) {
//           return res.send({ message: `Se elimino la herramienta Nº: ${id}` })
//         }
//         return res.send({
//           message: `No se pudo eliminar la herramienta Nº : ${id}`,
//         })
//       })
//       .catch((error) => next(error));
//   })
  

//**************************************
//|                CATEGORIES          |
//|                                    |
//**************************************
server.post('/insertCategory', (req, res, next) => {

    console.log(req.body)  
    const {nameCategory} = req.body 
    
    Category.create({name: nameCategory})

  .then(date => {
      res.send(date)
  })
  })

  server.get('/category', (req, res, next) => {
    Category.findAll()
    .then(categorys => {
        res.send(categorys)
    })
    .catch(err => console.log(err))
})

 
module.exports = server;