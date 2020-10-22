var express = require('express')
var mongoose = require('mongoose')
var bodyParser = require('body-parser')
var fileUpload = require('express-fileupload')

// App
var app = express()
var server = require('http').createServer(app)

// Routes
var routes = require('./routes/routes')

// Other
var controller = require('./controllers/controller')

var databaseName = 'Test'
mongoose.connect('mongodb://localhost/' + databaseName, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

var db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', function() {
    console.log('Connected to database: ' + databaseName)
})

// Configure Passport Users
controller.configure(app)

app.use(bodyParser.urlencoded({
    extended: true
}))
app.use(fileUpload())
app.set("secretKey", "DaveIsCool")

app.set('views', 'public/views/pages')
app.set('view engine', 'ejs')

app.use(express.static('public'))
app.use(express.static('files'))
app.use('/', routes)

server.listen(process.env.PORT || 80, function() {
    console.log("Starting Server")
})
