/* 
*   RUN ON OPENING OF POPUP
*/

<<<<<<< HEAD
console.log('test');

$(document).ready( () => {
  const title = $('<h1>').text('Social Calendar');
  $('body').append(title);
  
  // Make an AJAX request to the server, then do something with the result!

});



// changeColor.onclick = function(element) {
//   let color = element.target.value;
//   chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
//     chrome.tabs.executeScript(
//         tabs[0].id,
//         {code: 'document.body.style.backgroundColor = "' + color + '";'});
//   });
// };
=======
'use strict';

let changeColor = document.getElementById('button1');

chrome.storage.sync.get('color', function(data) {
  changeColor.style.backgroundColor = 'white';
  changeColor.setAttribute('value', data.color);
});


/* changeColor.onclick = function(element) {
  let color = element.target.value;
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.executeScript(
        tabs[0].id,
        {code: 'document.body.style.backgroundColor = "' + color + '";'});
  });
}; */

changeColor.onclick = function(element) {
  //let color = element.target.value;
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.executeScript(
        tabs[0].id,
        {code: 'window.location.href = \'https://www.yelp.com/nearme/tacos\';'});
  });
};
>>>>>>> ed9a420fc0b2d824eaf95c962edf01c6518a17f3
