var express = require('express')
var app = express()
var bodyParser = require('body-parser');

var info = {
    name: 'cjs',
    age: 25
}

app.use(bodyParser.urlencoded({ extended: true }));
app.set('views', './views')
app.set('view engine', 'ejs')

app.use('/static', express.static('static'));

app.get('/', function (req, res) {
    res.render('index')
})

app.get('/json', function (req, res) {
    setTimeout(function() {
        res.send(req.query)
    }, 1500)
})

app.post('/json', function (req, res) {
    res.send(req.body)
})

app.listen(8081, function () {
    console.log('success on 8081')
})