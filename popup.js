/* 
*   RUN ON OPENING OF POPUP
*/

$(document).ready( () => {
  // create the taco background
  let fallingTacos = 'url("https://media.giphy.com/media/pYCdxGyLFSwgw/giphy.gif")'

  navigator.geolocation.getCurrentPosition((userLocation) => {
  
    const search = `term=tacos&latitude=${userLocation.coords.latitude}&longitude=${userLocation.coords.longitude}`;
  

    const searchRequest = {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer amc20rbVteECACRmMl474wUSulqum2qMleHq59w3WlE83iIq66vITRT-a3SQ7O0KVsJXWgQ0PLpx8vpFJXwwOacFpXO4QDIM9-Y1uiSBSGOV7Lbu03NwzImxXl0yXnYx',
        'Access-Control-Allow-Origin': 'https://*.yelp.com'
      }
    }

    fetch(`https://api.yelp.com/v3/businesses/search?${search}`, searchRequest)
      .then(response => {
        // stop spinning wheel
        return response.json();
      })
      .then ((yelp) => {
        // array to store the top 2 results
        const topResults = [];
        // loop through the reponse from Yelp API and add top two results to array
        for (let i = 0; i < 2; i++) {
          const venue = {};
          venue.name = yelp.businesses[i].name;
          venue.rating = yelp.businesses[i].rating;
          venue.phone = yelp.businesses[i].phone;
          venue.address = yelp.businesses[i].location.display_address.join(' ');
          venue.address = venue.address.replace(/\s/gi, '+');
          venue.link = yelp.businesses[i].url;
          topResults.push(venue);
        }

        // remove taco-spinner loading wheel
        $("#taco-spinner").remove();
        // rain tacos in backgound of webpage
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
          chrome.tabs.executeScript(
              tabs[0].id,
              {code: `document.body.style.backgroundImage = 'url("https://media.giphy.com/media/pYCdxGyLFSwgw/giphy.gif")';`});
        });
        /* dynamically load the two closest taco places */
        topResults.forEach((venue) => {
          // add a new post into the feed
          document.getElementById('optiononetwo').innerHTML += `
            <div class="option">
              <div class="info" id="info1">
                <a href="${venue.link}" target="_blank">
                  <h2>${venue.name}</h2>
                </a>
                <p>Rating: ${venue.rating}</p>
                <a href="tel:${venue.phone}" target="_blank">${venue.phone}</a>
              </div>
              <div id="Tago">
                <!-- input code for google url -->
                <a href="https://www.google.com/maps/place/${venue.address}" target="_blank">Go</a>
              </div>
            </div>
          `;
        })
      })
      .catch(e => {
        console.log(e);
      });
  }); 

  // javascript for loading wheel
  document.getElementById('optiononetwo').innerHTML += `
    <div class="d-flex justify-content-center" id="taco-spinner">
      <div class="spinner-border" role="status" style="">
        <span class="sr-only">Loading...</span>
      </div>
    </div>
    `;
});
