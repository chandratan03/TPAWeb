package models

import (
  "Connect/database"
  "time"
)

type Blog struct{

  Id        uint `gorm:"primary_key"`
  CreatedAt time.Time
  UpdatedAt time.Time
  DeletedAt *time.Time `sql:"index"`
  Title string
  Description string
  ViewerNumber int
  UserId int
  Image string
}


func GetBlogs() []Blog{
  db, err := database.Connect()

  if err!=nil{
    panic(err)
  }
  defer db.Close()
  var blogs []Blog
  db.Find(&blogs)

  return blogs
}



func InsertBlog(title string, description string, userId int, image string)Blog {
  db, err := database.Connect()

  if err!=nil{
    panic(err)
  }
  defer db.Close()
  var blog Blog
  db.Create(&Blog{
    CreatedAt:    time.Time{},
    UpdatedAt:    time.Time{},
    Title:        title,
    Description:  description,
    ViewerNumber: 0,
    UserId:       userId,
    Image:image,
  })
  db.Last(&blog)
  return blog

}



func UpdateBlogViewer(id int)Blog{
  db, err := database.Connect()
  if err!=nil{
    panic(err)
  }
  defer db.Close()
  var blog Blog
  db.Where("id = ?", id).Find(&blog)
  blog.ViewerNumber++
  db.Save(&blog)
  return blog
}

func GetBlogById(id int)Blog{
  db, err := database.Connect()

  if err!=nil{
    panic(err)
  }
  defer db.Close()
  var blog Blog
  db.Where("id = ?", id).Find(&blog)

  return blog
}


func GetTrendingBlog()[]Blog{
  db, err := database.Connect()

  if err!=nil{
    panic(err)
  }
  defer db.Close()
  var blogs []Blog
  db.Order("viewer_number desc").Limit(5).Find(&blogs)

  return blogs
}
