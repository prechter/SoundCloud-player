let musicPlayer = document.getElementById('musicplayer');
// let trackSearch = document.getElementById('search-field');
let searchButton = document.getElementById('searchbutton');
let searchField = document.getElementById('searchfield');

searchButton.addEventListener('click', searchUser);

function searchUser() {
  event.preventDefault();
  // preventDefault stops the page from reloading which was causing a break somewhere in the function(note: this can also be fixed by changing the "form" to a "div")
  let string = searchField.value;
  console.log(string);
  let userAPI = 'http://api.soundcloud.com/users/?client_id=8538a1744a7fdaa59981232897501e04&q=' + string;

fetch(userAPI)
  .then(
    function(response) {
      if (response.status !== 200) {
        console.log('Uh-oh music fan! Looks like a ' + response.status);
        return;
      }
      response.json().then(function(data) {
        console.log(data[0]);
        document.getElementById('userresults').innerHTML = '<h1>USERS</h1>';
        for (var i = 0; i < data.length; i++) {
          let markup = `
                <div class="user-wrapper">
                  <img class="user-avatar" src="${data[i].avatar_url}" width=150vw height=150vw>
                  <br><br>
                  <a href="${data[i].permalink_url}" class="username">${data[i].username}</a>
                </div><br>`
        document.getElementById('userresults').innerHTML +=  markup;
        }
        return;
        })
      }
    )

  let trackAPI = 'http://api.soundcloud.com/tracks/?client_id=8538a1744a7fdaa59981232897501e04&q=' + string;

fetch(trackAPI)
  .then(
    function(response) {
      if (response.status !== 200) {
        console.log('Uh-oh music fan! Looks like a ' + response.status);
        return;
      }
      response.json().then(function(data) {
        document.getElementById('trackresults').innerHTML = '<h1>TRACKS</h1>';
        for (var i = 0; i < data.length; i++) {
          let markup = `
                <div class="user-wrapper">
                  <img class="user-avatar" src="${data[i].user.avatar_url}" width=150vw height=150vw>
                  <br><br>
                  <a href="${data[i].permalink_url}" class="username">${data[i].user.username}</a><br>
                  <a href="${data[i].stream_url}" class="song-title">${data[i].title}</a>
                </div><br>`
        document.getElementById('trackresults').innerHTML += markup;
        }
        return;
        })
      }
    )
};

let songSelect = getElementsByClassName('user-wrapper');

songSelect.addEventListener('click', playMusic);

function playMusic() {
  let stream = document.getElementsByClassName('song-title');
  let song = stream.value;
  let songLink = song + '?client_id=8538a1744a7fdaa59981232897501e04';
  musicPlayer.setAttribute("src", songLink).play();
}
