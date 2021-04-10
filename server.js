const path = require('path'); //allows us to map public dir
const express = require('express'); //package used to run our server

const exphbs = require('express-handlebars'); //brings in handlebars package
const helpers = require('./utils/helpers'); //brings in our helper functions for handlebars

const routes = require('./controllers'); //pull in routes from controller dir
const sequelize = require('./config/connection'); //pull in sequelize connection from config

const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const app = express(); //init express into app
const PORT = process.env.PORT || 3001; //set up PORT, reverts to 3001 if not in .env file 

const sess = {
    secret: 'Super secret secret',
    cookie: {},
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
        db: sequelize,
    }),
};

app.use(session(sess));

const hbs = exphbs.create({helpers});
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars'); //tells express we are using handlebars as templating engine

app.use(express.json());
app.use(express.urlencoded({extended:true})); //these two lines give us access to req.body

app.use(express.static(path.join(__dirname, 'public'))); //this set up static pathways to our public dir

app.use(routes); //this will send all the http request to the controllers dir where we will handle them, don't put middleware below or it won't fire



sequelize.sync({ force: false }).then(() => { //establish sequelize connection to db
    app.listen(PORT, () => console.log('App listening on PORT: ' + PORT))
}); //starts app listening for http request at specified port