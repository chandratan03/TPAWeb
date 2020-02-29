package resolvers

import (
  "github.com/graphql-go/graphql"
  "models"
)

func InsertPassenger(params graphql.ResolveParams)(interface{}, error){
//Title:       Title,
//  Name:        Name,
//    Nationality: Nationality,
//    HeaderId:    HeaderId,

  title := params.Args["title"].(string)
  name := params.Args["name"].(string)
  nationality:= params.Args["nationality"].(string)
  headerId:= params.Args["headerId"].(int)

  row:= models.InsertPassenger(title, name, nationality, headerId)
  return row,nil

}
