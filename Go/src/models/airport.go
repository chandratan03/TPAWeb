package models

import (
  "Connect/database"
  "time"
)

type Airport struct{
  Id			int			`gorm:"primary_key"`
  CreatedAt	time.Time
  UpdatedAt 	time.Time
  DeletedAt 	*time.Time	`sql:index`
  Name		string
  CityId	int `json:"city_id"`
  City City `json "city" gorm:foreignKey`

}

func GetAirports()([]Airport, error){
  db,err := database.Connect()

  if err != nil{
    return nil, err
  }
  var airports[] Airport

  db.Find(&airports)
  defer db.Close()
  return airports, nil
}
