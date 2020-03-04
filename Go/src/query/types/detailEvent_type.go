package types

import "github.com/graphql-go/graphql"

var detailEventType *graphql.Object
//Id int `gorm:"primary_key"`
//HeaderId int
//FlightId int `json:"flight_id"`
//Flight Flight `gorm:"foreign_key:flight_id"`
//Quantity int
//Type string
func GetEventDetailType() *graphql.Object{
  if detailEventType == nil{
    detailEventType = graphql.NewObject(graphql.ObjectConfig{
      Name:        "DetailEventType",
      Fields:     graphql.Fields{
        "id": &graphql.Field{
          Type:graphql.Int,
        },
        "headerId": &graphql.Field{
          Type:graphql.Int,
        },
        "entertainmentTicketId": &graphql.Field{
          Type:graphql.Int,
        },
        "entertainmentTicket": &graphql.Field{
          Type: GetEntertainmentTicketType(),
        },
        "quantity": &graphql.Field{
          Type:graphql.Int,
        },
        "type": &graphql.Field{
          Type:graphql.String,
        },
      },
    })
  }
  return entertainmentTicketType
}

