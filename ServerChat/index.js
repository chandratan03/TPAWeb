var io = require('socket.io')(2000)

console.log("test")

io.on('connection', (socket)=>{
    console.log("AH A USER")
    socket.on('chat', (message)=>{
        io.emit('chat', message)
    })
    socket.on('waitForNewBlog', (message)=>{
        io.emit('waitForNewBlog', message)
    })
})