// opgave12.1.js
const earthquakeUrl = // https://earthquake.usgs.gov/earthquakes/feed/v1.0/geojson.php 
    'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_week.geojson/asdasd';




const getEarthquakes = async () => {
    const response = await fetch(earthquakeUrl);
    if (!response.ok) {
        throw new Error(`Could not get earthquakes: ${response.statusText}, ${response.status}`)
    }
    const json = await response.json();
    return json.features;
}

const fillTable = (earthquakes) => {
    const table = document.getElementById('earthquakes');
    earthquakes.forEach(earthquake => {
        const row = table.insertRow();
        row.insertCell(0).innerHTML = earthquake.properties.mag;
        row.insertCell(1).innerHTML = earthquake.properties.place;
        row.insertCell(2).innerHTML = convertUnixTime(earthquake.properties.time);
    });
}

const convertUnixTime = (unixTime) => {
    const date = new Date(unixTime);
    return formatDate(date);
}

function formatDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    return `${day}-${month}-${year} ${hours}:${minutes}:${seconds}`;
}

const init = async () => {
    try {
        const earthquakes = await getEarthquakes();
        const filteredEarthquakes = earthquakes.filter(earthquake => earthquake.properties.mag >= 5.0);
        filteredEarthquakes.sort((a, b) => b.properties.mag - a.properties.mag)
        fillTable(filteredEarthquakes);
        console.log(filteredEarthquakes);
    }
    catch (error) {
        console.log(error);
    }

}

init();
