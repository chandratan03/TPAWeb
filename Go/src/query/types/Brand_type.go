package types

import "github.com/graphql-go/graphql"

var brandType *graphql.Object


func GetBrandType() *graphql.Object{
  if brandType == nil{
    brandType = graphql.NewObject(graphql.ObjectConfig{
      Name:        "brandType",
      Fields:      graphql.Fields{
        "id": &graphql.Field{
          Type: graphql.Int,
        },
        "name": &graphql.Field{
          Type:graphql.String,
        },
        "imagePath": &graphql.Field{
          Type:graphql.String,
        },
      },
    })
  }
  return brandType
}
