async function get(url) {
    const respons = await fetch(url);
    if (respons.status !== 200)
        // OK
        throw new Error(respons.status);
    return await respons.json();
}

async function post(url, objekt) {
    const respons = await fetch(url, {
        method: "POST",
        body: JSON.stringify(objekt),
        headers: { "Content-Type": "application/json" },
    });
    if (respons.status !== 201)
        // Created
        throw new Error(respons.status);
    return await respons.text();
}

const div = document.querySelector("#result");
const button = document.querySelector("button");
async function main() {
    loadRandomQuotes();
}

function showQuote(value, tags) {
    div.innerHTML += `<p>${value}</p>`;
    tags.forEach(tag => {
        div.innerHTML += `<span>${tag}</span>`;
    });
}

button.addEventListener("click", loadRandomQuotes);

async function loadRandomQuotes() {
    try {
        const response = await Promise.all([
            get("https://www.tronalddump.io/random/quote"),
            get("https://www.tronalddump.io/random/quote"),
            get("https://www.tronalddump.io/random/quote"),
        ]);
        div.innerHTML = "";
        response.forEach(({ value, tags }) => {
            showQuote(value, tags);
        });
    } catch (error) {
        div.innerHTML = "Der er sket en fejl.";
    }
}

main();
