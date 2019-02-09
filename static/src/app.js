class SocketWrapper {
    constructor() {
        this.socket = io({ reconnection: false });
    }
    SendText(text) {
        this.socket.emit("textData", text);
    }
}
document.addEventListener("DOMContentLoaded", () => {
    const wrapper = new SocketWrapper();
    document.getElementById("textSubmit").addEventListener("click", () => {
        const text = document.getElementById("text").value;
        wrapper.SendText(text);
    });
});
//# sourceMappingURL=app.js.map