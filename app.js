require('dotenv').config()

const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const debug = require('debug')('the-word-game:server')

const createError = require('http-errors')
const cors = require('cors')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const session = require('express-session')
const MongoStore = require('connect-mongo')(session)

// Routes
const indexRouter = require('./routes/index')
const usersRouter = require('./routes/users')

// Database connection
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    keepAlive: true
  })
  .then(x => {
    debug(`Connected to MongoDB! Database name: '${x.connections[0].name}"`)
  })
  .catch(err => {
    debug('Error connecting to MongoDB', err)
  })

const app = express()

app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())

app.use(express.static(path.join(__dirname, 'public')))
// app.use(express.static(path.join(__dirname, 'client/build')))

// Allow frontend access to API (CORS)
app.use(cors())

// Session middleware
app.use(
  session({
    store: new MongoStore({
      mongooseConnection: mongoose.connection,
      ttl: 24 * 60 * 60 // 1 day
    }),
    secret: process.env.SECRET_SESSION,
    resave: true,
    saveUninitialized: true,
    cookie: {
      maxAge: 24 * 60 * 60 * 1000
    }
  })
)

app.use('/', indexRouter)
app.use('/users', usersRouter)

/* app.get('*', (req, res) => {
  res.sendfile(path.join(__dirname, 'client/build/index.html'))
}) */

// Catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404))
})

// Error handler
app.use((err, req, res, next) => {
  // Set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}
  const status = err.status || 500
  // Respond with error message
  res.status(status).json(err.message)
})

module.exports = app
