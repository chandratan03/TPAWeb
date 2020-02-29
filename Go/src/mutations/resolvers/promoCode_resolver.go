package resolvers

import (
  "github.com/graphql-go/graphql"
  "models"
)

func DeletePromoCodeByCode(params graphql.ResolveParams)(interface{}, error){
  code:= params.Args["code"].(string)
  row := models.DeletePromoByCode(code)
  return row, nil
}
