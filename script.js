let albumsDisplay = document.getElementById('albumsDisplay');
// var uniqTime = [...new Set(timeArr)]
let arr = [];
axios.get('https://lit-fortress-6467.herokuapp.com/object')
  .then(function(response) {
    let results = response.data.results;
    for (let i = 0; i < results.length; i++) {
      let img = document.createElement('img');
      x = Math.floor((Math.random() * 4) + 0);
      arr.push(x);
      arr = [...new Set(arr)];
      if (arr.length === 3) {
        break;
      }else{
        i--;
      }
    }

    for (let j = 0; j < arr.length; j++) {
      let img = document.createElement('img');
      img.src = `images/${results[arr[j]].cover_art}`;
      img.style.width = "20vw"
      img.style.height = "25vh"
      img.className += " dynImgs";
      albumsDisplay.appendChild(img);
    }
  })
