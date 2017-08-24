const musicPlayer = document.querySelector('#music-player');
const nowPlaying = document.querySelector('#now-playing')
// const searchField = document.querySelector('#search-field');
const results = document.querySelector('#track-results');
let dataFetch = {};
let string = ''

// searchButton.addEventListener('click', searchTracks);

function searchTracks() {
  event.preventDefault();
  // preventDefault stops the page from reloading which was causing a break somewhere in the function(note: this can also be fixed by changing the "form" to a "div")
  string = document.querySelector('#search-field').value;
  let trackAPI = 'http://api.soundcloud.com/tracks/?client_id=8538a1744a7fdaa59981232897501e04&q=' + string;

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
            // let avatar = data.user.avatar_url;
            // let title = data.title;
            // let permaLink = data.permalink_url;
            // let likes = data.likes_count;
            // let username = data.user.username;
            // let streamLink = data.stream_url;

            return `${dataFetch.map(track =>
              `<div class="song-wrapper" id="${track.id}" >
                <img class="user-avatar" src="${track.artwork_url}" width=100vw height=100vw data-src="${track.stream_url}" data-title="${track.title}">
                <br>
                <div class="artist-track">
                    <p class="username" data-src="${track.stream_url}" data-title="${track.title}">${track.user.username}</p>
                    <span class="song-title" data-src="${track.stream_url}" data-title="${track.title}">${track.title}</span>
                    <br>
                    <span class="release-year">${track.likes_count} likes</span>
                </div>
              </div>
              <br>
              <hr>`
            ).join('')}`
          }

          let markup = `${showResults()}`;
          results.innerHTML = markup;
        })
      }
    )
  }


results.addEventListener('click', playTrack);

function playTrack(e) {
  var trackSource = e.target.getAttribute("data-src");
  console.log(trackSource);
  var trackPlaying = e.target.getAttribute("data-title");
  console.log(trackPlaying);
  nowPlaying.innerHTML = "Now playing: " + trackPlaying;
  musicPlayer.setAttribute("src", trackSource + "?client_id=8538a1744a7fdaa59981232897501e04");
}
