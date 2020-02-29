package resolvers

import (
  "github.com/graphql-go/graphql"
  "models"
)

func GetBlogs(params graphql.ResolveParams)(interface{}, error){
  blogs := models.GetBlogs()
  return blogs, nil

}

func GetBlogById(params graphql.ResolveParams)(interface{}, error){
  id := params.Args["id"].(int)

  row :=  models.GetBlogById(id)
  return row, nil
}


func GetTrendingBlogs(params graphql.ResolveParams)(interface{}, error){
  blogs := models.GetTrendingBlog()
  return blogs, nil

}
