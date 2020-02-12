package types

import "github.com/graphql-go/graphql"

var regionType *graphql.Object


func GetRegionType() *graphql.Object{
  if regionType == nil{
    regionType = graphql.NewObject(graphql.ObjectConfig{
      Name:        "RegionType",
      Fields:     graphql.Fields{
        "id" : &graphql.Field{
          Type:graphql.Int,
        },
        "regionName": &graphql.Field{
            Type:graphql.String,
        },
      },
      Description: "Get Region Type",
    })
  }
  return regionType
}



