class SocketWrapper {
    constructor() {
        this.socket = io({ reconnection: false });
    }
    SendText(text) {
        this.socket.emit("textData", text);
    }
    SendImage(file) {
        // Convert image to base64 via canvas
        const reader = new FileReader();
        reader.addEventListener("load", (event) => {
            this.socket.emit("imageData", event.target.result.substr(22));
        });
        reader.readAsDataURL(file);
    }
}
document.addEventListener("DOMContentLoaded", () => {
    const wrapper = new SocketWrapper();
    document.getElementById("textSubmit").addEventListener("click", () => {
        // const text = (document.getElementById("text") as HTMLInputElement).value;
        // wrapper.SendText(text);
        const file = document.getElementById("file").files[0];
        wrapper.SendImage(file);
    });
});
//# sourceMappingURL=app.js.map