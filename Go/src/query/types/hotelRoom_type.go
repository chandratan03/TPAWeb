package types

import "github.com/graphql-go/graphql"

var hotelRoomType *graphql.Object

func GetHotelRoomType() *graphql.Object{
  //print("TESTTTTTTTTTTTT")
  if hotelRoomType ==nil{
    hotelRoomType = graphql.NewObject(graphql.ObjectConfig{
      Name:        "HotelRoomType",
      Fields:      graphql.Fields{
        "id": &graphql.Field{
          Type:graphql.Int,
        },
        "name": &graphql.Field{
          Type:graphql.String,
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
        "imagePath": &graphql.Field{
          Type:graphql.String,
        },
        "maxGuest": &graphql.Field{
          Type:graphql.Int,
        },
        "hotelRoomBeds": &graphql.Field{
          Type: graphql.NewList(GetRoomBedType()),
        },
        "space": &graphql.Field{
          Type:graphql.Float,
        },
        "freeBreakFast": &graphql.Field{
          Type:graphql.Boolean,
        },
        "freeWifi": &graphql.Field{
          Type:graphql.Boolean,
        },
        "images": &graphql.Field{
            Type:graphql.NewList(GetImageType()),
        },
      },
      Description: "Get hotel Room type",
    })


  }
  return hotelRoomType

}
