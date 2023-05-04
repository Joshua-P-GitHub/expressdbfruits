require('dotenv').config()
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const Vegetable = require('./models/vegetable')
const methodOverride = require('method-override')
const fruitContoller = require('./controllers/fruitsController')

//database connection
const { connect, connection} = require('mongoose')

connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
connection.once('open' , () => {
  console.log('connected to mongo');
})
// View Engine Middleware Configure
const reactViewsEngine = require('jsx-view-engine').createEngine();
app.engine('jsx', reactViewsEngine);
// This line tells the render method the default file extension to look for.
app.set('view engine', 'jsx');
// This line sets the render method's default location to look for a jsx file to render. Without this line of code we would have to specific the views directory everytime we use the render method
app.set('views', './views');

// Custom Middleware
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride('_method'));
app.use(express.static('public'))
app.use((req, res, next) => {
  console.log('Middleware running...');
  next();
});
//seed route





app.use('/fruits', fruitContoller)
// I.N.D.U.C.E.S
// ==============
//Index
app.get('/vegetables' , async function(req, res){
  try {
    const foundVegetable = await Vegetable.find({})
    console.log(foundVegetable)
    res.status(200).render('vegetables/IndexVegetable', {vegetables: foundVegetable})
  } catch (error) {
    res.status(400).send(error)
  }
})

//New
app.get('/vegetables/new', (req, res) => {
  res.render('vegetables/New')
})

//create
app.post('/vegetables', async (req,res) => {
  if (req.body.readyToEat === 'on'){
    req.body.readyToEat = true
  } else {
    req.body.readyToEat = false
  }
  try {
    const newVegetable = await Vegetable.create(req.body)
    console.log(newVegetable);
  } catch (error) {
    res.status(400).send(error)
  }
  res.redirect('/vegetables')
})

//Show
app.get('/vegetables/:id', async function(req, res){
  try {
    const foundVegetable = await Vegetable.findById(req.params.id)
    res.status(200).render('vegetables/ShowVegetables', {vegetable: foundVegetable})
  } catch (error) {
    res.status(400).send(error)
  }
})


app.get('/*', (req, res) => {
  res.redirect('/fruits');
});

// Listen
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
