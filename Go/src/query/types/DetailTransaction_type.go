package types

import "github.com/graphql-go/graphql"

var detailTransactionType *graphql.Object
//Id int `gorm:"primary_key"`
//HeaderId int
//FlightId int `json:"flight_id"`
//Flight Flight `gorm:"foreign_key:flight_id"`
//Quantity int
//Type string
func GetDetailTransactionType() *graphql.Object{
  if detailTransactionType == nil{
    detailTransactionType = graphql.NewObject(graphql.ObjectConfig{
      Name:        "DetailTransactionType",
      Fields:     graphql.Fields{
        "id": &graphql.Field{
          Type:graphql.Int,
        },
        "headerId": &graphql.Field{
          Type:graphql.Int,
        },
        "flightId": &graphql.Field{
          Type:graphql.Int,
        },
        "flight": &graphql.Field{
          Type: GetFlightType(),
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
  return detailTransactionType
}

