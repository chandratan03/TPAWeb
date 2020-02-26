package types

import "github.com/graphql-go/graphql"

var promoCodeType *graphql.Object

//Description string
//RateScore float32
//Date time.Time
func GetPromoCodeType() *graphql.Object{
  if promoCodeType == nil{
    promoCodeType = graphql.NewObject(graphql.ObjectConfig{
      Name:        "promoCodeType",
      Fields:     graphql.Fields{
        "id" : &graphql.Field{
          Type:graphql.Int,
        },
        "code": &graphql.Field{
          Type:graphql.String,
        },
        "discountPercentage": &graphql.Field{
          Type:graphql.Int,
        },
      },
    })
  }
  return promoCodeType
}
