let flightResults = document.getElementById("flight-results");
let from = document.getElementById("origin");
let to = document.getElementById("destination");
let best = document.getElementById("best");
let fast = document.getElementById("fast");
let cheap = document.getElementById("cheap");
best.addEventListener("click", function () { console.log("best"); });
fast.addEventListener("click", function () { console.log("fast"); });
cheap.addEventListener("click", function () { console.log("cheap"); });
from.addEventListener("keydown", function (event) { setFrom(event) });
to.addEventListener("keydown", function (event) { setTo(event) });

function setFrom(event) {
    if (event.key == "Enter") {
        console.log(from.value);
    }
}

function setTo(event) {
    if (event.key == "Enter") {
        console.log(to.value);
    }
}

// const options = {
//     method: 'GET',
//     headers: {
//         'X-RapidAPI-Key': '0b79b099b5msh09c633338db7d73p1589c4jsn9bb102dc0ee7',
//         'X-RapidAPI-Host': 'skyscanner44.p.rapidapi.com'
//     }
// };

// fetch('https://skyscanner44.p.rapidapi.com/search?adults=1&origin=IAD&destination=MCO&departureDate=2022-12-17&currency=USD', options)
//     .then(response => response.json())
//     .then(response => formattFlights(response))
//     .catch(err => console.error(err));

// function formattFlights(jsonInfo) {
//     let flight = jsonInfo.itineraries.buckets[0].items[0].legs[0];
//     flightResults.innerText = `${flight.origin.displayCode} to ${flight.destination.displayCode}\n
//     Departure Date and Time: ${flight.departure}
//     Duration: ${flight.durationInMinutes}
//     `
//     console.log(flight);
//     console.log(flightResults.innerText);
// }