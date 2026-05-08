const webSocket = new WebSocket("ws://127.0.0.1:300")
// in the brackets we write the url for the server

// send the username to the socket server and servre stores that username 
let username
function sendUsername(){

    username = document .getElementById("username-input").value
     sendData({
        type:"store_user", 
        // basically stores the type 
     })
}

function sendData(data){
    data.username= username
    webSocket.send(JSON.stringify(data))
}



let localStream
function startCall(){
    document.getElementById("video-call-div")
    .style.display ="inline"

    navigator.getUserMedia({
        video:{
            frameRate: 24,
            width:{
                min:480, ideal: 720, max: 1280
            },
            aspectRatio: 1.33333
        }, 
        audio: true
    }, (stream) =>  {
        localStream= stream
        document.getElementById('local-video').srcObject = localStream;
    },  (error)=>{
        console.log(error)
    })
}