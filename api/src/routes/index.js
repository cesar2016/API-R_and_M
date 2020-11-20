const { Router } = require('express');
// import all routers;
const clientsRouter = require('./Clients.js');
const episodeRouter = require('./Episode.js');


const router = Router();


router.use('/clients', clientsRouter); 
router.use('/Episode', episodeRouter);

module.exports = router;
