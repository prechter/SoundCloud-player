/*
  Here is a guide for the steps you could take:
*/

// 1. First select and store the elements you'll be working with


// 2. Create your `onSubmit` event for getting the user's search term


// 3. Create your `fetch` request that is called after a submission


// 4. Create a way to append the fetch results to your page


// 5. Create a way to listen for a click that will play the song in the audio play

let player = document.getElementsByClassName('music-player');
let artistSearch = document.getElementById('search-field');
let button = document.getElementById('search-button');






function userSearch(string) {
  let userAPI = 'http://api.soundcloud.com/users/?client_id=8538a1744a7fdaa59981232897501e04&q=' + string;

fetch(userAPI)
  .then(
    function(response) {
      if (response.status !== 200) {
        console.log('Uh-oh music fan! Looks like a ' + response.status);
        return;
      }
      response.json().then(function(data) {
        document.getElementsByClassName('results').innerHTML = '';
        for (var i = 0; i < data.length; i++) {
          let markup = `
                <div class="user-wrapper">
                  <img class="user-avatar" src="${data[i].avatar_url}">
                  <figcaption class="username">${data[i].username}</figcaption>
                </div>`
        document.getElementsByClassName('results').innerHTML += markup;
        }
        return;
    })
  }
)};


function trackSearch(string) {
  let trackAPI = 'http://api.soundcloud.com/tracks/?client_id=8538a1744a7fdaa59981232897501e04&q=' + string;

fetch(trackAPI)
  .then(
    function(response) {
      if (response.status !== 200) {
        console.log('Uh-oh music fan! Looks like a ' + response.status);
        return;
      }
      response.json().then(function(data) {
        document.getElementsByClassName('results').innerHTML = '';
        for (var i = 0; i < data.length; i++) {
          let markup = `
                <div class="user-wrapper">
                  <img class="user-avatar" src="${data[i].user.avatar_url}">
                  <figcaption class="username">${data[i].username}</figcaption>
                  <figcaption class="song-title">${data[i].title}</figcaption>
                </div>`
        document.getElementsByClassName('results').innerHTML += markup;
        }
        return;
    })
  }
)};



  .catch(function(err) {
  console.log('Fetch Error :-S', err);
  })
});
