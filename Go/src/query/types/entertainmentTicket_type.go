package types

import "github.com/graphql-go/graphql"

//Id int `gorm:"primary_key"`
//Date time.Time
//EntertainmentId int `json:"entertainment_id"`
//Entertainment int `gorm:"foreignKey:entertaintmentId"`
//Price float64
//DiscountPercentage int


var entertainmentTicketType *graphql.Object

func GetEntertainmentTicketType() *graphql.Object{
  if entertainmentTicketType == nil{
    entertainmentTicketType = graphql.NewObject(graphql.ObjectConfig{
      Name:        "entertainmentTicketType",
      Fields:     graphql.Fields{
        "id" : &graphql.Field{
          Type:graphql.Int,
        },
        "date": &graphql.Field{
          Type:graphql.String,
        },
        "entertainmentId": &graphql.Field{
          Type:graphql.Int,
        },
        "entertainment": &graphql.Field{
          Type:GetEntertainmentType(),
        },
        "price": &graphql.Field{
          Type:graphql.Float,
        },
        "discountPercentage": &graphql.Field{
          Type: graphql.Int,
        },
        "description": &graphql.Field{
          Type: graphql.String,
        },

      },
    })
  }
  return entertainmentTicketType
}
