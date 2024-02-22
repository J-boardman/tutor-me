document.addEventListener("htmx:wsAfterMessage", scrollToBottomOfChat)
const chatRoom = document.querySelector("#chat_room")


function test(e){
    console.log(e)
}

function scrollToBottomOfChat() {
    chatRoom.scrollTop = chatRoom?.scrollHeight
}

scrollToBottomOfChat()

// Create WebSocket connection.
const socket = new WebSocket("ws://localhost:3000/ws");

// Listen for messages
socket.addEventListener("message", (event) => {
  if(event.data.startsWith("<")) return;
  console.log(JSON.parse(event.data));
});