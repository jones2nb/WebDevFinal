let flightResults = document.getElementById("flight-results");
let hotelResults = document.getElementById("hotel-results");
let searchButton = document.getElementById("search");
let filter = null
searchButton.addEventListener("click", function () { printFlight(filter);});
let best = document.getElementById("best");
let fast = document.getElementById("fast");
let cheap = document.getElementById("cheap");
let from = document.getElementById("origin");
let to = document.getElementById("destination");
let date = document.getElementById("date");
let returnDate = document.getElementById("return-date");
let adults = document.getElementById("adults");
let city = "";

best.addEventListener("click", function () {
    if (filter == "best") {
        filter = null; 
        best.checked = false;
    } else {
        filter = "best";
    }});
fast.addEventListener("click", function () { 
    if (filter == "fast") { 
        filter = null; 
        fast.checked = false;
    } else {
        filter = "fast";
    }});
cheap.addEventListener("click", function () { 
    if (filter == "cheap") { 
        filter = null; 
        cheap.checked = false;
    } else {
        filter = "cheap";
    }});

const options = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': '0b79b099b5msh09c633338db7d73p1589c4jsn9bb102dc0ee7',
        'X-RapidAPI-Host': 'skyscanner44.p.rapidapi.com'
    }
};

function printFlight(filter) {
    from = document.getElementById("origin");
    to = document.getElementById("destination");
    date = document.getElementById("date");
    adults = document.getElementById("adults");
    
    if (from.value == "" || to.value == "" || date.value == "") {
        alert("Please fill out all fields");
        return;
    }
    if (filter == null) {
        fetch(`https://skyscanner44.p.rapidapi.com/search-extended?adults=${adults.value}&origin=${from.value}&destination=${to.value}&departureDate=${date.value}&currency=USD`, options)
        .then(response => response.json())
        .then(response => formattFlights(response, filter))
        .then(function() {fetchHotelInfo(city)})
        .catch(err => console.log(err))
    } else {
        fetch(`https://skyscanner44.p.rapidapi.com/search?adults=${adults.value}&origin=${from.value}&destination=${to.value}&departureDate=${date.value}&currency=USD`, options)
        .then(response => response.json())
        .then(response => formattFlights(response, filter))
        .then(function() {fetchHotelInfo(city)})
        .catch(err => console.log(err))
    }
}


function formattFlights(jsonInfo, filter) {
    flightResults.innerText = "";
    console.log(filter);
    if (filter == null) {
        let results = jsonInfo.itineraries.results;
        city = results[0].legs[0].segments[results[0].legs[0].segments.length - 1].destination.parent.name;
        for (i = 0; i < 5; i++) {
            if (results.length < i) {
                break;
            }
            console.log(results[i].legs[0]);
            flightResults.innerText += `
                ${results[i].legs[0].origin.displayCode} to ${results[i].legs[0].destination.displayCode}
                Departure Date and Time: ${results[i].legs[0].departure}
                Duration: ${results[i].legs[0].durationInMinutes} minutes\n`
        }
        console.log(flightResults.innerText);
    } else if (filter == "best") {
        let results = jsonInfo.itineraries.buckets[0].items;
        city = results[0].legs[0].destination.city;
        for (i = 0; i < 5; i++) {
            if (results.length <= i) {
                break;
            }
            flightResults.innerText += `
                ${results[i].legs[0].origin.displayCode} to ${results[i].legs[0].destination.displayCode}
                Departure Date and Time: ${results[i].legs[0].departure}
                Duration: ${results[i].legs[0].durationInMinutes}
                Flight Score: ${results[i].score}\n
                `;
        }
    } else if (filter == "fast") {
        let results = jsonInfo.itineraries.buckets[1].items;
        city = results[0].legs[0].destination.city;
        for (i = 0; i < 5; i++) {
            if (results.length <= i) {
                break;
            }
            flightResults.innerText += `
                ${results[i].legs[0].origin.displayCode} to ${results[i].legs[0].destination.displayCode}
                Departure Date and Time: ${results[i].legs[0].departure}
                Duration: ${results[i].legs[0].durationInMinutes}
                Flight Score: ${results[i].score}\n
                `;
        }
    } else {
        let results = jsonInfo.itineraries.buckets[2].items;
        city = results[0].legs[0].destination.city;
        for (i = 0; i < 5; i++) {
            if (results.length <= i) {
                break;
            }
            flightResults.innerText += `
                ${results[i].legs[0].origin.displayCode} to ${results[i].legs[0].destination.displayCode}
                Departure Date and Time: ${results[i].legs[0].departure}
                Duration: ${results[i].legs[0].durationInMinutes}
                Flight Score: ${results[i].score}\n
                `;
        }
    }
    
}

function fetchHotelInfo(city) {
    console.log("fetching city");
    fetch(`https://skyscanner44.p.rapidapi.com/autocomplete-hotel?query=${city}`, options)
        .then(response => response.json())
        .then(response => getHotels(response))
        .catch(err => console.error(err));
}
function getHotels(allResponse) {
    console.log("getting hotels");
    returnDate = document.getElementById("return-date");
    adults = document.getElementById("adults");
    let entity_id = allResponse[0].entity_id;

    for (i = 0; i < allResponse.length; i++) {
        if (allResponse[i].class == "City") {
            entity_id = allResponse[i].entity_id;
            break;
        }
    }

    fetch(`https://skyscanner44.p.rapidapi.com/search-hotel?locationId=${entity_id}&adults=${adults.value}&rooms=1&checkin=${date.value}&checkout=${returnDate.value}&currency=USD`, options)
	.then(response => response.json())
	.then(response => formattHotels(response))
	.catch(err => console.error(err));
}

function formattHotels(response) {
    console.log(response);
    hotelResults.innerText = "";
    for (i = 0; i < 5; i++) {
        if (response.hotels.length <= i) {
            break
        }
        let hotel = response.hotels[i];
        hotelResults.innerText += `
            ${hotel.name}
            Stars: ${hotel.stars}
            Price: ${hotel.price}
            `;
    }
    console.log(hotelResults.innerText);
}