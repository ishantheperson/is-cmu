class SocketWrapper {
  private socket: SocketIOClient.Socket;

  constructor() {
    this.socket = io({ reconnection: false });
  }

  Go(): void {
    // this.socket.emit(); // hello
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const wrapper = new SocketWrapper();
  wrapper.Go();
});