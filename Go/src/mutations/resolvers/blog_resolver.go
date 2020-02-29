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
  row := models.InsertBlog(title,description, userId,image)

  return row, nil
}


func UpdateBlogViewer(params graphql.ResolveParams)(interface{}, error){
  id:= params.Args["id"].(int)
  row := models.UpdateBlogViewer(id)

  return row, nil
}
