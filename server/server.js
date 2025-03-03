require('dotenv').config();
const express = require('express');

// Instantiate an express server:
const app = express();

// Use process.env.PORT if it exists, otherwise use 5001:
const PORT = process.env.PORT || 5001;

// Require auth-related middleware:
const sessionMiddleware = require('./modules/session-middleware');
const passport = require('./strategies/user.strategy');

// Require router files:
const userRouter = require('./routes/user.router');
const foundRouter = require('./routes/found.router');
const itemsRouter = require('./routes/items.router');
const catagoriesRouter = require('./routes/categories.router');
const favoriteRouter = require('./routes/favorites.router');

// Apply middleware:
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({extended: true}));
app.use(express.static('build'));
app.use(sessionMiddleware);
app.use(passport.initialize());
app.use(passport.session());
//increases the file size that you can send through express

// Apply router files:
app.use('/api/user', userRouter);
app.use('/api/found', foundRouter);
app.use('/api/items', itemsRouter);
app.use('/api/categories', catagoriesRouter);
app.use('/api/favorites', favoriteRouter);


// Start the server:
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
