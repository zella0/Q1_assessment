let albumBox = document.getElementById('albumBox');
let songInfoBox = document.getElementById('songInfo');
let clearBtn = document.getElementById('clearBtn');
let submitBin = document.getElementById('submitBin');
let tracksCont = document.getElementById('tracksCont')
let songsName = document.getElementById('songsName');
let songsTime = document.getElementById('songsTime');
let chosenTracks = document.getElementById('chosenTracks');
let chosenLeft = document.getElementById('chosenLeft');
let chosenRight = document.getElementById('chosenRight');
let tracksArr = []
let timeArr = []

window.onload = function() {
  clearBtn.addEventListener('click', function() {
    chosenLeft.innerHTML = '';
    chosenRight.innerHTML = '';
    tracksArr = []
    timeArr = []
  })
  submitBin.addEventListener('click', function() {
    axios.post('https://lit-fortress-6467.herokuapp.com/post', {
        firstName: 'Fred',
        lastName: 'Flintstone'
      })
      .then(function(response) {
        console.log(response);
      })
      .catch(function(error) {
        console.log(error);
      });
  })
  axios.get('http://localhost:4000/results')
    .then(function(response) {
      let results = response.data;
      //Set albums images to horizontal scroll bar
      for (let i = 0; i < results.length; i++) {
        let img = document.createElement('img')
        img.src = results[i].cover_art;
        img.style.width = "70px"
        img.style.height = "70px"
        img.style.margin = "0 15px"
        img.style.marginTop = "2px"
        img.style.borderRadius = "5px"
        img.className += " dynImgs";
        img.id = results[i].id;
        img.addEventListener('click', function() {
          //Album Description
          //Songs name
          axios.get('http://localhost:4000/results')
            .then(response => {
              for (var j = 0; j < results.length; j++) {
                if (this.id == results[j].id) {
                  songInfoBox.innerHTML = ''
                  let p = document.createElement('p');
                  let imgInBox = document.createElement('img')
                  imgInBox.style.width = "75%";
                  imgInBox.style.height = "75%"
                  imgInBox.src = results[j].cover_art;
                  p.innerHTML = `${results[j].artist}<br> ${results[j].album}`
                  p.style.fontSize = "18px"
                  p.style.fontWeight = "600"
                  songsName.innerHTML = '';
                  songsTime.innerHTML = '';
                  //Get songs from data then give those songs listnr to be picked
                  for (var k = 0; k < results[j].songs.length; k++) {
                    let tracks = document.createElement('p');
                    let tracksDuration = document.createElement('p')
                    tracks.innerHTML = Object.keys(results[j].songs[k]);
                    tracksDuration.innerHTML = Object.values(results[j].songs[k]);
                    tracks.addEventListener('click', function(event) {
                      chosenTracks.scrollTop = chosenTracks.scrollHeight - chosenTracks.clientHeight;
                      tracksArr.push(tracks.textContent)
                      timeArr.push(tracksDuration.textContent);
                      var uniqTracks = [...new Set(tracksArr)]
                      var uniqTime = [...new Set(timeArr)]
                      chosenRight.innerHTML = '';
                      chosenLeft.innerHTML = '';
                      console.log(tracksDuration.textContent)
                      for (let b = 0; b < uniqTracks.length; b++) {
                        if (uniqTime[b] == undefined) {
                          console.log(uniqTime, 'und')
                          uniqTime.push('err' + b)
                          //current problem: song time's not unique. var uniqTime is always one element behind
                          chosenLeft.innerHTML += `<p>${uniqTracks[b]}</p>`;
                          chosenRight.innerHTML += `<p>${uniqTime[b]}</p>`;
                        } else {
                          chosenLeft.innerHTML += `<p>${uniqTracks[b]}</p>`;
                          chosenRight.innerHTML += `<p>${uniqTime[b]}</p>`;
                        }
                      }
                    })
                    songsName.appendChild(tracks)
                    songsTime.appendChild(tracksDuration)
                  }
                  songInfoBox.appendChild(p)
                  songInfoBox.appendChild(imgInBox)
                }
              }
            })
        })
        albumBox.appendChild(img);
      }
    })
};
