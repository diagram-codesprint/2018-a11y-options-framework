const util = require('util');
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();
const port = 3001;

//Configuring the body-parser middleware to handle POST requests
app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());

app.get('/', function(request, response) {
    console.log('Hello from Express!');
    response.sendFile(path.join(__dirname + '/index.html'));
});


app.post( '/preferences', function( request, response){

    console.log( 'in post preferences');
    let preferencesJSON = request.body;
    fs.writeFileSync('data/' + preferencesJSON.filename, JSON.stringify(preferencesJSON));
    console.log( preferencesJSON);
    response.end("{saved: true}");

});
app.get( '/preferences/:filename', function( request, response){

    response.end(fs.readFileSync('data/' + request.params.filename));

});


app.use( '/css', express.static('css/'));

app.use( '/js', express.static('js/'));

app.use(function(request, response){
    if( request.status === 404) {
        console.log("Returning 404 error page");
        response.sendFile(path.join(__dirname + '/404.html'));
    }
});

app.listen(port, function(err) {
    if(err) {
        console.log("The following error has occured : \n" + err);
    }

    console.log('server is listening on ' + port);
});
