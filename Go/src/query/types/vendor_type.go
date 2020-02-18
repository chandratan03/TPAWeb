package types

import "github.com/graphql-go/graphql"

var vendorType *graphql.Object


func GetVendorType() *graphql.Object{
  if vendorType == nil{
    vendorType = graphql.NewObject(graphql.ObjectConfig{
      Name:        "vendorType",
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
  return vendorType
}
