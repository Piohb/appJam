//EMBED
let tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
let firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

let ik_player;
let n = 0;

function onYouTubeIframeAPIReady(id) {
    console.log('id: ',id, ' n: ', n);

    if (n === 0){
        document.getElementById('player').innerHTML = "";
    }

    if(id !== undefined && n <= 2){
        //creates the player object
        ik_player = new YT.Player('player', {
            videoId: id,
            playerVars :{
                autoplay: 0,
                rel:0, // pas de liens vidéo similaire à la fin
                controls:2,
                modestbranding:1
            },
            /*events: {
                'onStateChange': onPlayerStateChange // à exécuter lors des changements de status
            }*/
        });
    } else {
        ik_player.loadVideoById({
            videoId: id,
            playerVars :{
                autoplay: 0,
                rel:0, // pas de liens vidéo similaire à la fin
                controls:2,
                modestbranding:1
            }
        });
    }
    n++;
}
