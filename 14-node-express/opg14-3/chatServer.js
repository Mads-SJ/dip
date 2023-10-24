import express from 'express';
import cors from 'cors';

const app = express();
const port = 8080;
let id = 1;
const messages = [
    { chatRum: "Startrum", id: 0, tekst: "Hej med dig!" },
];
const rooms = [
    { navn: "Startrum" },
    { navn: "Rum 1" },
    { navn: "Rum 2" },
    { navn: "Rum 3" }
];

app.use(cors());
app.use(express.json());

app.get("/Beskeder", async (request, response) => {
    response.status(200).send(messages);
});

app.get("/chatRum", async (request, response) => {
    response.status(200).send(rooms);
});

app.get("/SoegBeskeder/:rum", async (request, response) => {
    const rum = request.params.rum;
    response.status(200).send(messages.filter(message => message.chatRum === rum));
});

app.post("/Beskeder", async (request, response) => {
    const message = request.body;
    message.id = id++;
    messages.push(message);
    response.status(201).send("Message created");
});

app.delete("/Beskeder/:id", async (request, response) => {
    const id = Number(request.params.id);
    const index = messages.findIndex(message => message.id === id);
    if (index === -1) {
        response.status(404).send("Message not found");
    } else {
        messages.splice(index, 1);
        response.status(200).send("Message deleted");
    }
});

app.listen(port);
console.log(`Listening on port ${port} ...`);