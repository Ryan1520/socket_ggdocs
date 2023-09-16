const dotenv = require("dotenv").config()
const mongoose = require('mongoose')
const Doc = require('./model/Doc')

console.log(process.env.MONGO_URL)
mongoose.connect(process.env.MONGO_URL,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
).then(() => console.log("DBConnection Successfull!"))
.catch((err) => console.log(err));;

const io = require('socket.io')(3001, {
  cors:{
    origin: ['http://localhost:3000'],
    methods: ["GET", "POST"]
  }
})

const defaultValue = ""
io.on('connection', socket => {
  // socket.on('send-changes', delta => {
  //   socket.broadcast.emit("receive-changes", delta)
  // })
  
  socket.on('get-document', async documentId => {
    const document = await findOrCreateDocument(documentId)
    socket.join(documentId)
    socket.emit('load-document', document.data)

    socket.on('send-changes', delta => {
      socket.broadcast.to(documentId).emit("receive-changes", delta)
    })

    socket.on("save-document", async data => {
      await Doc.findByIdAndUpdate(documentId, { data })
    })
  })
  console.log('connected')
})

const findOrCreateDocument = async (id) => {
  if (id == null) return

  const doc = await Doc.findById(id)
  if (doc) return doc
  return await Doc.create({_id: id, data: defaultValue})
}