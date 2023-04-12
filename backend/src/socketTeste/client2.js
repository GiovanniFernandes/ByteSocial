const io = require("socket.io-client");

const socket = io.connect("http://localhost:3021");

socket.on("connect", () => {
  console.log("Conectado com sucesso!");
});

//join room
socket.emit("add-user", {userId: 8, username: "Romário"});

socket.on("new-message", async (data) => {
    console.log("Nova mensagem recebida:", { author: data.author, message: data.savedMessage.message });
});

function sendMessage(senderId, receiverId, message) {
  try {
    socket.emit("send-message", { senderId, receiverId, message });
  } catch (error) {
    console.error(`Erro ao enviar mensagem para ${receiverId}: ${error}`);
  }
}

setTimeout(() => {
  sendMessage(8, 7, "Olá, 7!");
}, 4000);
