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
    const { value, tags } = await getRandomQuote();
    showQuote(value, tags);
}

async function getRandomQuote() {
    const response = await get("https://www.tronalddump.io/random/quote");
    return response;
}

async function getQuotesByTag(tag) {
    const response = await get(
        `https://www.tronalddump.io/search/quote?tag=${tag}`
    );
    return response;
}

function showQuote(value, tags) {
    div.innerHTML += `<p>${value}</p>`;
    tags.forEach(tag => {
        div.innerHTML += `<span>${tag}</span>`;
    });

    document.querySelectorAll("span").forEach(span => {
        span.addEventListener("click", handleTagClick);
    });
}

button.addEventListener("click", handleButtonClick);

async function handleButtonClick() {
    const { value, tags } = await getRandomQuote();
    div.innerHTML = "";
    showQuote(value, tags);
}

async function handleTagClick() {
    const response = await getQuotesByTag(this.innerText);
    div.innerHTML = "";
    console.log(response);
    response._embedded.quotes.forEach(quote =>
        showQuote(quote.value, quote.tags)
    );
}

main();
