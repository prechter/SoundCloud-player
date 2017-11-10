const header = document.querySelector('header');
const musicPlayer = document.querySelector('#music-player');
const nowPlaying = document.querySelector('#now-playing')
const results = document.querySelector('#results');
let dataFetch = {};
let string = ''

function searchTracks() {
  event.preventDefault();
  // preventDefault stops the page from reloading which was causing a break somewhere in the function(note: this can also be fixed by changing the "form" to a "div")
  header.classList.add('fadeout');
  results.classList.add('displayed');
  let string = document.querySelector('#search-field').value;
  let trackAPI = 'http://api.soundcloud.com/tracks/?client_id=8538a1744a7fdaa59981232897501e04&q=' + string + '&limit=20';

  fetch(trackAPI)
    .then(
      function(response) {
        if (response.status !== 200) {
          console.log('Uh-oh music fan! Looks like there was a problem. Status: ' + response.status);
          return;
        }
        response.json().then(function(data) {
          console.log(trackAPI);
          dataFetch = data
          console.log(dataFetch);
          function showResults() {
            return `${dataFetch.map(track =>
              `<div class="song-wrapper" id="${track.id}" >
                <div class="avatar-wrapper">
                  <img class="user-avatar" src="${track.user.avatar_url}" width=100vw height=100vw data-src="${track.stream_url}" data-title="${track.title}">
                </div>
                <div class="text-wrapper">
                  <span class="username" data-src="${track.stream_url}" data-title="${track.title}">${track.user.username}</span>
                  <br>
                  <span class="song-title" data-src="${track.stream_url}" data-title="${track.title}">${track.title}</span>
                  <br><br>
                  <div class="likes">${track.likes_count} Likes</div>
                </div>
              </div>`
            ).join('')}`
          }
          let markup = `${showResults()}`;
          results.innerHTML = markup;
        })
      }
    )
  }


results.addEventListener('click', playTrack);

function playTrack(track) {
  var trackSource = track.target.getAttribute("data-src");
  console.log(trackSource);
  var trackPlaying = track.target.getAttribute("data-title");
  console.log(trackPlaying);
  nowPlaying.innerHTML = trackPlaying;
  musicPlayer.setAttribute("src", trackSource + "?client_id=8538a1744a7fdaa59981232897501e04");
  musicPlayer.play();
}
