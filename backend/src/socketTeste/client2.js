const io = require("socket.io-client");

const socket = io.connect("http://localhost:3021");

socket.on("connect", () => {
  console.log("Conectado com sucesso!");
});
socket.on("error", (data) => {
  console.log(data);
});

socket.emit("add-user", {userId: 11});

socket.on("new-message", async (data) => {
    console.log("Nova mensagem recebida:", { message: data.savedMessage.message });
});

function sendMessage(senderId, receiverId, message) {
  try {
    socket.emit("send-message", { senderId, receiverId, message });
  } catch (error) {
    console.error(`Erro ao enviar mensagem para ${receiverId}: ${error}`);
  }
}

setTimeout(() => {
  sendMessage(11, 12, "Olá, 12!");
}, 4000);
