declare var RecordRTC;

class SocketWrapper {
  private socket: SocketIOClient.Socket;
  private viewmodel: IsCMU;

  constructor(viewmodel: IsCMU) {
    this.viewmodel = viewmodel;

    this.socket = io({ reconnection: false });
    this.socket.on("status", (data: string) => {
      this.viewmodel.setStatus(data);
    });

    this.socket.on("textResult", (data) => {
      console.log(data);

      if (!data.success) {
        this.viewmodel.setScreen("textFail");
        return;
      }

      if (data.type === "dictLookup") {
        viewmodel.setScreen("dictLookupArea");
        viewmodel.setData(data.data);
      }
      else { // data.type === "parser"
        viewmodel.setScreen("parserResultArea");
        viewmodel.setData(data.data);
      }
    });

    this.socket.on("speechResult", (data) => {
      if (!data.success) {
        viewmodel.setScreen("speechFail");
        viewmodel.setData(data.data);
        return;
      }

      viewmodel.setScreen("speechResultArea");
      viewmodel.setData(data.data);
    });

    this.socket.on("imageResult", (data) => {
      console.log(data);
      viewmodel.setScreen("imageResultArea");
      viewmodel.setData(data.phrase); // FIXME 
    })
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

  public SendAudio(data: any): void {
    this.socket.emit("audioData", data);
  }
}

class IsCMU {
  private currentScreen: KnockoutObservable<string>;
  private status: KnockoutObservable<string>;
  private data: any;

  private isRecording: KnockoutObservable<boolean>;
  private recordCallback: any;

  constructor(recordCallback) {
    this.currentScreen = ko.observable("methodSelect");
    this.status = ko.observable("");
    this.data = ko.observable({});
    this.isRecording = ko.observable(false);

    this.recordCallback = recordCallback;

    this.setScreen = this.setScreen.bind(this);
    this.setStatus = this.setStatus.bind(this);
    this.setData = this.setData.bind(this);
    this.toggleRecording = this.toggleRecording.bind(this);
  }

  public setScreen(screen: string) {
    if (screen === "methodSelect") { // reset
      //location.reload();
      this.status("");
    }

    this.currentScreen(screen);
  }

  public setStatus(status: string) {
    this.status(status);
  }

  public setData(data: any) {
    this.data(data);
  }

  public getName(): string {
    try {
      return this.data().first_name + " " + this.data().last_name;
    }
    catch (error) {
      return "";
    }
  }

  public getImageCaption(): string {
    try {
      return this.data().result;
    }
    catch (error) {
      return "";
    }
  }

  public getMatch(): string {
    try {
      return this.data().match;
    }
    catch (error) {
      return "";
    }
  }

  public getSpeech(): string {
    try {
      return this.data().speech;
    }
    catch (error) {
      return "";
    }
  }

  public toggleRecording() {
    this.isRecording(!this.isRecording());
    this.recordCallback(this.isRecording());
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const viewmodel = new IsCMU(recordCallback);
  const wrapper = new SocketWrapper(viewmodel);
  let recordRTC = null;
  const session = { audio: true, video: false };

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

  document.getElementById("text").addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
      console.log("click");
      document.getElementById("textSubmit").click();
    }
  });

  function recordCallback(isRecording: boolean) {
    if (isRecording) {
      navigator.getUserMedia(session, (stream) => {
        recordRTC = RecordRTC(stream);
        recordRTC.startRecording();
      }, console.error);
    }
    else {
      recordRTC.stopRecording((audioURL) => {
        wrapper.SendAudio(recordRTC.getBlob()); 
      });

      viewmodel.setScreen("statusArea");
    }
  }
});
