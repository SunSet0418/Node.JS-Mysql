var express = require('express')
var bodyParser = require('body-parser')
var mysql = require('mysql')
var fs = require('fs')
var app = express();

var sql = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'PassTlqkf',
    database: 'Nodejs'
});

app.use(bodyParser.urlencoded({
    extended: true
}))

sql.connect(function (err) {
    if (err) {
        console.error('mysql connection error');
        throw err;
    }
    else {
        console.log('DB Connect Success!')
    }
});

app.listen(3000, function (err) {
    if (err) {
        console.error('Server Error!')
        throw err
    }
    else {
        console.log('Server Running At 3000 Port!')
    }
})

app.get('/', function (req, res) {
    fs.readFile('index.html', 'utf-8', function (err, data) {
        res.send(data)
    })
})

app.post('/', function (req, res) {
    var body = req.body;
    console.log(body)
    sql.query('INSERT INTO user (username, id, password) VALUES (?, ?, ?)', [body.username, body.id, body.password],
        function (err) {
            if (err) {
                console.error(err);
                throw err;
            }
            else {
                res.send("Success")
            }
        });
})



