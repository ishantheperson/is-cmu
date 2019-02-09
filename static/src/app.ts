class SocketWrapper {
  private socket: SocketIOClient.Socket;

  constructor() {
    this.socket = io({ reconnection: false });
  }

  public SendText(text: string): void {
    this.socket.emit("textData", text);
  }

  public SendImage(file: File): void {
    // Convert image to base64 via canvas
    const reader = new FileReader();
    reader.addEventListener("load", (event: any) => { 
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

    const file = (document.getElementById("file") as HTMLInputElement).files[0];
    wrapper.SendImage(file);
  });  
});
