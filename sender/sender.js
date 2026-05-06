const webSocket = new WebSocket("")
// in the brackets we write the url for the server

// send the username to the socket server and servre stores that username 
let username
function sendUsername(){

    username = document .getElementById("username-input").value
     sendData({
        type:"store.user",

     })
}

function sendData(data){
    data.username= username
    webSocket.senda(JSON.stringify(data))
}

function startCall(){
    document.getElement
}