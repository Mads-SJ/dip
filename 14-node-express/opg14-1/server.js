import express from 'express';
import fs from 'fs/promises';

const app = express();
const port = 8080;
const __dirname = "C:\\Users\\Mads\\Desktop\\datamatiker\\3. semester\\DIP\\dip\\14-node-express\\opg14-1";

app.use(express.static(__dirname + '/filer'))

app.get('/', async (request, response) => {
    console.log(__dirname);
    let filnavne = await fs.readdir(__dirname + '/filer');
    let html = genererLinks(filnavne);
    response.status(200).send(html);
});

app.get('/:navn', async (request, response) => {
    const filnavn = request.params.navn;
    let sti = __dirname + '/filer/' + filnavn;
    let filData = await fs.readFile(sti);
    response.status(200).send(filData);
});

app.listen(port);
console.log(`Listening on port ${port} ...`);

function genererLinks(filnavne) {
    let html = '';
    for (let filnavn of filnavne) {
        html += '<a href="' + filnavn + '">' + filnavn + '</a><br>\n';
    }
    return html;
}