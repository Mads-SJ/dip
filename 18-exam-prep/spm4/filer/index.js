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

const button = document.querySelector("button");
button.addEventListener("click", async () => {
    const name = document.getElementById("navn").value;
    const address = document.getElementById("adresse").value;
    try {
        const response = await post("http://localhost:8080", { name, address });
        location.reload();
    } catch (error) {
        console.error(error);
    }
});
