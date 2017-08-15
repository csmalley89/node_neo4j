const express = require('express');
const app = express();
const mustacheExpress = require('mustache-express');

const methodOverride = require('method-override');
const bodyParser = require("body-parser");

app.engine('html', mustacheExpress());
app.set('view engine', 'html');
app.set('views', __dirname + '/views');
app.use("/", express.static(__dirname + '/public'));
app.use(methodOverride('_method')) //method override
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());

// neo4j drivers

const neo4j = require('neo4j-driver').v1;

const driver = neo4j.driver('bolt://localhost', neo4j.auth.basic('neo4j', 'capgemini'));

function getQuery() {
    var session = driver.session();
    return session
        .run("MATCH(p:Person) -[r]-(e:Event) RETURN e,p,r")
        .then(result => {
            session.close();
            var resultJSON = JSON.stringify(result.records)
            parseDates(resultJSON)
            return resultJSON;
        })
        .catch(error => {
            session.close();
            throw error;
        });
}


function parseDates(resultJSON) {


    var items = JSON.parse(resultJSON)
    console.log(items)

    var count

    for (var i = 0; i < items.length; i++) {
        count = 0
        count++
    }


    console.log(count)
}

app.get("/", function(req, res) {
    res.render('index')
})



app.get("/try", function(req, res) {

    getQuery()
        .then(result => res.json(result))
        .catch(err => next(new Error(err)))
})

var port = 3000;

app.listen(port, function() {
    console.log("Trying out stuff at " + port)
})