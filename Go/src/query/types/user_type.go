package types

import "github.com/graphql-go/graphql"

var userType *graphql.Object

func GetUserType() *graphql.Object{
  if userType == nil{
    userType = graphql.NewObject(graphql.ObjectConfig{
      Name:        "UserType",
      Fields:      graphql.Fields{
          "id": &graphql.Field{
            Type: graphql.Int,
          },
          "name": &graphql.Field{
            Type:graphql.String,
          },
      },
      //Description: "",
    })
  }
  return userType

}
