package resolvers

import (
  "github.com/graphql-go/graphql"
  "models"
)

func InsertEntertainment(p graphql.ResolveParams)(interface{}, error){
  name:= p.Args["name"].(string)
  price:= p.Args["price"].(float64)
  category:= p.Args["category"].(string)
  isTrending:= p.Args["isTrending"].(bool)
  cityId:= p.Args["cityId"].(int)
  image := p.Args["image"].(string)
  description:= p.Args["description"].(string)
  terms:= p.Args["terms"].(string)


  row := models.InsertEntertainment(name,
    price, category, isTrending, cityId,
    image,description,terms)
  return row,nil
}


func UpdateEntertainment(p graphql.ResolveParams)(interface{}, error){
  id:= p.Args["id"].(int)
  name:= p.Args["name"].(string)
  price:= p.Args["price"].(float64)
  category:= p.Args["category"].(string)
  isTrending:= p.Args["isTrending"].(bool)
  cityId:= p.Args["cityId"].(int)
  image := p.Args["image"].(string)
  description:= p.Args["description"].(string)
  terms:= p.Args["terms"].(string)

  row := models.UpdateEntertainment(id,name,
    price, category, isTrending, cityId,
    image,description,terms)
  return row,nil
}


func DeleteEntertainmentById(params graphql.ResolveParams)(interface{}, error){
  id:= params.Args["id"].(int)
  row:= models.DeleteEntertainment(id)
  return row, nil
}


