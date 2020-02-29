package types

import "github.com/graphql-go/graphql"

var entertainmentType *graphql.Object
//Id int `gorm:"primary_key"`
//Name string
//Price float64
//Category string
//Longitude float64
//Latitude float64
//areaId int `json:"area_id"`
//Area Area `gorm:"foreignKey:area_id"`
//Image string
//Images []string
//CreatedAt time.Time
//UpdatedAt time.Time
//DeletedAt *time.Time `sql:"index"`
func GetEntertainmentType() *graphql.Object{
  if entertainmentType == nil{
    entertainmentType = graphql.NewObject(graphql.ObjectConfig{
      Name:        "entertainmentType",
      Fields:     graphql.Fields{
        "id" : &graphql.Field{
          Type:graphql.Int,
        },
        "name": &graphql.Field{
          Type:graphql.String,
        },
        "price": &graphql.Field{
          Type:graphql.Float,
        },
        "category": &graphql.Field{
          Type:graphql.String,
        },
        "longitude": &graphql.Field{
          Type:graphql.Float,
        },
        "latitude": &graphql.Field{
          Type: graphql.Float,
        },
        "cityId": &graphql.Field{
          Type:graphql.Int,
        },
        "city": &graphql.Field{
          Type:GetCityType(),
        },
        "image": &graphql.Field{
          Type: graphql.String,
        },
        "imageEntertainments": &graphql.Field{
         Type:graphql.NewList(GetImageEntertainmentType()),
        },
        "isTrending": &graphql.Field{
           Type:graphql.Boolean,
        },
      },
    })
  }
  return entertainmentType
}
