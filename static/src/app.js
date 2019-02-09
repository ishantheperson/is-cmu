class SocketWrapper {
    constructor(viewmodel) {
        this.viewmodel = viewmodel;
        this.socket = io({ reconnection: false });
        this.socket.on("status", (data) => {
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
                viewmodel.setData(data.phrase);
            }
        });
        this.socket.on("imgResult", (data) => {
            console.log(data);
        });
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
class IsCMU {
    constructor() {
        this.currentScreen = ko.observable("methodSelect");
        this.status = ko.observable("");
        this.data = ko.observable({});
        this.setScreen = this.setScreen.bind(this);
        this.setStatus = this.setStatus.bind(this);
        this.setData = this.setData.bind(this);
    }
    setScreen(screen) {
        this.currentScreen(screen);
    }
    setStatus(status) {
        this.status(status);
    }
    setData(data) {
        this.data(data);
    }
}
document.addEventListener("DOMContentLoaded", () => {
    const viewmodel = new IsCMU();
    const wrapper = new SocketWrapper(viewmodel);
    ko.applyBindings(viewmodel);
    document.getElementById("imgSubmit").addEventListener("click", () => {
        try {
            const file = document.getElementById("file").files[0];
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
        const text = document.getElementById("text").value.trim();
        if (text) {
            viewmodel.setScreen("statusArea");
            viewmodel.setStatus("Sending text to server...");
            wrapper.SendText(text);
        }
    });
});
//# sourceMappingURL=app.js.map