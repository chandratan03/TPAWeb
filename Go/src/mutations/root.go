package mutations

import "github.com/graphql-go/graphql"

func GetRoot() *graphql.Object{
  return graphql.NewObject(graphql.ObjectConfig{
    Name: "RootMutation",
    Fields:graphql.Fields{
      //"Create"



    },
  })
}
