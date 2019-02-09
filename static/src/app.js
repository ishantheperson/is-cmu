class SocketWrapper {
    constructor() {
        this.socket = io({ reconnection: false });
    }
    Go() {
        // this.socket.emit(); // hello
    }
}
document.addEventListener("DOMContentLoaded", () => {
    const wrapper = new SocketWrapper();
    wrapper.Go();
});
//# sourceMappingURL=app.js.map