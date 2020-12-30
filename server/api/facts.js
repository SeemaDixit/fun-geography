const { Router } = require('express');

const facts = require('../models/LocationFacts');

const {
  API_KEY
} = process.env;

const router = Router();

router.get('/', async (req, res, next) => {
  try {
    const allEntries = await facts.find();
    res.json(allEntries);
  } catch(error) {
    next(error);
  }

});
router.post('/', async (req,res, next) => {
  try {
    if(req.get('X-API-KEY') !== API_KEY) {
      res.status(401);
      throw new Error('UnAuthorized');
    }

    const fact = new facts(req.body);
    const createdFact = await fact.save();
    res.json(createdFact);
  } catch (error) {

    if(error.name === 'ValidationError') {
      res.status(422);
    }
    next(error);
  }
});

module.exports = router;
