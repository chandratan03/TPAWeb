package types
//Id int `gorm:"primary_key"`
//UserId int
//FlightId int `json:"flight_id"`
//Flight Flight `json:"foreingKey:flight_id"`
//Quantity int
//Type string
//Date time.Time


import "github.com/graphql-go/graphql"

var cartType *graphql.Object

func GetCartType() *graphql.Object{
  if cartType == nil{
    cartType = graphql.NewObject(graphql.ObjectConfig{
      Name:        "cartType",
      Fields:     graphql.Fields{
        "id" : &graphql.Field{
          Type:graphql.Int,
        },
        "userId": &graphql.Field{
          Type:graphql.Int,
        },
        "flightId": &graphql.Field{
          Type: graphql.Int,
        },
        "flight": &graphql.Field{
          Type:GetFlightType(),
        },
        "quantity": &graphql.Field{
          Type:graphql.Int,
        },
        "type": &graphql.Field{
          Type: graphql.String,
        },
      },
    })
  }
  return cartType
}
