/* 
*   RUN ON OPENING OF POPUP
*/

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
