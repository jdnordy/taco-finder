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
  
    const searchRequest = `&ll=${userLocation.coords.latitude},${userLocation.coords.longitude}&limit=2&query=tacos`
  
    fetch(`https://api.foursquare.com/v2/venues/search?client_id=EK1PH1WWOCSBZZXFRGWGFSXZ50MBR04OEJQ0FFUQNGQGRQKF&client_secret=Y2XBAY2UWAODS4CXWNBQT1QBG45TSFFZK0DGQ44QTWBZLBLV&v=20180323${searchRequest}`)
      .then((response) => {
        return response.json();
      })
      .then((fourSquare) => {
        console.log(fourSquare.response.venues);
        // const firstTaco = {};
        // const secondTaco = {};
        // const top2 = [];
        // const firstResult = response.jsonBody.businesses[0];
        // const secondResult = response.jsonBody.businesses[1];
        // let prettyJson = JSON.stringify(firstResult, null, 4);
        // prettyJson = JSON.parse(prettyJson);
        // firstTaco.name = prettyJson.name;
        // firstTaco.rating = prettyJson.rating;
        // firstTaco.phone = prettyJson.phone;
        // firstTaco.address = prettyJson.location.display_address.join(' ');
        // firstTaco.link = prettyJson.url;
        // let prettyJson2 = JSON.stringify(secondResult, null, 4);
        // prettyJson2 = JSON.parse(prettyJson2);
        // secondTaco.name = prettyJson2.name;
        // secondTaco.rating = prettyJson2.rating;
        // secondTaco.phone = prettyJson2.phone;
        // secondTaco.address = prettyJson2.location.display_address.join(' ');
        // secondTaco.link = prettyJson2.url;
        // top2.push(firstTaco);
        // top2.push(secondTaco);
        // console.log(top2);
        // return top2;

        /* dynamically load the two closest taco places */
        top2.forEach((object) => {
          // add a new post into the feed
          document.getElementById('optiononetwo').innerHTML += `
            <div class="option">
              <div class="info" id="info1">
                <a href="${objext.link}" target="_blank">
                  <h2>${object.name}</h2>
                </a>
                <p>Rating: ${object.rating}</p>
                <a href="tel:${object.phone}" target="_blank">${object.phone}</a>
              </div>
              <div id="Tago">
                <!-- input code for google url -->
                <a href="https://www.google.com/maps/place/${object.address}" target="_blank">Go</a>
              </div>
            </div>
          `;
        })
      })
      .catch(e => {
        console.log(e);
      });
  });

  // document.getElementById('location').addEventListener('submit', (event) => {
  //   event.preventDefault();
  //   // resets zipcode form to empty
  //   document.getElementById('zipcode').value = '';
  
  
  // });  
});
