package main

import (
  "Connect/database"
  "fmt"
  "github.com/gorilla/mux"
  "github.com/graphql-go/graphql"
  "github.com/graphql-go/handler"
  "github.com/jinzhu/gorm"
  _ "github.com/lib/pq"
  "log"
  "middleware"
  "models"
  "mutations"
  "net/http"
  "query"
  "time"
)




//const (
//  host     = "167.71.168.135"
//  port     = 5432
//  user     = "CT"
//  password = "CTCTCT"
//  dbname   = "CT"
//)
var router = mux.NewRouter()


func migrateDB(db *gorm.DB) {

  db.AutoMigrate(models.Region{})
  db.AutoMigrate(models.City{}).AddForeignKey("region_id", "regions(id)", "CASCADE", "CASCADE")
  db.AutoMigrate(models.Location{}).AddForeignKey("city_id", "cities(id)", "CASCADE", "CASCADE")
  db.AutoMigrate(models.Hotel{}).AddForeignKey("location_id", "locations(id)", "CASCADE" , "CASCADE")

  //db.AutoMigrate(models.AvailableDateForHotel{}).AddForeignKey("hotel_id", "hotels(id)", "CASCADE", "CASCADE")
  db.AutoMigrate(models.User{})
  db.AutoMigrate(models.HotelFacility{}).AddForeignKey("facility_id", "facilities", "Cascade", "Cascade")
  db.AutoMigrate(models.Facility{})
  //db.AutoMigrate(models.HotelFacility{}).AddForeignKey("hotel_id", "hotels(id)", "RESTRICT", "RESTRICT" )

  db.AutoMigrate(models.Airport{}).AddForeignKey("city_id", "cities", "NO ACTION", "NO ACTION")
  db.AutoMigrate(models.Airline{})
  db.AutoMigrate(models.Flight{}).AddForeignKey("airline_refer", "airlines", "CASCADE", "CASCADE").
    AddForeignKey("from_refer", "airports", "CASCADE", "CASCADE").AddForeignKey("to_refer",
      "airports", "CASCADE", "CASCADE")
  //from_refer to_refer (airport),  flight_id
  db.AutoMigrate(models.Route{}).AddForeignKey("from_refer", "airports(id)", "CASCADE", "CASCADE").
    AddForeignKey("to_refer", "airports(id)", "CASCADE", "CASCADE").AddForeignKey(
      "flight_id", "flights(id)","CASCADE","CASCADE")

}

func initDBUser(db *gorm.DB){
  db.Create(&models.User{
    //ID:          0,
    //CreatedAt:   time.Time{},
    //UpdatedAt:   time.Time{},
    //DeletedAt:   nil,
    FirstName:   "Chandra",
    LastName:    "hehe",
    Email:       "chandra",
    Password:    "chandra",
    PhoneNumber: "+628123123123",
  })
}

func initRegion(db *gorm.DB){
  db.Create(&models.Region{
    RegionName: "Indonesia",
  })
  db.Create(&models.Region{
    RegionName: "Singapore",
  })
  db.Create(&models.Region{
    RegionName: "Malaysia",
  })
  db.Create(&models.Region{
    RegionName: "Australia",
  })
}



func initCity(db *gorm.DB){
  db.Create(&models.City{
    CityName: "Jakarta",
    RegionId: 1,
  })
  db.Create(&models.City{
    CityName: "Bali",
    RegionId: 1,
  })
  db.Create(&models.City{
    CityName: "Batam",
    RegionId: 1,
  })
  db.Create(&models.City{
    CityName: "Harbour Bay",
    RegionId: 2,
  })
  db.Create(&models.City{
    CityName: "Orchard Road",
    RegionId: 2,
  })
  db.Create(&models.City{
    CityName: "Bugis",
    RegionId: 2,
  })
}

func initLocations(db *gorm.DB){
  db.Create(&models.Location{
    Longitude: 1.0,
    Latitude:  2.0,
    CityId:    4,
  })
  db.Create(&models.Location{
    Longitude: 3.0,
    Latitude:  4.0,
    CityId:    5,
  })
  db.Create(&models.Location{
    Longitude: 3.0,
    Latitude:  5.0,
    CityId:    6,
  })
  db.Create(&models.Location{
    Longitude: 3.0,
    Latitude:  3.0,
    CityId:    5,
  })
}

func initHotel(db *gorm.DB){
  db.Create(&models.Hotel{
    HotelName:      "The Langham",
    Price:          700000,
    Rate:           4,
    LocationId:     9,
    Address:        "Jl. Menuju Surga",
    Quantity:      100,
    ImagePath: "../../../assets/hotel/search/hotel-images/shinchan-image.jpg",
  })
  db.Create(&models.Hotel{
    HotelName:      "The Greenwich",
    Price:          1000000,
    Rate:           5,
    LocationId:     9,
    Address:        "Jl. Palmerah",
    Quantity:      100,
    ImagePath: "../../../assets/hotel/search/hotel-images/shinchan-image.jpg",
  })
  db.Create(&models.Hotel{
    HotelName:      "The Jefferson",
    Price:          1200000,
    Rate:           4,
    LocationId:     10,
    Address:        "Jl. soedirman",
    Quantity:      100,
    ImagePath: "../../../assets/hotel/search/hotel-images/shinchan-image.jpg",
  })
}

func initFacilities(db *gorm.DB){
  db.Create(&models.Facility{
    Name:      "AC",
    ImagePath: "../../../assets/hotel/search/facilities/AC.png",
  })
  db.Create(&models.Facility{
    Name:      "Wifi",
    ImagePath: ".../../../assets/hotel/search/facilities/wifi.png",
  })
  db.Create(&models.Facility{
    Name:      "Parking",
    ImagePath: "../../../assets/hotel/search/facilities/Parking.png",
  })

}

func initHotelFacilities(db *gorm.DB){
  db.Create(&models.HotelFacility{
    HotelId:    1,
    FacilityId: 1,
  })
  db.Create(&models.HotelFacility{
    HotelId:    1,
    FacilityId: 2,
  })
  db.Create(&models.HotelFacility{
    HotelId:    1,
    FacilityId: 3,
  })
  db.Create(&models.HotelFacility{
    HotelId:    2,
    FacilityId: 1,
  })
  db.Create(&models.HotelFacility{
    HotelId:    2,
    FacilityId: 2,
  })
  db.Create(&models.HotelFacility{
    HotelId:    2,
    FacilityId: 3,
  })
  db.Create(&models.HotelFacility{
    HotelId:    3,
    FacilityId: 1,
  })
  db.Create(&models.HotelFacility{
    HotelId:    3,
    FacilityId: 2,
  })
  db.Create(&models.HotelFacility{
    HotelId:    3,
    FacilityId: 3,
  })
}




// Flights
func initAirport(db *gorm.DB){
  db.Create(&models.Airport{
    Name:      "Changi International Airport",
    CityId:    34, // sg
  })
  db.Create(&models.Airport{
    Name:      "Changi2 International Airport",
    CityId:    35,//sg
  })
  db.Create(&models.Airport{
    Name:      "Changi3 International Airport",
    CityId:    36,//sg
  })
  db.Create(&models.Airport{
    Name:      "Soekarno-Hatta International Airport",
    CityId:    37,//jkt
  })
  db.Create(&models.Airport{
    Name:      "Ngurah rai International Airport",
    CityId:    38,//bali
  })
  db.Create(&models.Airport{
    Name:      "Hang Nadim International Airport",
    CityId:    39,//batam
  })


}
func initAirline(db *gorm.DB){
  db.Create(&models.Airline{
    Name:      "Lion Air",
  })
  db.Create(&models.Airline{
    Name:      "Garuda",
  })
  db.Create(&models.Airline{
    Name:      "Scoot",
  })
}
func initFlight(db *gorm.DB){
  db.Create(&models.Flight{
    AirlineRefer:  1,
    FromRefer:     1,
    ToRefer:       4,
    Departure:     time.Date(2020, 03, 01, 18, 0, 0, 0, time.Now().Location()),
    Arrival:       time.Date(2020, 03, 01, 21, 0, 0, 0, time.Now().Location()),
    Duration:      180,
    Price:         1000000,
    Tax:           100000,
    ServiceCharge: 0,
  })
  db.Create(&models.Flight{
    AirlineRefer:  2,
    FromRefer:     2,
    ToRefer:       4,
    Departure:     time.Date(2020, 03, 01, 19, 0, 0, 0, time.Now().Location()),
    Arrival:       time.Date(2020, 03, 01, 22, 0, 0, 0, time.Now().Location()),
    Duration:      180,
    Price:         1000000,
    Tax:           100000,
    ServiceCharge: 0,
  })
  db.Create(&models.Flight{
    AirlineRefer:  3,
    FromRefer:     3,
    ToRefer:       4,
    Departure:     time.Date(2020, 03, 01, 13, 0, 0, 0, time.Now().Location()),
    Arrival:       time.Date(2020, 03, 01, 16, 0, 0, 0, time.Now().Location()),
    Duration:      180,
    Price:         1000000,
    Tax:           100000,
    ServiceCharge: 0,
  })
  db.Create(&models.Flight{
    AirlineRefer:  1,
    FromRefer:     4,
    ToRefer:       1,
    Departure:     time.Date(2020, 03, 01, 12, 0, 0, 0, time.Now().Location()),
    Arrival:       time.Date(2020, 03, 01, 15, 0, 0, 0, time.Now().Location()),
    Duration:      180,
    Price:         1000000,
    Tax:           100000,
    ServiceCharge: 0,
  })
  db.Create(&models.Flight{
    AirlineRefer:  1,
    FromRefer:     4,
    ToRefer:       1,
    Departure:     time.Date(2020, 03, 01, 8, 0, 0, 0, time.Now().Location()),
    Arrival:       time.Date(2020, 03, 01, 11, 0, 0, 0, time.Now().Location()),
    Duration:      180,
    Price:         1000000,
    Tax:           100000,
    ServiceCharge: 0,
  })
  db.Create(&models.Flight{
    AirlineRefer:  1,
    FromRefer:     4,
    ToRefer:       1,
    Departure:     time.Date(2020, 03, 01, 6, 0, 0, 0, time.Now().Location()),
    Arrival:       time.Date(2020, 03, 01, 9, 0, 0, 0, time.Now().Location()),
    Duration:      180,
    Price:         1000000,
    Tax:           100000,
    ServiceCharge: 0,
  })
}
func initRoute(db *gorm.DB){
  db.Create(&models.Route{
    FlightId:  1,
    FromRefer: 2,
    ToRefer:   3,
  })
  db.Create(&models.Route{
    FlightId:  1,
    FromRefer: 3,
    ToRefer:   4,
  })
  db.Create(&models.Route{
    FlightId:  1,
    FromRefer: 2,
    ToRefer:   3,
  })
}



func main() {
  // FOR CREATE TABLE
  //--------------------------------------------------------
  db,err := database.Connect()
  if err!=nil{
    panic(err)
  }

  migrateDB(db)
  //initDBUser(db)
  //initRegion(db)
  //initCity(db)
  //initLocations(db)
  //initHotel(db)
  //initFacilities(db)
  //initHotelFacilities(db)

  //initAirport(db)
  //initAirline(db)
  //initFlight(db)
  //initRoute(db)




 //--------------------------------------------------------------------------------

  //fmt.Print("success")
  schema, err := graphql.NewSchema(graphql.SchemaConfig{
  Query:        query.GetRoot(),
  Mutation:     mutations.GetRoot(),
  })
  //
  if err !=nil{
  panic(err)
  }
  h := handler.New(&handler.Config{
  Schema:           &schema,
  Pretty:           true,
  GraphiQL:         true,
  Playground:       true,
  })
  ////
  wrapped := middleware.CorsMiddleware(h)

  // for handling routing/



  //
  //router.HandleFunc("/login", handlers.LoginEmailPhonenumberHandler).Methods("POST")
  //router.HandleFunc("/register", handlers.RegisterHandler).Methods("POST")
  //fmt.Println("port serve at localhost:8000")
  //http.Handle("/", router)
  fmt.Println("Success listen to port 8000")
  log.Fatal(http.ListenAndServe(":8000", wrapped))
  //http.ListenAndServe(":80")


}
