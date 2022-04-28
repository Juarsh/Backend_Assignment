const router = require('express').Router();

const { postReportsController, getReportsController } = require('../controllers');

router.post('/', postReportsController);                          

router.get('/', getReportsController);        

module.exports = router;
