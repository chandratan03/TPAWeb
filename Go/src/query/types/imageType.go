package types

import "github.com/graphql-go/graphql"

var imageType *graphql.Object

func GetImageType() *graphql.Object{
  if imageType == nil{
    imageType = graphql.NewObject(graphql.ObjectConfig{
      Name: "ImageType",
      Fields:      graphql.Fields{
        "id" : &graphql.Field{
          Type:graphql.String,
        },
        "hotelRoomId": &graphql.Field{
            Type:graphql.String,
        },
        "path": &graphql.Field{
          Type: graphql.String,
        },
      },
      Description: "Get Image type",
    })
  }



  return imageType
}

