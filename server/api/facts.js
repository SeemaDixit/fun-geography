const { Router } = require('express');

const facts = require('../models/LocationFacts');

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
