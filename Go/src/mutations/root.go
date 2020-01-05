package mutations

import (
  "github.com/graphql-go/graphql"
  "mutations/resolvers"

  //"query/resolvers"
  "query/types"
)

func GetRoot() *graphql.Object{
  return graphql.NewObject(graphql.ObjectConfig{
    Name: "RootMutation",
    Fields:graphql.Fields{
      "createUser": &graphql.Field{
        Type:              types.GetUserType(),
        Args: graphql.FieldConfigArgument{
          "firstName" : &graphql.ArgumentConfig{
            Type: graphql.NewNonNull(graphql.String),
          },
          "lastName" : &graphql.ArgumentConfig{
            Type: graphql.NewNonNull(graphql.String),
          },
          "password" : &graphql.ArgumentConfig{
            Type: graphql.NewNonNull(graphql.String),
          },
          "email" : &graphql.ArgumentConfig{
            Type: graphql.NewNonNull(graphql.String),
          },
          "phoneNumber" : &graphql.ArgumentConfig{
            Type: graphql.NewNonNull(graphql.String),
          },
        },
        Resolve:          resolvers.CreateUser,
      },



    },
  })
}
