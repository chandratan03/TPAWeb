package types

import "github.com/graphql-go/graphql"

var hotelTicketType *graphql.Object

//Id uint `gorm:"primary_key"`
//HotelId uint `json:"hotel_id"`
//Hotel Hotel `gorm:"foreingKey:hotel_id"`
//Date time.Time
//Quantity uint

func GetHotelTicketType() *graphql.Object{
  //print("TESTTTTTTTTTTTT")
  if hotelTicketType ==nil{
    hotelTicketType = graphql.NewObject(graphql.ObjectConfig{
      Name:        "HotelTicketType",
      Fields:      graphql.Fields{
        "id": &graphql.Field{
          Type:graphql.Int,
        },
        "hotel": &graphql.Field{
          Type:GetHotelType(),
        },
        "hotelId": &graphql.Field{
          Type:graphql.Int,
        },
        "price": &graphql.Field{
          Type:graphql.Float,
        },
        "quantity": &graphql.Field{
          Type:graphql.Int,
        },

      },
      Description: "Get hotel Room type",
    })


  }
  return hotelTicketType
}

