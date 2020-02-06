package resolvers

import (
  "github.com/graphql-go/graphql"
  "models"
)
func GetFacilities(params graphql.ResolveParams)(interface{}, error){
  result,err := models.GetFacilities()
  if err!=nil{
    return nil,err
  }
  return result, nil
}

func GetFacilityById(params graphql.ResolveParams)(interface{}, error){
  id, ok :=  params.Args["id"].(uint)
  if ok{
    res, err := models.GetFacilityByID(id)
    if err!=nil{
      return nil, nil
    }
    return res, nil
  }
  return nil, nil
}
