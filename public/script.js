document.addEventListener("htmx:beforeRequest", toggleSpinnerOn)
document.addEventListener("htmx:afterRequest", toggleSpinnerOff)
document.addEventListener("htmx:wsAfterMessage", scrollToBottomOfChat)

function scrollToBottomOfChat() {
    const chatRoom = document.querySelector("#chat_room")
    if (!chatRoom) return;
    chatRoom.scrollTop = chatRoom?.scrollHeight
}

scrollToBottomOfChat()

// Create WebSocket connection.
const socket = new WebSocket("ws://localhost:3000/ws");

// Listen for messages
socket.addEventListener("message", (event) => {
    if (event.data.startsWith("<")) return;
    console.log(JSON.parse(event.data));
});

function toggleSpinnerOn(e) {

    /**@type {HTMLElement} */
    const { target } = e

    if (target.nodeName == "FORM") {
        /**@type {HTMLButtonElement} */
        const submitBtn = target.querySelector("button")
        submitBtn.setAttribute('aria-busy', true)
    } else {
        target.setAttribute('aria-busy', true)
    };
}

function toggleSpinnerOff(e) {
    /**@type {HTMLElement} */
    const { target } = e

    if (target.nodeName == "FORM") {
        /**@type {HTMLButtonElement} */
        const submitBtn = target.querySelector("button")
        submitBtn.setAttribute('aria-busy', false)
    } else {
        target.setAttribute('aria-busy', false)
    };
}