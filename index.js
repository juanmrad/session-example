const express = require('express');
const app = express();
const session = require('express-session');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(session({
    secret: 'tacocat',
    resave: true,
    saveUninitialized: true
}));

app.use(function(request, response, next) {
    if (request.session.user) {
        next();
    } else if (request.path == '/') {
        next();
    } else {
        response.redirect('/');
    }
});

app.use(express.static(__dirname + '/public'));

app.post('/', function(request, response) {
    var username = request.body.username;
    var password = request.body.password;
    console.log(username, password);
    if (username == 'aaron' && password == 'narf') {
        request.session.user = username;
        response.redirect('/admin');
    } else {
        response.redirect('/');
    }
});

app.get('/logout', function(request, response) {
    request.session.destroy();
    response.redirect('/');
})

app.listen(3000, function() {
    console.log("My API is now listening on port 3000...");
});