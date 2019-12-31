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
      "user":{
        Type:graphql.NewList(types.GetUserType()),
        Args: graphql.FieldConfigArgument{
          "id" : &graphql.ArgumentConfig{
            Type: graphql.Int,
          },
        },
        Resolve: resolvers.GetUser,
        Description:"GET A USER",
      },

    },



  })



}

