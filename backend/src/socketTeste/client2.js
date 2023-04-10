const io = require("socket.io-client");

const socket = io.connect("http://localhost:3021");

socket.on("connect", () => {
  console.log("Conectado com sucesso!");
});

//join room
socket.emit("join", {userId: 8});

socket.on("new-message", async (data) => {
    console.log(data)
    const { receiver_id, sender_id, message } = data;
    console.log("Nova mensagem recebida:", { receiver_id, sender_id, message });
  });  