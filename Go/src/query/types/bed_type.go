package types

import "github.com/graphql-go/graphql"

var bedType *graphql.Object

func GetBedType() *graphql.Object{
  if bedType ==nil{
    bedType = graphql.NewObject(graphql.ObjectConfig{
      Name:        "BedType",
      Fields:      graphql.Fields{
        "id": &graphql.Field{
          Type:graphql.Int,
        },
        "bedName": &graphql.Field{
          Type:graphql.String,
        },

      },
      Description: "Get Bed type",
    })


  }
  return bedType

}

