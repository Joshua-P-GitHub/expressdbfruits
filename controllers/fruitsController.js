const express = require('express')
const router = express.Router()
const Fruit = require('../models/fruit')




router.get('/seed', (req, res)=>{
  Fruit.create([
      {
          name:'grapefruit',
          color:'pink',
          readyToEat:true
      },
      {
          name:'grape',
          color:'purple',
          readyToEat:false
      },
      {
          name:'avocado',
          color:'green',
          readyToEat:true
      }
  ], (err, data)=>{
      res.redirect('/fruits');
  })
});

// I.N.D.U.C.E.S
// ==============
// Index
router.get('/', async (req, res) => {
  console.log('Index Controller Func. running...');
  try {
    const foundFruit = await Fruit.find({})
    console.log(foundFruit);
    res.status(200).render('fruits/Index', {fruits: foundFruit})
  } catch (error) {
    res.status(400).send(error)
  }
});

// New // renders a form to create a new fruit
router.get('/new', (req, res) => {
  res.render('fruits/New');
});

//DELETE

router.delete('/:id', async (req,res) => {
 try {
  await Fruit.findByIdAndDelete(req.params.id)
  res.redirect('/fruits')
 } catch (error) {
  
 }
})

//update

router.put('/:id', async (req, res) => {
  try {
    req.body.readyToEat = req.body.readyToEat === 'on';
    const updatedFruit = await Fruit.findByIdAndUpdate(req.params.id, req.body, {new: true})
    res.redirect(`/fruits/${req.params.id}`)
  } catch (error) {
    res.status(400).send(error)
  }
})

// Create // recieves info from new route to then create a new fruit w/ it
router.post('/', async (req, res) => {
  try {
    req.body.readyToEat = req.body.readyToEat === 'on';
    const newFruit = await Fruit.create(req.body)
    console.log(newFruit);
    //console.log(fruits);
    // redirect is making a GET request to whatever path you specify
    res.redirect('/fruits');
  } catch (error) {
    res.status(400).send(error)
  }
});
//edit 
router.get('/:id/edit', async (req,res) => {
  try { 
    const foundFruit = await Fruit.findById(req.params.id)
    res.render('fruits/edit', {fruit: foundFruit})
  } catch (error) {
    
  }
})

// Show
router.get('/:id', async (req, res) => {
 try {
  const foundFruit = await Fruit.findById(req.params.id)
  res.render('fruits/Show', {fruit: foundFruit})
 } catch (error) {
  res.status(400).send(error)
 }
});


module.exports = router