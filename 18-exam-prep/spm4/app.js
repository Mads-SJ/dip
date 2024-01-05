const express = require("express");
const app = express();
const session = require("express-session");

app.set("view engine", "pug");
app.set("views", "templates");

app.use(express.static("filer"));
app.use(express.json());
app.use(session({ secret: "hemmelig", saveUninitialized: true, resave: true }));

app.get("/", function (request, response) {
    response.render("index", { personer: request.session.personer });
});

app.post("/", function (request, response) {
    const person = request.body;

    let personer = request.session.personer || [];
    personer.push(person);
    request.session.personer = personer;

    response.status(201).send();
});

app.listen(8080);

console.log("Lytter på port 8080 ...");
