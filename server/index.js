//=== INITIALIZATION
const WebSocket = require('ws'), server = new WebSocket.Server({ port: 8080 });
const uuid = require('uuid');

//=== CONNECTED
server.on('connection', ws => {

    // Array users
    let users = [];
    let messages = [];
    let videoHistory = [];

    //=== FUNCTIONS
    function sendToClient (value, msg) {
        const data = JSON.stringify({ value, msg });
        //console.log(data);

        ws.send(data);
    }

    function broadcast (value, msg){
        const data = JSON.stringify({ value, msg });
        //console.log(data);

        server.clients.forEach(ws => {
            ws.send(data);
        });
    }

    // USERNAME
    //========================
    ws.on('message', data => {

        // Call functions
        let Array = JSON.parse(data);

        // USER ID
        if ( Array.fonction === 'userID()' ){
            // create key
            ws.id = uuid.v4();
            users.push(ws.id);

            sendToClient(ws.id);
        }

        // USER EXIST
        else if ( Array.fonction === 'userExist()' ){
            users.push(Array.user);
        }

        //PSEUDO EXIST
        else if (Array.fonction === 'pseudoExist()' ){
            let index = 0;
            let boolean = true;

            console.log(users);

            for (const id of users){

                if (Array.msg === id){
                    boolean = false;
                }

                index++;
            }

            sendToClient(boolean);
        }

        // CHANGE USER ID
        else if ( Array.fonction === 'userChange()' ){
            let index = 0;

            for (const id of users) {

                if (Array.user === id){
                    users.splice(index, 1, Array.msg);
                }

                index++;
            }
        }
    });

    // CHAT
    //========================
    ws.on('message', data => {

        // Call functions
        let chatArray = JSON.parse(data);

        // SEND MESSAGES
        if ( chatArray.fonction === 'userMsg()' ) {
            // store into database
            let newMsg = [ chatArray.user, chatArray.msg ];
            messages.push(newMsg);

            // send
            broadcast(chatArray.user, chatArray.msg);
        }
    });

    // YTB
    //========================
    ws.on('message', data => {

        // Call functions
        let Array = JSON.parse(data);
        console.log(Array);

        // SEND MESSAGES
        if ( Array.fonction === 'newVideo()' ) {
            // store into database
            videoHistory.push(Array.msg);
            console.log(videoHistory);

            // send
            broadcast(Array.user, Array.msg);
        }
    });
});