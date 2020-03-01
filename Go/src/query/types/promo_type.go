package types

import "github.com/graphql-go/graphql"

var promoType *graphql.Object

//Description string
//RateScore float32
//Date time.Time

//Id int `gorm:primary_key`
//Name string
//PromoPrice float64
//PromoCode string
//AvailableUntil time.Time
//Platform string
//PromoFor string
//Description string
func GetPromoType() *graphql.Object{
  if promoType == nil{
    promoType = graphql.NewObject(graphql.ObjectConfig{
      Name:        "promoType",
      Fields:     graphql.Fields{
        "id" : &graphql.Field{
          Type:graphql.Int,
        },
        "name": &graphql.Field{
          Type:graphql.String,
        },
        "promoPrice": &graphql.Field{
          Type:graphql.Int,
        },
        "promoCode": &graphql.Field{
          Type: graphql.String,
        },
        "availableUntil": &graphql.Field{
          Type:graphql.DateTime,
        },
        "platform": &graphql.Field{
          Type:graphql.String,
        },
        "promoFor": &graphql.Field{
          Type:graphql.String,
        },
        "description": &graphql.Field{
          Type:graphql.String,
        },
        "image": &graphql.Field{
            Type:graphql.String,
        },

      },
    })
  }
  return promoType
}
