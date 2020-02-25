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
  City City `json "city" gorm:foreignKey:city_id`

}

func GetAirports()([]Airport, error){
  db,err := database.Connect()

  if err != nil{
    return nil, err
  }
  var airports[] Airport
  db.Find(&airports)
  for i,_ := range airports{
    db.Model(&airports[i]).Related(&airports[i].City).Model(&airports[i].City).Related(&airports[i].City.Region)
  }
  defer db.Close()
  return airports, nil
}
