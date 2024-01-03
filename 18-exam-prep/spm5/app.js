const express = require("express");
const app = express();

const contacts = [
    { id: 0, name: "Anders", phone: "12345678" },
    { id: 1, name: "Birgitte", phone: "87654321" },
];

app.set("view engine", "pug");
app.set("views", "templates");

app.use(express.static("filer"));
app.use(express.json());

app.get("/", function (request, response) {
    response.render("index", { contacts });
});

app.patch("/", function (request, response) {
    const { id, newPhoneNumber } = request.body;
    console.log("patching");
    const contact = contacts.find(contact => contact.id === Number(id));
    if (contact) {
        contact.phone = newPhoneNumber;
    }
    response.render("index", {
        contacts,
    });
});

app.listen(8080);

console.log("Lytter på port 8080 ...");
