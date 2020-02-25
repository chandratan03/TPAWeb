package types

import "github.com/graphql-go/graphql"

var headerTransactionType *graphql.Object
//Id int `gorm:"primary_key"`
//UserId int `json:"user_id"`
//User User `gorm:"foreignKey:user_id"`
//DetailTransactions []DetailTransaction
//Date time.Time
func GetHeaderTransactionType() *graphql.Object{
  if headerTransactionType == nil{
    headerTransactionType = graphql.NewObject(graphql.ObjectConfig{
      Name:        "HeaderTransactionType",
      Fields:     graphql.Fields{
        "id": &graphql.Field{
          Type:graphql.Int,
        },
        "userId": &graphql.Field{
          Type:graphql.Int,
        },
        "user": &graphql.Field{
          Type:GetUserType(),
        },
        "date": &graphql.Field{
          Type: graphql.DateTime,
        },
        "detailTransactions": &graphql.Field{
          Type: graphql.NewList(GetDetailTransactionType()),
        },
      },
    })
  }
  return headerTransactionType
}
