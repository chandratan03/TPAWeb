package types

import (
  "github.com/graphql-go/graphql"
)

var ratingType *graphql.Object

//Description string
//RateScore float32
//Date time.Time
func GetRatingType() *graphql.Object{
  if ratingType == nil{
    ratingType = graphql.NewObject(graphql.ObjectConfig{
      Name:        "ratingType",
      Fields:     graphql.Fields{
        "id" : &graphql.Field{
          Type:graphql.Int,
        },
        "hotelId": &graphql.Field{
          Type:graphql.String,
        },
        "description": &graphql.Field{
          Type:graphql.String,
        },
        "rateScore": &graphql.Field{
          Type:graphql.Float,
        },
        "date": &graphql.Field{
          Type:graphql.DateTime,
        },
      },
      Description: "Get Rating Type",
    })
  }
  return ratingType
}
