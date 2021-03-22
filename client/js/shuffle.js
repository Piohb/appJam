//=== INITIALIZATION
var api_url = 'https://www.googleapis.com/youtube/v3/search';
var api_key = 'AIzaSyAQq9hJ2KRQrKM_NUMqawdHnGGQwJb8NCw';

var search = document.getElementById('search-menu');
var videoID = 'KbRLgjthmN0';

//=== EMBED

var tag = document.createElement('script');

tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

var ik_player;

function onYouTubeIframeAPIReady() {

    //creates the player object
    ik_player = new YT.Player('player', {
        class: 'embed-responsive-item',
        videoId: videoID,
        playerVars :{
            rel:0, // pas de liens vidéo similaire à la fin
            controls:2,
            modestbranding:1
        },
        events: {
            'onStateChange': onPlayerStateChange // à exécuter lors des changements de status
        }
    });
}

function onPlayerStateChange(event) {
    // ecouter les événements réalisées sur le player
    if(event.data == YT.PlayerState.ENDED){
    }
}

//=== SEARCH

function search(){

}

search.addEventListener('submit', function (e) {
    e.preventDefault();

    const url = `${api_url}?q=toto&key=${api_key}&maxResults=50&part=snippet&order=date`;
    const curl = `${api_url}/videoCategories?key=${api_key}&part=snippet&regionCode=FR&alt=json`;

    fetch(curl)
        .then(res => res.json())
        .then (data => {
            console.log(data.items);
        })

});
