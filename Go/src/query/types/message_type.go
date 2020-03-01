package types


import "github.com/graphql-go/graphql"

var messageType *graphql.Object

func GetMessageType() *graphql.Object{
  if messageType == nil{
    messageType = graphql.NewObject(graphql.ObjectConfig{
      Name: "MessageType",
      Fields:      graphql.Fields{
        "id" : &graphql.Field{
          Type:graphql.Int,
        },
        "from": &graphql.Field{
          Type:graphql.Int,
        },
        "to": &graphql.Field{
          Type: graphql.Int,
        },
        "message": &graphql.Field{
          Type:graphql.String,
        },
        "date": &graphql.Field{
          Type:graphql.String,
        },
        "image": &graphql.Field{
          Type:graphql.String,
        },

      },
    })
  }
  return messageType

}
