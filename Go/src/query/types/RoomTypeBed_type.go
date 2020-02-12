package types

import "github.com/graphql-go/graphql"

var roomBedType *graphql.Object


func GetRoomBedType() *graphql.Object{
  //println("TESTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTT")
  if roomBedType == nil{
    roomBedType = graphql.NewObject(graphql.ObjectConfig{
      Name:        "roomTypeBedType",
      Fields:      graphql.Fields{
        "id": &graphql.Field{
          Type: graphql.Int,
        },
        "hotelRoomId": &graphql.Field{
          Type: graphql.Int,
        },
        "bed": &graphql.Field{
          Type: GetBedType(),
        },
      },
      Description: "get Room type bed is type",
    })
  }
  return roomBedType
}
