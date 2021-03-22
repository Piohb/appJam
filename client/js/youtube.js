//=== INITIALIZATION
let api_url = 'https://www.googleapis.com/youtube/v3/search';
let api_key = 'AIzaSyAQq9hJ2KRQrKM_NUMqawdHnGGQwJb8NCw';
let search = document.getElementById('search-menu');
const random = (min, max) => Math.floor(Math.random() * (max - min)) + min;

//=== ON SUBMIT
search.addEventListener('submit', function (e) {
    e.preventDefault();

    const url = `${api_url}?key=${api_key}&maxResults=50&part=snippet&videoType=any&order=date&safeSearch=none`;

    fetch(url)
        .then(res => res.json())
        .then (data => {
            console.log(data);
            let nb = random(0, 49);
            let videoId = data.items[nb].id['videoId'];
            console.log(data.items);
            console.log(nb, data.items[nb]);
            console.log(videoId);

            sendToServer( 'newVideo()', user, videoId );

            ws.onmessage = function incoming(data) {
                console.log(data);
                let msg = Response(data).msg;
                console.log(msg);

                //embed
                onYouTubeIframeAPIReady(msg);
            };
        })
});
