const express = require('express')
const cookieParser = require('cookie-parser')
const logger = require('morgan')

const mongoose = require('mongoose')
const indexRouter = require('./home')
const usersRouter = require('./users')
const apiRouter = require('./api')
const heroRouter = require('./hero')

mongoose.connect(
  'mongodb://aibing:aibing123@124.156.105.122:27017/test?authSource=admin',
  { useNewUrlParser: true, useUnifiedTopology: true }
)
mongoose.Promise = global.Promise
const db = mongoose.connection
db.on('error', console.error.bind(console, 'MongoDB 连接错误：'))
db.on('connected', console.log.bind(console, 'MongoDB 连接成功：'))
db.on('disconnected', console.warn.bind(console, 'MongoDB 断开连接：'))

// const app = express()
const router = express.Router()
router.use(logger('dev'))
router.use(express.json())
router.use(express.urlencoded({ extended: false }))
router.use(cookieParser())
// router.use(express.static(path.join(__dirname, 'public')))

router.get('/favicon.ico', (req, res) => res.status(204))

router.use('/', indexRouter)
router.use('/users', usersRouter)
router.use('/api', apiRouter)
router.use('/hero', heroRouter)

module.exports = router
