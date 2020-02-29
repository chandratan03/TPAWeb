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
          "firstName": &graphql.Field{
            Type:graphql.String,
          },
          "lastName": &graphql.Field{
            Type:graphql.String,
          },
          "password": &graphql.Field{
            Type:graphql.String,
          },
          "email": &graphql.Field{
              Type: graphql.String,
            },
        //Address:     "Kemanggisan",
        //CityId:      1,
        //PostCode:    "25555",
          "phoneNumber": &graphql.Field{
            Type:graphql.String,
          },
          "address": &graphql.Field{
            Type: graphql.String,
          },
          "cityId": &graphql.Field{
            Type: graphql.Int,
          },
          "city": &graphql.Field{
            Type:GetCityType(),
          },
          "postCode":&graphql.Field{
            Type: graphql.String,
          },
          "gender": &graphql.Field{
              Type:graphql.String,
          },
            "nationality": &graphql.Field{
                  Type:graphql.String,
            },

            "phoneVerified": &graphql.Field{
                    Type:graphql.Boolean,
            },

        "emailVerified": &graphql.Field{
          Type:graphql.Boolean,
        },


      },
      //Description: "",
    })
  }
  return userType

}
