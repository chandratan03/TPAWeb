package query

import (
  "github.com/graphql-go/graphql"
  "query/resolvers"
  "query/types"
)

func GetRoot() *graphql.Object{
  return graphql.NewObject(graphql.ObjectConfig{
    Name: "RootQuery",
    Fields: graphql.Fields{
      "userById":{
        Type:graphql.NewList(types.GetUserType()),
        Args: graphql.FieldConfigArgument{
          "id" : &graphql.ArgumentConfig{
              Type: graphql.Int,
          },
        },
        Resolve: resolvers.GetUser,
        Description:"GET A USER",
      },
      "userByEmail":{
        Type:types.GetUserType(),
        Args: graphql.FieldConfigArgument{
          "email" : &graphql.ArgumentConfig{
              Type: graphql.String,
          },
        },
        Resolve: resolvers.GetUserByEmail,
        Description:"GET A USER",
      },
      "users":{
              Type: graphql.NewList(types.GetUserType()),
              Resolve: resolvers.GetUsers,
              Description:"Get all users",

      },

    },



  })



}

