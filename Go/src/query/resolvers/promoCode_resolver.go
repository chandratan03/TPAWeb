package resolvers

import (
  "github.com/graphql-go/graphql"
  "models"
)

func GetPromoCodes(params graphql.ResolveParams)(interface{}, error){
  rows := models.GetPromoCodes()
  return rows,nil
}
func GetPromoByCode(params graphql.ResolveParams)(interface{}, error){
  code:= params.Args["code"].(string)
  row:= models.GetPromoByCode(code)

  return row, nil
}
