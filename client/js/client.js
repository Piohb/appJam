//=== INITIALIZATION
const ws = new WebSocket('ws://localhost:8080');

const pseudo = document.getElementById('pseudo'),
    formChat = document.getElementById('chatting'),
    box = document.getElementById('box'),
    msg = document.getElementById('msg');

// get user cookie
var user = cookie.get('user');
console.log(user);


//=== FUNCTIONS
function sendToServer(fonction, user, msg) {

    if (ws.readyState === WebSocket.OPEN) {

        const message = JSON.stringify( {fonction, user ,msg} );
        console.log(message);

        ws.send(message);

    } else {
        throw 'Not connected';
    }
}

function Response(data) {
    return JSON.parse(data.data);
}

//======================================
ws.addEventListener('open', () => {
    console.log('connected');
});

//=== USERNAME
// Get the current username from the cookies
if (!user) {

    // Create ID
    ws.onopen = function open() {
        sendToServer( 'userID()' );
    };

    // get ID and rewrite cookie
    ws.onmessage = function incoming(data) {
        var userId = Response(data).value;
        console.log(userId);

        cookie.set('user', userId);
        user = cookie.get('user');
        pseudo.placeholder=userId;
    };

} else {
    // already has ID
    ws.onopen = function open() {
        sendToServer( 'userExist()', user );
    };
    pseudo.placeholder=user;
}

pseudo.addEventListener('change', function (e) {
    let username = e.target.value;

    console.log(user);
    console.log(username);

    // verify
    sendToServer( 'pseudoExist()', user, username );
    ws.onmessage = function incoming(data) {
        let reply = Response(data).value;

        if ( !reply ){
            alert('Pseudo déjà pris !');

        } else {
            // update
            sendToServer( 'userChange()', user, username );
            cookie.set('user', username);
            user = cookie.get('user');
        }
    };

});

//=== CHAT
formChat.addEventListener('submit', function (e) {
    e.preventDefault();

    sendToServer( 'userMsg()', user, msg.value );
    msg.value = '';

    ws.onmessage = function incoming(data) {

        let author = Response(data).value + " : ";
        let msg = Response(data).msg;

        let strong = document.createElement("strong");
        strong.append(author);

        let span = document.createElement("span");
        span.append(msg);

        let p = document.createElement("p");
        p.appendChild(strong);
        p.appendChild(span);
        box.append(p);
    };
});
