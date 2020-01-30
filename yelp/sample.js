function output(){

'use strict';

const yelp = require('yelp-fusion');

// Place holder for Yelp Fusion's API Key. Grab them
// from https://www.yelp.com/developers/v3/manage_app
const apiKey = 'amc20rbVteECACRmMl474wUSulqum2qMleHq59w3WlE83iIq66vITRT-a3SQ7O0KVsJXWgQ0PLpx8vpFJXwwOacFpXO4QDIM9-Y1uiSBSGOV7Lbu03NwzImxXl0yXnYx';
//const location = document.getElementById('location').value;

const searchRequest = {
  term:'Tacos',
  location: '90210'
};

const client = yelp.client(apiKey);

client.search(searchRequest).then(response => {
  const firstTaco = {};
  const secondTaco = {};
  const top2 = [];
  const firstResult = response.jsonBody.businesses[0];
  const secondResult = response.jsonBody.businesses[1];
  let prettyJson = JSON.stringify(firstResult, null, 4);
  prettyJson = JSON.parse(prettyJson);
  firstTaco.name = prettyJson.name;
  firstTaco.rating = prettyJson.rating;
  firstTaco.phone = prettyJson.phone;
  firstTaco.address = prettyJson.location.display_address.join(' ');
  firstTaco.link = prettyJson.url;
  let prettyJson2 = JSON.stringify(secondResult, null, 4);
  prettyJson2 = JSON.parse(prettyJson2);
  secondTaco.name = prettyJson2.name;
  secondTaco.rating = prettyJson2.rating;
  secondTaco.phone = prettyJson2.phone;
  secondTaco.address = prettyJson2.location.display_address.join(' ');
  secondTaco.link = prettyJson2.url;
  top2.push(firstTaco);
  top2.push(secondTaco);
  console.log(top2);
  return top2;
}).catch(e => {
  console.log(e);
});

}

output();

