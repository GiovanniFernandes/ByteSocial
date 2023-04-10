// Importa o socket.io-client e o pacote node-fetch para fazer requisições HTTP
const io = require("socket.io-client");

const socket = io.connect("http://localhost:3021");

socket.on("connect", () => {
  console.log("Conectado com sucesso!");
});

//join room
socket.emit("join", {userId: 8});

async function sendMessage(receiverId, message) {
  try {
    await socket.emit("send-message", { receiverId, message });
  } catch (error) {
    console.error(`Erro ao enviar mensagem para ${receiverId}: ${error}`);
  }
}

function checkForNewMessages() {
  socket.on("new-message", (data) => {
    const { receiver_id, sender_id, message } = data;
    console.log("Nova mensagem recebida:", { receiver_id, sender_id, message });
  });

  setTimeout(checkForNewMessages, 3000); // espera 3 segundos antes de checar novamente
}

checkForNewMessages();

sendMessage(8, "Olá, TESTE2!");
