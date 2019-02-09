class SocketWrapper {
  private socket: SocketIOClient.Socket;

  constructor() {
    this.socket = io({ reconnection: false });
  }

  public SendText(text: string): void {
    this.socket.emit("textData", text);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const wrapper = new SocketWrapper();
  
  document.getElementById("textSubmit").addEventListener("click", () => {
    const text = (document.getElementById("text") as HTMLInputElement).value;
    wrapper.SendText(text);
  });
});
