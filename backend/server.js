// Carrega as variáveis de ambiente do arquivo .env
require('dotenv').config()

// Importa o framework Express
const express = require("express")

// Importa o middleware CORS
const cors = require('cors')

// Importa o Mongoose para conexão com o MongoDB
const mongoose = require("mongoose")

// Cria a aplicação Express
const app = express()

// Define a porta (usa .env se existir)
const PORT = process.env.PORT || 4000

// Middleware para permitir JSON nas requisições
app.use(express.json())

// Middleware para liberar acesso entre domínios
app.use(cors())

// Conexão com o MongoDB Atlas usando variável de ambiente
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ Conectado ao MongoDB Atlas"))
  .catch(err => console.error("❌ Erro ao conectar:", err))

// Rotas da aplicação
app.use("/api/technical", require("./routes/user"))
app.use("/api/machine", require("./routes/machine"))
app.use("/api/maintenance", require("./routes/maintenance"))

// Inicia o servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando em http://localhost:${PORT}`)
})
