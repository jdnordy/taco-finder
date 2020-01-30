'use strict';

const yelp = require('yelp-fusion');

// Place holder for Yelp Fusion's API Key. Grab them
// from https://www.yelp.com/developers/v3/manage_app
const apiKey = 'amc20rbVteECACRmMl474wUSulqum2qMleHq59w3WlE83iIq66vITRT-a3SQ7O0KVsJXWgQ0PLpx8vpFJXwwOacFpXO4QDIM9-Y1uiSBSGOV7Lbu03NwzImxXl0yXnYx';

const searchRequest = {
  term:'Tacos',
  location: '92122'
};

const client = yelp.client(apiKey);

client.search(searchRequest).then(response => {
  const firstResult = response.jsonBody.businesses[0];
  const secondResult = response.jsonBody.businesses[1];
  const prettyJson = JSON.stringify(firstResult, null, 4);
  const prettyJson2 = JSON.stringify(secondResult, null, 4);
  console.log(prettyJson, prettyJson2);
}).catch(e => {
  console.log(e);
});