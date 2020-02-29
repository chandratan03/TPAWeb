package types

import "github.com/graphql-go/graphql"

var imageEntertainmentType *graphql.Object

func GetImageEntertainmentType() *graphql.Object{
  if imageEntertainmentType == nil{
    imageEntertainmentType = graphql.NewObject(graphql.ObjectConfig{
      Name: "ImageEntertainmentType",
      Fields:      graphql.Fields{
        "id" : &graphql.Field{
          Type:graphql.Int,
        },
        "entertainmentId": &graphql.Field{
          Type:graphql.Int,
        },
        "path": &graphql.Field{
          Type: graphql.String,
        },
      },
      Description:"get image ",
    })
  }



  return imageEntertainmentType
}
