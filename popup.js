/* 
*   RUN ON OPENING OF POPUP
*/

$(document).ready( () => {
  // create the taco background
  let fallingTacos = 'url("https://media.giphy.com/media/pYCdxGyLFSwgw/giphy.gif")'

  navigator.geolocation.getCurrentPosition((userLocation) => {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      chrome.tabs.executeScript(
          tabs[0].id,
          {code: `document.body.style.backgroundImage = 'url("https://media.giphy.com/media/pYCdxGyLFSwgw/giphy.gif")';`});
    });
  
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
        return response.json();
      })
      .then ((yelp) => {
        const firstTaco = {};
        const secondTaco = {};
        const top2 = [];
        //take top 2 results
        const firstResult = yelp.businesses[0];
        const secondResult = yelp.businesses[1];

        firstTaco.name = firstResult.name;
        firstTaco.rating = firstResult.rating;
        firstTaco.phone = firstResult.phone;
        firstTaco.address = firstResult.location.display_address.join(' ');
        firstTaco.address = firstTaco.address.replace(/\s/gi, '+');
        firstTaco.link = firstResult.url;

        secondTaco.name = secondResult.name;
        secondTaco.rating = secondResult.rating;
        secondTaco.phone = secondResult.phone;
        secondTaco.address = secondResult.location.display_address.join(' ');
        secondTaco.address = secondTaco.address.replace(/\s/gi, '+');
        secondTaco.link = secondResult.url;

        //array of the two objects
        top2.push(firstTaco);
        top2.push(secondTaco);

        /* dynamically load the two closest taco places */
        top2.forEach((venue) => {
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
});
