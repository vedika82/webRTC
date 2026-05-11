const webSocket = new WebSocket("ws://SERVER-IP-HERE:3000")
// in the brackets we write the url for the server

//to send message to the websocket
webSocket.onmessage = (event)=>{
    handleSignallingData(JSON.parse(event.data))
}

function handleSignallingData(data) {
    switch (data.type) {
        case "offer":
            peerConn.setRemoteDescription(data.offer)
            createAndSendAnswer()
            break
        case "candidate":
            peerConn.addIceCandidate(data.candidate)
    }
}



// send the username to the socket server and servre stores that username 

function createAndSendAnswer () {
    peerConn.createAnswer((answer) => {
        peerConn.setLocalDescription(answer)
        sendData({
            type: "send_answer",
            answer: answer
        })
    }, error => {
        console.log(error)
    })
}

function sendData(data) {
    data.username = username
    webSocket.send(JSON.stringify(data))
}



let localStream
let peerConn
let username


function joinCall() {
    username = document.getElementById("username-input").value

    navigator.getUserMedia({
        video: {
            frameRate: 24,
            width: {
                min: 480, ideal: 720, max: 1280
            },
            aspectRatio: 1.33333
        },
        audio: true
    }, (stream) => {
        localStream = stream
        document.getElementById("local-video").srcObject = localStream

        let configuration ={
            iceServers: [
                //what is a stun server
                {
                    "urls": ["stun.l.google.com:19302",
                             "stun1.l.google.com:19302",
                             "stun2.l.google.com:19302",]

                } 
            ]
        }

        //basically the stream for peer to peer connection is used here
        peerConn = new RTCPeerConnection(configuration)
        peerConn.addStream(localStream)

        peerConn.onaddstream = (e) => {
            document.getElementById("remote-video")
            .srcObject = e.stream
        }

        peerConn.onicecandidate = ((e) => {
            if (e.candidate == null)
                return
            sendData({
                type: "send_candidate",
                candidate: e.candidate
            })
        })

    sendData({
        type:"join_call"
    })

    },  (error)=>{
        console.log(error)
    })
}

let isAudio = true
function muteAudio() {
    isAudio = !isAudio
    localStream.getAudioTracks()[0].enabled = isAudio
}

let isVideo = true
function muteVideo() {
    isVideo = !isVideo
    localStream.getVideoTracks()[0].enabled = isVideo
}