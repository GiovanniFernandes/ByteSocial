// Importa o socket.io-client e o pacote node-fetch para fazer requisições HTTP
const io = require("socket.io-client");

const socket = io.connect("http://localhost:3021");

socket.on("connect", () => {
  console.log("Conectado com sucesso!");
});
socket.on("error", (data) => {
  console.log(data);
});

socket.emit("add-user", {userId: 12});

async function sendMessage(senderId, receiverId, message) {
  try {
    await socket.emit("send-message", { senderId, receiverId, message });
  } catch (error) {
    console.error(`Erro ao enviar mensagem para ${receiverId}: ${error}`);
  }
}

socket.on("new-message", async (data) => {
  console.log("Nova mensagem recebida:", { message: data.savedMessage.message });
});

setTimeout(() => {
  sendMessage(12, 11, "Olá, 11!");
}, 4000);

