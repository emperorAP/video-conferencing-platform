const express = require("express")
const http = require("http")
const socketIo = require("socket.io")

const app = express()
const server = http.createServer(app)
const io = socketIo(server)

app.use(express.static("public"))

io.on("connection", (socket) => {
  console.log("A user connected")

  socket.on("disconnect", () => {
    console.log("A user disconnected")
  })

  socket.on("offer", (offer) => {
    socket.broadcast.emit("offer", offer)
  })

  socket.on("answer", (answer) => {
    socket.broadcast.emit("answer", answer)
  })

  socket.on("candidate", (candidate) => {
    socket.broadcast.emit("candidate", candidate)
  })
})

const PORT = process.env.PORT || 3000
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
