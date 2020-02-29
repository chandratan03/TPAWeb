package types

import "github.com/graphql-go/graphql"

var blogType *graphql.Object
//Id        uint `gorm:"primary_key"`
//CreatedAt time.Time
//UpdatedAt time.Time
//DeletedAt *time.Time `sql:"index"`
//Title string
//Description string
//ViewerNumber int
//UserId int
func GetBlogType() *graphql.Object{
  if blogType ==nil{
    blogType = graphql.NewObject(graphql.ObjectConfig{
      Name:        "BlogType",
      Fields:      graphql.Fields{
        "id": &graphql.Field{
          Type:graphql.Int,
        },
        "title": &graphql.Field{
          Type:graphql.String,
        },
        "description": &graphql.Field{
          Type:graphql.String,
        },
        "viewerNumber": &graphql.Field{
            Type:graphql.Int,
        },
        "userId": &graphql.Field{
              Type:graphql.Int,
        },
        "image": &graphql.Field{
          Type:graphql.String,
        },

      },
    })


  }
  return blogType

}

