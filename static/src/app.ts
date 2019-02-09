class SocketWrapper {
  private socket: SocketIOClient.Socket;
  private viewmodel: IsCMU;

  constructor(viewmodel: IsCMU) {
    this.viewmodel = viewmodel;

    this.socket = io({ reconnection: false });
    this.socket.on("status", (data) => {
      this.viewmodel.setStatus(data);
    });
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

class IsCMU {
  private currentScreen: KnockoutObservable<string>;
  private status: KnockoutObservable<string>;

  constructor() {
    this.currentScreen = ko.observable("methodSelect");
    this.status = ko.observable("");

    this.setScreen = this.setScreen.bind(this);
    this.setStatus = this.setStatus.bind(this);
  }

  public setScreen(screen: string) {
    this.currentScreen(screen);
  }

  public setStatus(status: string) {
    this.status(status);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const viewmodel = new IsCMU();
  const wrapper = new SocketWrapper(viewmodel);
  ko.applyBindings(viewmodel);

  document.getElementById("imgSubmit").addEventListener("click", () => {
    try {
      const file = (document.getElementById("file") as HTMLInputElement).files[0];
      if (file) {
        viewmodel.setScreen("statusArea");  
        viewmodel.setStatus("Sending image to server...");
        wrapper.SendImage(file);
      }
    }
    catch (error) { 
      // oh well it really do be like that sometimes
      // probably indicates something wrong with the user's input
    }
  });

  document.getElementById("textSubmit").addEventListener("click", () => {
    const text = (document.getElementById("text") as HTMLInputElement).value.trim();
    if (text) {
      viewmodel.setScreen("statusArea");
      viewmodel.setStatus("Sending text to server...");
      wrapper.SendText(text);
    }
  });  
});
