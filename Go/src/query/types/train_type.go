package types

import "github.com/graphql-go/graphql"

var trainType *graphql.Object



//Id uint `gorm:"primary_key"'`
//Name string
//TrainClassId int `json:"train_class_id"`
//TrainClass TrainClass `gorm:"foreignkey:train_class_id"`
//TrainSubclass string

func GetTrainType() *graphql.Object{
  if trainType == nil{
    trainType = graphql.NewObject(graphql.ObjectConfig{
      Name:        "trainType",
      Fields:     graphql.Fields{
        "id": &graphql.Field{
          Type:graphql.Int,
        },
        "name": &graphql.Field{
          Type:graphql.String,
        },
        "trainClassId": &graphql.Field{
          Type:graphql.Int,
        },
        "trainClass": &graphql.Field{
          Type: GetTrainClassType(),
        },
        "trainSubClass": &graphql.Field{
          Type:graphql.String,
        },


      },
    })
  }
  return trainType
}


