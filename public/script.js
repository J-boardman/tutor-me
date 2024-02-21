document.addEventListener("htmx:wsAfterMessage", scrollToBottomOfChat)
const chatRoom = document.querySelector("#chat_room")


function scrollToBottomOfChat() {
    chatRoom.scrollTop = chatRoom?.scrollHeight
}

scrollToBottomOfChat()
