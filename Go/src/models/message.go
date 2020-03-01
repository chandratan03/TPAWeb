package models

import (
  "Connect/database"
  "time"
)

type Message struct{
  Id int `gorm:"primary_key"`
  From int
  To int
  Message string
  Image string
  Date time.Time

}



func GetAllMessages()[]Message{
  db, err := database.Connect()
  if err!=nil{
    panic(err)
  }
  defer db.Close()
  var messages []Message
  db.Order("date desc").Find(&messages)
  return messages

}
func GetAllMessagesBySenderAndReceiver(from int, to int)[]Message{
  db, err := database.Connect()
  if err!=nil{
    panic(err)
  }
  defer db.Close()
  var messages []Message
  db.Where("(from = ? and to =?) or (to = ? and from = ?)", from, to, from, to).Find(&messages)

  return messages
}

func InsertMessage(from int, to int, message string, image string)Message{
  db, err := database.Connect()
  if err!=nil{
    panic(err)
  }
  defer db.Close()
  var m Message

  db.Create(&Message{
    From:    from,
    To:      to,
    Message: message,
    Image: image,
    Date:    time.Now(),
  })

  db.Last(&m)
  println(m.Message)
  return m
}




