package types

import "github.com/graphql-go/graphql"

var cityType *graphql.Object

func GetCityType() *graphql.Object{
  if cityType == nil{
    cityType = graphql.NewObject(graphql.ObjectConfig{
      Name:        "CityType",
      Fields:     graphql.Fields{
        "id" : &graphql.Field{
          Type:graphql.Int,
        },
        "cityName": &graphql.Field{
          Type:graphql.String,
        },
        "region": &graphql.Field{
          Type: GetRegionType(),
        },
        "cityCode": &graphql.Field{
            Type:graphql.String,
        },
        "thumbnail": &graphql.Field{
            Type:graphql.String,
        },
        "longitude": &graphql.Field{
              Type: graphql.Float,
        },
        "latitude": &graphql.Field{
          Type: graphql.Float,
        },


      },
      Description: "Get city Type",
    })
  }
  return cityType
}
