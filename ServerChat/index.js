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
    socket.on('waitForNewEvent', (message)=>{
        io.emit('waitForNewEvent', message)
    })
    socket.on('waitForNewFlight', (message)=>{
        io.emit('waitForNewFlight', message)
    })
    socket.on('waitForNewHotel', (message)=>{
        io.emit('waitForNewHotel', message)
    })
    socket.on('waitForNewTrain', (message)=>{
        io.emit('waitForNewTrain', message)
    })
    socket.on('waitForNewCar', (message)=>{
        io.emit('waitForNewCar', message)
    })
})