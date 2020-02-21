package types

import "github.com/graphql-go/graphql"

//Id uint `gorm:primary_key`
//CreatedAt		time.Time
//UpdatedAt		time.Time
//DeletedAt		*time.Time		`sql:index`
//Name string
var trainTypeType *graphql.Object

func GetTrainTypeType() *graphql.Object{
  if trainTypeType == nil{
    trainTypeType = graphql.NewObject(graphql.ObjectConfig{
      Name:        "TrainTypeType",
      Fields:      graphql.Fields{
        "id": &graphql.Field{
          Type:graphql.Int,
        },
        "name": &graphql.Field{
          Type:graphql.String,
        },
      },
    })
  }
  return trainTypeType

}
