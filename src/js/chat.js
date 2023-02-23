function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

let state = 0;
const constraints = { audio: true };
let chunks = [];
let mediaRecorder;
window.onload = function () {
    const sendbutton = document.querySelector("#sendbutton")
    const recordbutton = document.querySelector('#voice');
    sendbutton.onclick = onSendbuttonClick;
    recordbutton.onclick = onRecordbuttonClick;
    state = 0;

    if (navigator.mediaDevices.getUserMedia) {
        console.log('getUserMedia supported.');
    }
    let onSuccess = function (stream) {
        mediaRecorder = new MediaRecorder(stream);
        mediaRecorder.onstop = stopRecording;
        mediaRecorder.ondataavailable = function (e) {
            chunks.push(e.data);
        }
    }
    let onError = function (err) {
        console.log('The following error occured: ' + err);
    }
    navigator.mediaDevices.getUserMedia(constraints).then(onSuccess, onError);
}


function onSendbuttonClick(event) {
    addTextElementToChat(textchat.value);
    setTimeout(function () { giveResponse(textchat.value) }, 200 * getRandomInt(5));
}

function giveResponse(text) {
    if (/МИЭМ/.test(text)) {
        addTextElementToChat("НИУ ВШЭ");
    }
    if (/Atomic/.test(text)) {
        addTextElementToChat("Heart");
    }
}

function addTextElementToChat(text) {
    let message = document.createElement("p");
    message.innerHTML = text;
    message.classList.add("message")
    messagebox.append(message);
}

function addAudioElementToChat(voice) {
    let message = document.createElement("p")
    let messageVoice = document.createElement('audio');
    messageVoice.setAttribute('controls', '');
    messageVoice.src = voice;
    messageVoice.controls = true;
    message.append(messageVoice);
    messagebox.append(message);
}

function addElementToChat(element){
    messagebox.append(element);
}

function onRecordbuttonClick(event) {
    const recordbutton = document.querySelector('#voice');
    recordbutton.style = null;
    if (state == 0) {
        mediaRecorder.start();

        recordbutton.style.background = "red";
        state = 1;
    }
    else {
        mediaRecorder.stop();

        recordbutton.style.background = "";
        state = 0;
    }
    console.log(recordbutton);
}

function stopRecording(e) {
    let number = 0;
    const blob = new Blob(chunks, { 'type': 'audio/ogg; codec=opus' });
    chunks = [];
    const audioURL = window.URL.createObjectURL(blob);
    addAudioElementToChat(audioURL);
}