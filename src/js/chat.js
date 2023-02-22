window.onload = function () {
    let messagebox = document.querySelector("#messagebox")
    let sendbutton = document.querySelector("#sendbutton")
    let textchat = document.querySelector("#textchat")
    console.log(textchat)

    sendbutton.onclick = (event) => {
        let message = document.createElement("p");
        textchat = document.querySelector("#textchat");
        message.innerHTML = textchat.value;
        message.classList.add("message")
        messagebox.append(message);
    }
}