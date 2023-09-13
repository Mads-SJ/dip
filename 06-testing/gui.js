import { addPerson, find, filter, persons } from "./logic.js"

let addButton = document.querySelector("#addButton")
let searchButton = document.querySelector("#searchButton")
let nameSearchInput = document.getElementById("navnSøgning")
let filterButton = document.getElementById("filterButton")

addButton.onclick = () => {
    let navn = document.querySelector("#navn").value
    let alder = parseInt(document.querySelector("#alder").value)
    if (alder != NaN) {
        addPerson(navn, alder)
        document.querySelector("#Vispersoner").innerHTML = generateTable(persons);
    }else {
        alert("not a number")
    }
}

searchButton.addEventListener("click", () => {
    const searchResult = find(nameSearchInput.value)
    if (searchResult !== null) {
        document.querySelector("#Vissøgning").innerHTML = `Navn: ${searchResult.name}, Alder: ${searchResult.age}`
    }
});

filterButton.addEventListener("click", () => {
    const filterResult = filter(25);
    document.querySelector("#Vispersoner").innerHTML = generateTable(filterResult);
})

function generateTable(persons) {
    let retur = "<table>";
    for(let person of persons) {
        retur += `<tr><td>${person.name}</td><td>${person.age}</td></tr>`
    }
    retur += "</table>"
    return retur
}