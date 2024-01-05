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

const input = document.querySelector("input");
const updateButtons = document.querySelectorAll("button");
console.log(input, updateButtons);
updateButtons.forEach(updateBtn => {
    updateBtn.addEventListener("click", async () => {
        const id = Number(updateBtn.id);
        const newPhoneNumber = input.value;
        try {
            await fetch("http://localhost:8080", {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    id,
                    newPhoneNumber,
                }),
            });
            location.reload();
        } catch (error) {
            alert("something went wrong.");
            console.log(error);
        }
    });
});
