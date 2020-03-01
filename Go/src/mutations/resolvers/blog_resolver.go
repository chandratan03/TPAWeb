package resolvers

import (
  "github.com/graphql-go/graphql"
  "models"
)

func InsertBlog(params graphql.ResolveParams)(interface{}, error){
  title := params.Args["title"].(string)
  description:= params.Args["description"].(string)
  userId:=params.Args["userId"].(int)
  image := params.Args["image"].(string)
  var category = ""
  if params.Args["category"]!=nil{
    category = params.Args["category"].(string)
  }

  row := models.InsertBlog(title,description, userId,image, category)

  return row, nil
}


func UpdateBlogById(params graphql.ResolveParams)(interface{}, error){
  id := params.Args["id"].(int)
  title := params.Args["title"].(string)
  description:= params.Args["description"].(string)
  userId:=params.Args["userId"].(int)
  image := params.Args["image"].(string)
  var category = ""
  if params.Args["category"]!=nil{
    category = params.Args["category"].(string)
  }

  row := models.UpdateBlogById(id,title,description, userId,image, category)

  return row, nil
}


func DeleteBlogById(params graphql.ResolveParams)(interface{}, error){
  id:= params.Args["id"].(int)
  row := models.DeleteBlogById(id)

  return row, nil
}

func UpdateBlogViewer(params graphql.ResolveParams)(interface{}, error){
  id:= params.Args["id"].(int)
  row := models.UpdateBlogViewer(id)

  return row, nil
}
