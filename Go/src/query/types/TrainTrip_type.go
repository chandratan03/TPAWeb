package types

import "github.com/graphql-go/graphql"


//Id uint `gorm:"primary_key"`
//Train Train
//FromRefer		uint `json:"from_refer"`
//From			Station		`gorm:"foreignKey:from_refer"`
//ToRefer			uint `json:"to_refer"`
//To				Station		`gorm:"foreignKey:to_refer"`
//Departure		time.Time
//Arrival 		time.Time
//Duration		uint
//Price			float
//Tax				f
//ServiceCharge	f
var trainTripType *graphql.Object

func GetTrainTripType() *graphql.Object{
  if trainTripType == nil{
    trainTripType = graphql.NewObject(graphql.ObjectConfig{
      Name:        "TrainTripType",
      Fields:      graphql.Fields{
        "id": &graphql.Field{
          Type:graphql.Int,
        },
        "train": &graphql.Field{
          Type:GetTrainType(),
        },
        "from": &graphql.Field{
          Type: GetStationType(),
        },
        "to": &graphql.Field{
            Type:GetStationType(),
        },
        "departure": &graphql.Field{
          Type: graphql.DateTime,
        },
        "arrival": &graphql.Field{
          Type:graphql.DateTime,
        },
        "duration": &graphql.Field{
          Type: graphql.Int,
        },
        "price": &graphql.Field{
          Type:graphql.Float,
        },
        "tax": &graphql.Field{
          Type:graphql.Float,
        },
        "serviceCharge": &graphql.Field{
          Type:graphql.Float,
        },
      },
    })
  }
  return trainTripType

}
