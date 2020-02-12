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
//)
var router = mux.NewRouter()

func migrateDB(db *gorm.DB) {

  db.AutoMigrate(models.User{})
  db.AutoMigrate(models.Region{})
  db.AutoMigrate(models.City{}).AddForeignKey("region_id", "regions(id)", "CASCADE", "CASCADE")
  //db.AutoMigrate(models.Location{}).AddForeignKey("city_id", "cities(id)", "CASCADE", "CASCADE")
  db.AutoMigrate(models.Facility{})
  db.AutoMigrate(models.Hotel{}).AddForeignKey("city_id", "cities(id)", "CASCADE", "CASCADE")
  db.AutoMigrate(models.HotelFacility{}).AddForeignKey("facility_id", "facilities(id)", "Cascade", "Cascade")
  db.AutoMigrate(models.Airline{})
  db.AutoMigrate(models.AirlineFacility{}).AddForeignKey("facility_id", "facilities(id)", "cascade", "cascade")
  db.AutoMigrate(models.Airport{}).AddForeignKey("city_id", "cities", "NO ACTION", "NO ACTION")
  db.AutoMigrate(models.Flight{}).AddForeignKey("airline_refer", "airlines", "CASCADE", "CASCADE").AddForeignKey("from_refer", "airports", "CASCADE", "CASCADE").AddForeignKey("to_refer", "airports", "CASCADE", "CASCADE")
  db.AutoMigrate(models.Route{}).AddForeignKey("from_refer", "airports(id)", "CASCADE", "CASCADE").AddForeignKey("to_refer", "airports(id)", "CASCADE", "CASCADE").AddForeignKey("flight_id", "flights(id)","CASCADE","CASCADE")

  db.AutoMigrate(models.HotelRoom{})
  db.AutoMigrate(models.Bed{})
  db.AutoMigrate(models.HotelRoomBed{}).AddForeignKey("bed_id", "beds(id)", "cascade", "cascade")


}

func initDBUser(db *gorm.DB){
  db.Create(&models.User{
    //ID:          0,
    //CreatedAt:   time.Time{},
    //UpdatedAt:   time.Time{},
    //DeletedAt:   nil,
    FirstName:   "Chandra",
    LastName:    "Tan",
    Email:       "chandra@email.com",
    Password:    "chandra",
    PhoneNumber: "+628123123123",
  })
}

func initRegion(db *gorm.DB){
  db.Create(&models.Region{
    RegionName:  "Indonesia",
    CountryCode: "IDN",
  })
  db.Create(&models.Region{
    RegionName:  "Singapore",
    CountryCode: "SGP",
  })
  db.Create(&models.Region{
    RegionName: "Malaysia",
    CountryCode:"MYS",
  })
  db.Create(&models.Region{
    RegionName: "Australia",
    CountryCode:"AUS",
  })
}

func initCity(db *gorm.DB){
  db.Create(&models.City{
    CityName:  "Jakarta",
    CityCode:  "JKT",
    RegionId:  1,
    //Region:    models.Region{},
    //Locations: nil,
  })
  db.Create(&models.City{
    CityName: "Bali",
    RegionId: 1,
    CityCode: "BLI",
  })
  db.Create(&models.City{
    CityName: "Batam",
    RegionId: 1,
    CityCode: "BTH",
  })
  db.Create(&models.City{
    CityName: "Singapore",
    RegionId: 2,
    CityCode: "SGP",
  })
}

func initLocations(db *gorm.DB){
  db.Create(&models.Location{
    Longitude: -106.819702,
    Latitude:  -6.209132,
    ZoomLevel: 0,
    CityId:    1,
    City:      models.City{},
  })
  db.Create(&models.Location{
    Longitude: -106.819702,
    Latitude:  -6.209132,
    ZoomLevel: 0,
    CityId:    1,
    City:      models.City{},
  })
  db.Create(&models.Location{
    Longitude: 103.858528,
    Latitude:  1.282302,
    ZoomLevel: 0,
    CityId:    4,
    City:      models.City{},
  })
  db.Create(&models.Location{
    Longitude: 103.853561,
    Latitude: 1.293354,
    ZoomLevel: 0,
    CityId:    4,
    City:      models.City{},
  })
  db.Create(&models.Location{
    Longitude: 103.837372,
    Latitude:  1.288710,
    ZoomLevel: 0,
    CityId:    4,
    City:      models.City{},
  })
}

func initHotel(db *gorm.DB){
  db.Create(&models.Hotel{
    HotelName:          "InterContinental MidPlaza Jakarta Hotel",
    Price:              700000,
    Rate:               4,
    DiscountPercentage: 0,
    DiscountPrice:      0,
    Address:            "Jakarta Pusat",
    Quantity:           100,
    ImagePath:          "../../../assets/hotel/search/hotel-images/shinchan-image.jpg",
    Longitude:          -106.819702,
    Latitude:            -6.209132,
    ZoomLevel:          0,
    CityId:             1,
  })
  db.Create(&models.Hotel{
    HotelName:          "Raffles Hotel",
    Price:              1000000,
    Rate:               5,
    DiscountPercentage: 0,
    DiscountPrice:      0,
    Address:            "Jakarta",
    Quantity:           100,
    ImagePath:          "../../../assets/hotel/search/hotel-images/shinchan-image.jpg",
    Longitude: -106.819702,
    Latitude:  -6.209132,
    ZoomLevel: 0,
    CityId:    1,
  })
  db.Create(&models.Hotel{
    HotelName:          "Marina Bay Sands Hotel",
    Price:              1200000,
    Rate:               4,
    DiscountPercentage: 0,
    DiscountPrice:      0,
    Address:            "Marina",
    Quantity:           100,
    ImagePath:          "../../../assets/hotel/search/hotel-images/shinchan-image.jpg",
    Longitude: 103.858528,
    Latitude:  1.282302,
    ZoomLevel: 0,
    CityId:    4,
  })
  db.Create(&models.Hotel{
    HotelName:          "Swissôtel The Stamford",
    Price:              1200000,
    Rate:               4,
    DiscountPercentage: 0,
    DiscountPrice:      0,
    Address:            "Marina",
    Quantity:           100,
    ImagePath:          "../../../assets/hotel/search/hotel-images/shinchan-image.jpg",
    Longitude: 103.853561,
    Latitude: 1.293354,
    ZoomLevel: 0,
    CityId:    4,
  })
  db.Create(&models.Hotel{
    HotelName:          "Hotel Miramar",
    Price:              1200000,
    Rate:               4,
    DiscountPercentage: 0,
    DiscountPrice:      0,
    Address:            "Marina",
    Quantity:           100,
    ImagePath:          "../../../assets/hotel/search/hotel-images/shinchan-image.jpg",
    Longitude: 103.837372,
    Latitude:  1.288710,
    ZoomLevel: 0,
    CityId:    4,
  })
}

func initFacilities(db *gorm.DB){

  db.Create(&models.Facility{ // 1
  Name:      "AC",
  ImagePath: "../../../assets/facilities/AC.png",
  ForObject :"hotel",
  })
  db.Create(&models.Facility{ // 2
  Name:      "Wifi",
  ImagePath: ".../../../assets/facilities/wifi.png",
  ForObject :"hotel",
  })
  db.Create(&models.Facility{ // 3
    Name:      "Parking",
    ImagePath: "../../../assets/facilities/Parking.png",
    ForObject :"hotel",
  })
  db.Create(&models.Facility{ // 4
    Name:      "lift",
    ImagePath: "../../../assets/facilities/lift.png",
    ForObject :"hotel",
  })
  db.Create(&models.Facility{ // 5
    Name:      "pool",
    ImagePath: "../../../assets/facilities/pool.png",
    ForObject :"hotel",
  })



  db.Create(&models.Facility{ // 6
    Name:      "luggage",
    ImagePath: "../../../assets/facilities/luggage.png",
    ForObject: "flight",
  })
  db.Create(&models.Facility{ // 7
    Name:      "entertainment",
    ImagePath: "../../../assets/facilities/entertainment.png",
    ForObject: "flight",
  })
  db.Create(&models.Facility{ //8
    Name:      "food",
    ImagePath: "../../../assets/facilities/food.png",
    ForObject: "flight",
  })
  db.Create(&models.Facility{ //9
    Name:      "usb port",
    ImagePath: "../../../assets/facilities/usb.png",
    ForObject: "flight",
  })
}

func initHotelFacilities(db *gorm.DB){
  //1
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
    HotelId:    1,
    FacilityId: 4,
  })

  // 2
  db.Create(&models.HotelFacility{
    HotelId:    2,
    FacilityId: 2,
  })
  db.Create(&models.HotelFacility{
    HotelId:    2,
    FacilityId: 3,
  })
  db.Create(&models.HotelFacility{
    HotelId:    2,
    FacilityId: 4,
  })

  db.Create(&models.HotelFacility{
    HotelId:    2,
    FacilityId: 5,
  })


  //3
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
  db.Create(&models.HotelFacility{
    HotelId:    3,
    FacilityId: 4,
  })

  //4
  db.Create(&models.HotelFacility{
    HotelId:    4,
    FacilityId: 2,
  })
  db.Create(&models.HotelFacility{
    HotelId:    4,
    FacilityId: 3,
  })

  db.Create(&models.HotelFacility{
    HotelId:    4,
    FacilityId: 4,
  })
  db.Create(&models.HotelFacility{
    HotelId:    4,
    FacilityId: 5,
  })
  //5
  db.Create(&models.HotelFacility{
    HotelId:    5,
    FacilityId: 1,
  })
  db.Create(&models.HotelFacility{
    HotelId:    5,
    FacilityId: 3,
  })

  db.Create(&models.HotelFacility{
    HotelId:    5,
    FacilityId: 4,
  })
  db.Create(&models.HotelFacility{
    HotelId:    5,
    FacilityId: 5,
  })
}


func initAirline(db *gorm.DB){
  db.Create(&models.Airline{
    Name:              "Lion Air",
    Path:              "../../../assets/flight/search/lionIcon.png",
  })
  db.Create(&models.Airline{
    Name:      "Garuda",
    Path: "../../../assets/flight/search/garudaIcon.png",
  })
  db.Create(&models.Airline{
    Name:      "Citilink",
    Path: "../../../assets/flight/search/citilinkIcon.png",
  })
}

func initAirlineFacilities(db *gorm.DB){
  db.Create(&models.AirlineFacility{
    AirlineId:  1,
    FacilityId: 6,
    Facility:   models.Facility{},
  })
  db.Create(&models.AirlineFacility{
    AirlineId:  1,
    FacilityId: 7,
    Facility:   models.Facility{},
  })
  db.Create(&models.AirlineFacility{
    AirlineId:  1,
    FacilityId: 8,
    Facility:   models.Facility{},
  })
  db.Create(&models.AirlineFacility{
    AirlineId:  1,
    FacilityId: 9,
    Facility:   models.Facility{},
  })
  db.Create(&models.AirlineFacility{
    AirlineId:  2,
    FacilityId: 7,
    Facility:   models.Facility{},
  })
  db.Create(&models.AirlineFacility{
    AirlineId:  2,
    FacilityId: 8,
    Facility:   models.Facility{},
  })
  db.Create(&models.AirlineFacility{
    AirlineId:  2,
    FacilityId: 9,
    Facility:   models.Facility{},
  })
  db.Create(&models.AirlineFacility{
    AirlineId:  3,
    FacilityId: 7,
    Facility:   models.Facility{},
  })
  db.Create(&models.AirlineFacility{
    AirlineId:  3,
    FacilityId: 8,
    Facility:   models.Facility{},
  })
}
// Flights
func initAirport(db *gorm.DB){
  db.Create(&models.Airport{
    Name:      "Changi International Airport",
    CityId:    4, // sg
  })
  db.Create(&models.Airport{
    Name:      "Changi2 International Airport",
    CityId:    4,//sg
  })
  db.Create(&models.Airport{
    Name:      "Changi3 International Airport",
    CityId:    4,//sg
  })
  db.Create(&models.Airport{
    Name:      "Soekarno-Hatta International Airport",
    CityId:    1,//jkt
  })
  db.Create(&models.Airport{
    Name:      "Ngurah rai International Airport",
    CityId:    2,//bali
  })
  db.Create(&models.Airport{
    Name:      "Hang Nadim International Airport",
    CityId:    3,//batam
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

func initBed(db *gorm.DB){
  db.Create(&models.Bed{
    BedName: "Large bed(King size)",
  })
  db.Create(&models.Bed{
    BedName: "Twin bed",
  })

}

func initHotelRoom(db *gorm.DB){
  db.Create(&models.HotelRoom{
    HotelId:       1,
    Name:          "Medium Room",
    Quantity:      50,
    ImagePath:     "../../../assets/hotel/search/hotel-images/shinchan-image.jpg",
    MaxGuest:      2,
    Space:         35,
    FreeBreakfast: false,
    FreeWifi:      true,
    Price: 500000,
  })
  db.Create(&models.HotelRoom{
    HotelId:       1,
    Name: "Large Room",
    Quantity:      50,
    ImagePath:     "../../../assets/hotel/search/hotel-images/shinchan-image.jpg",
    MaxGuest:      2,
    Space:         50,
    FreeBreakfast: true,
    FreeWifi:      true,
    Price: 600000,
  })
  ///////////////////////////////
  db.Create(&models.HotelRoom{
    HotelId:       2,
    Name:          "Medium Room",
    Quantity:      50,
    ImagePath:     "../../../assets/hotel/search/hotel-images/shinchan-image.jpg",
    MaxGuest:      2,
    Space:         30,
    FreeBreakfast: false,
    FreeWifi:      false,
    Price: 700000,
  })
  db.Create(&models.HotelRoom{
    HotelId:       2,
    Name: "Large Room",
    Quantity:      50,
    ImagePath:     "../../../assets/hotel/search/hotel-images/shinchan-image.jpg",
    MaxGuest:      2,
    Space:         50,
    FreeBreakfast: false,
    FreeWifi:      true,
    Price: 800000,
  })
  ///////////////////////////////
  db.Create(&models.HotelRoom{
    HotelId:       3,
    Name:          "Small Room",
    Quantity:      50,
    ImagePath:     "../../../assets/hotel/search/hotel-images/shinchan-image.jpg",
    MaxGuest:      2,
    Space:         40,
    FreeBreakfast: true,
    FreeWifi:      true,
    Price: 900000,
  })
  db.Create(&models.HotelRoom{
    HotelId:       3,
    Name: "Big Room",
    Quantity:      50,
    ImagePath:     "",
    MaxGuest:      3,
    Space:         60,
    FreeBreakfast: true,
    FreeWifi:      true,
    Price: 1000000,
  })
  ///////////////////////////////
  db.Create(&models.HotelRoom{
    HotelId:       4,
    Name:          "Deluxe Room",
    Quantity:      50,
    ImagePath:     "../../../assets/hotel/search/hotel-images/shinchan-image.jpg",
    MaxGuest:      2,
    Space:         50,
    FreeBreakfast: true,
    FreeWifi:      true,
    Price: 1000000,
  })
  db.Create(&models.HotelRoom{
    HotelId:       4,
    Name: "Large Room",
    Quantity:      50,
    ImagePath:     "../../../assets/hotel/search/hotel-images/shinchan-image.jpg",
    MaxGuest:      2,
    Space:         55,
    FreeBreakfast: true,
    FreeWifi:      true,
    Price: 1100000,
  })
  ///////////////////////////////
  db.Create(&models.HotelRoom{
    HotelId:       5,
    Name:          "Deluxe Room",
    Quantity:      50,
    ImagePath:     "../../../assets/hotel/search/hotel-images/shinchan-image.jpg",
    MaxGuest:      3,
    Space:         55,
    FreeBreakfast: false,
    FreeWifi:      true,
    Price: 1100000,
  })
  db.Create(&models.HotelRoom{
    HotelId:       5,
    Name: "Large Room",
    Quantity:      50,
    ImagePath:     "../../../assets/hotel/search/hotel-images/shinchan-image.jpg`",
    MaxGuest:      3,
    Space:         70,
    FreeBreakfast: false,
    FreeWifi:      true,
    Price: 1200000,
  })
  ///////////////////////////////
}


func initHotelRoomBed(db *gorm.DB){

  db.Create(&models.HotelRoomBed{
    HotelRoomId: 1,
    BedId:       1,
  })
  /////////////////
  db.Create(&models.HotelRoomBed{
    HotelRoomId: 2,
    BedId:       1,
  })
  db.Create(&models.HotelRoomBed{
    HotelRoomId: 2,
    BedId:       2,
  })
  /////////////////
  db.Create(&models.HotelRoomBed{
    HotelRoomId: 3,
    BedId:       1,
  })
  db.Create(&models.HotelRoomBed{
    HotelRoomId: 3,
    BedId:       2,
  })
  /////////////////
  db.Create(&models.HotelRoomBed{
    HotelRoomId: 4,
    BedId:       1,
  })
  db.Create(&models.HotelRoomBed{
    HotelRoomId: 4,
    BedId:       2,
  })
  /////////////////
  db.Create(&models.HotelRoomBed{
    HotelRoomId: 5,
    BedId:       1,
  })
  db.Create(&models.HotelRoomBed{
    HotelRoomId: 5,
    BedId:       2,
  })
  /////////////////
  db.Create(&models.HotelRoomBed{
    HotelRoomId: 5,
    BedId:       1,
  })
  db.Create(&models.HotelRoomBed{
    HotelRoomId: 5,
    BedId:       2,
  })
  /////////////////
  db.Create(&models.HotelRoomBed{
    HotelRoomId: 6,
    BedId:       1,
  })
  /////////////////
  db.Create(&models.HotelRoomBed{
    HotelRoomId: 6,
    BedId:       1,
  })
  db.Create(&models.HotelRoomBed{
    HotelRoomId: 6,
    BedId:       2,
  })
  /////////////////
  db.Create(&models.HotelRoomBed{
    HotelRoomId: 7,
    BedId:       1,
  })
  db.Create(&models.HotelRoomBed{
    HotelRoomId: 7,
    BedId:       2,
  })
  /////////////////
  db.Create(&models.HotelRoomBed{
    HotelRoomId: 8,
    BedId:       1,
  })
  db.Create(&models.HotelRoomBed{
    HotelRoomId: 8,
    BedId:       2,
  })
  /////////////////
  /////////////////
  db.Create(&models.HotelRoomBed{
    HotelRoomId: 9,
    BedId:       1,
  })
  db.Create(&models.HotelRoomBed{
    HotelRoomId: 9,
    BedId:       2,
  })
  /////////////////
  db.Create(&models.HotelRoomBed{
    HotelRoomId: 10,
    BedId:       1,
  })
  db.Create(&models.HotelRoomBed{
    HotelRoomId: 10,
    BedId:       2,
  })
  /////////////////
}


func dropAllTable(db *gorm.DB){

    db.DropTable(
      &models.User{},
      &models.HotelFacility{},
      &models.Route{},
      &models.AirlineFacility{},
      &models.Facility{},
      &models.Flight{},
      &models.Airline{},
      &models.Airport{},
      &models.HotelRoomBed{},
      &models.Bed{},
      &models.HotelRoom{},
      &models.Hotel{},
      &models.City{},
      &models.Region{},
    )


}

func main() {
  // FOR CREATE TABLE
  //--------------------------------------------------------
  db,err := database.Connect()
  if err!=nil{
    panic(err)
  }
  //dropAllTable(db)
  migrateDB(db)
  //initDBUser(db)
  //initRegion(db)
  //initCity(db)
  //
  //initHotel(db)
  //initFacilities(db)
  //initHotelFacilities(db)
  //
  //initAirline(db)
  //initAirlineFacilities(db)
  //initAirport(db)
  //initFlight(db)
  //initRoute(db)
  //initHotelRoom(db)
  //initBed(db)
  //initHotelRoomBed(db)


  //t,_ := time.Parse("01/02/2006", "02/10/2020")
  //println(t.Day() )

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
//

}
