package types

import "github.com/graphql-go/graphql"

var vendorCarType *graphql.Object


func GetVendorCarType() *graphql.Object{
  if vendorCarType == nil{
    vendorCarType = graphql.NewObject(graphql.ObjectConfig{
      Name:        "vendorCarType",
      Fields:      graphql.Fields{
        "id": &graphql.Field{
          Type: graphql.Int,
        },
        "name": &graphql.Field{
          Type:graphql.String,
        },
        "vendor": &graphql.Field{
          Type:GetVendorType(),
        },
        "price": &graphql.Field{
            Type:graphql.Float,
        },
        "area": &graphql.Field{
          Type: GetAreaType(),
        },
      },
    })
  }
  return vendorCarType
}

