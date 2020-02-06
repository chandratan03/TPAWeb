package types

import "github.com/graphql-go/graphql"

var facilityType *graphql.Object

func GetFacilityType() *graphql.Object{
  if facilityType == nil{
    facilityType = graphql.NewObject(graphql.ObjectConfig{
      Name: "FacilityType",
      Fields: graphql.Fields{
        "id": &graphql.Field{
          Type: graphql.Int,
      },
        "name":&graphql.Field{
            Type:graphql.String,
        },
        "imagePath": &graphql.Field{
              Type:graphql.String,
        },
      },
      Description: "Get Facility Type",
    })
    }
  return facilityType
}
