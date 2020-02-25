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
  db.AutoMigrate(models.Area{})
  db.AutoMigrate(models.Hotel{}).AddForeignKey("city_id", "cities(id)", "CASCADE", "CASCADE").
    AddForeignKey("area_id", "areas", "CASCADE", "CASCADE")
  db.AutoMigrate(models.HotelFacility{}).AddForeignKey("facility_id", "facilities(id)", "Cascade", "Cascade")
  db.AutoMigrate(models.Airline{})
  db.AutoMigrate(models.AirlineFacility{}).AddForeignKey("facility_id", "facilities(id)", "cascade", "cascade")
  db.AutoMigrate(models.Airport{}).AddForeignKey("city_id", "cities", "NO ACTION", "NO ACTION")
  db.AutoMigrate(models.Flight{}).AddForeignKey("airline_refer", "airlines", "CASCADE", "CASCADE").AddForeignKey("from_refer", "airports", "CASCADE", "CASCADE").AddForeignKey("to_refer", "airports", "CASCADE", "CASCADE")
  db.AutoMigrate(models.Route{}).AddForeignKey("from_refer", "airports(id)", "CASCADE", "CASCADE").AddForeignKey("to_refer", "airports(id)", "CASCADE", "CASCADE").AddForeignKey("flight_id", "flights(id)","CASCADE","CASCADE")

  db.AutoMigrate(models.HotelRoom{})
  db.AutoMigrate(models.Image{})
  db.AutoMigrate(models.Bed{})
  db.AutoMigrate(models.HotelRoomBed{}).AddForeignKey("bed_id", "beds(id)", "cascade", "cascade")
  db.AutoMigrate(models.Rating{})
  db.AutoMigrate(models.HotelTicket{})


  db.AutoMigrate(models.TrainType{})
  db.AutoMigrate(models.TrainClass{})
  db.AutoMigrate(models.Train{})
  db.AutoMigrate(models.Station{})
  db.AutoMigrate(models.TrainTrip{})

  db.AutoMigrate(models.Vendor{})
  db.AutoMigrate(models.VendorCar{})
  db.AutoMigrate(models.Brand{})
  db.AutoMigrate(models.Car{})


  db.AutoMigrate(models.Bank{})


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
    Longitude:           106.819702,
    Latitude:            -6.209132,
    ZoomLevel:          0,
    CityId:             1,
    AreaId: 1,
    Category:"hotel",
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
    Longitude:  106.823975,
    Latitude:  -6.209132,
    ZoomLevel: 0,
    CityId:    1,
    AreaId: 1,
    Category:"hotel",
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
    AreaId: 2,
    Category:"villa",
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
    AreaId: 2,
    Category:"hotel",
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
    AreaId: 2,
    Category:"villa",
  })
}

func initArea(db *gorm.DB){
  db.Create(&models.Area{
    AreaName: "Jakarta Pusat",
    CityId:   1,
  })

  db.Create(&models.Area{
    AreaName: "Marina",
    CityId:   4,
  })
  db.Create(&models.Area{
    AreaName: "Jakarta Barat",
    CityId:   1,
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
    ImagePath:     "../../../assets/hotel/search/hotel-images/shinchan-image.jpg",
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
    ImagePath:     "../../../assets/hotel/search/hotel-images/shinchan-image.jpg",
    MaxGuest:      3,
    Space:         70,
    FreeBreakfast: false,
    FreeWifi:      true,
    Price: 1200000,
  })
  ///////////////////////////////
}

func initImagesForHotelRoom(db *gorm.DB){
  db.Create(&models.Image{
    HotelRoomId: 1,
    Path:        "../../../assets/hotel/search/hotel-images/shinchan-image.jpg",
  })
  db.Create(&models.Image{
    HotelRoomId: 1,
    Path:        "../../../assets/hotel/search/hotel-images/shinchan-image2.jpg",
  })
  db.Create(&models.Image{
    HotelRoomId: 1,
    Path:        "../../../assets/hotel/search/hotel-images/shinchan-image.jpg",
  })
  db.Create(&models.Image{
    HotelRoomId: 1,
    Path:        "../../../assets/hotel/search/hotel-images/shinchan-image2.jpg",
  })

  //////
  db.Create(&models.Image{
    HotelRoomId: 2,
    Path:        "../../../assets/hotel/search/hotel-images/shinchan-image.jpg",
  })
  db.Create(&models.Image{
    HotelRoomId: 2,
    Path:        "../../../assets/hotel/search/hotel-images/shinchan-image2.jpg",
  })
  db.Create(&models.Image{
    HotelRoomId: 2,
    Path:        "../../../assets/hotel/search/hotel-images/shinchan-image.jpg",
  })
  db.Create(&models.Image{
    HotelRoomId: 2,
    Path:        "../../../assets/hotel/search/hotel-images/shinchan-image2.jpg",
  })

  //////
  db.Create(&models.Image{
    HotelRoomId: 3,
    Path:        "../../../assets/hotel/search/hotel-images/shinchan-image.jpg",
  })
  db.Create(&models.Image{
    HotelRoomId: 3,
    Path:        "../../../assets/hotel/search/hotel-images/shinchan-image2.jpg",
  })
  db.Create(&models.Image{
    HotelRoomId: 3,
    Path:        "../../../assets/hotel/search/hotel-images/shinchan-image.jpg",
  })
  db.Create(&models.Image{
    HotelRoomId: 3,
    Path:        "../../../assets/hotel/search/hotel-images/shinchan-image2.jpg",
  })

  //////
  db.Create(&models.Image{
    HotelRoomId: 4,
    Path:        "../../../assets/hotel/search/hotel-images/shinchan-image.jpg",
  })
  db.Create(&models.Image{
    HotelRoomId: 4,
    Path:        "../../../assets/hotel/search/hotel-images/shinchan-image2.jpg",
  })
  db.Create(&models.Image{
    HotelRoomId: 4,
    Path:        "../../../assets/hotel/search/hotel-images/shinchan-image.jpg",
  })
  db.Create(&models.Image{
    HotelRoomId: 4,
    Path:        "../../../assets/hotel/search/hotel-images/shinchan-image2.jpg",
  })

  //////
  db.Create(&models.Image{
    HotelRoomId: 5,
    Path:        "../../../assets/hotel/search/hotel-images/shinchan-image.jpg",
  })
  db.Create(&models.Image{
    HotelRoomId: 5,
    Path:        "../../../assets/hotel/search/hotel-images/shinchan-image2.jpg",
  })
  db.Create(&models.Image{
    HotelRoomId: 5,
    Path:        "../../../assets/hotel/search/hotel-images/shinchan-image.jpg",
  })
  db.Create(&models.Image{
    HotelRoomId: 5,
    Path:        "../../../assets/hotel/search/hotel-images/shinchan-image2.jpg",
  })

  //////
  db.Create(&models.Image{
    HotelRoomId: 6,
    Path:        "../../../assets/hotel/search/hotel-images/shinchan-image.jpg",
  })
  db.Create(&models.Image{
    HotelRoomId: 6,
    Path:        "../../../assets/hotel/search/hotel-images/shinchan-image2.jpg",
  })
  db.Create(&models.Image{
    HotelRoomId: 6,
    Path:        "../../../assets/hotel/search/hotel-images/shinchan-image.jpg",
  })
  db.Create(&models.Image{
    HotelRoomId: 6,
    Path:        "../../../assets/hotel/search/hotel-images/shinchan-image2.jpg",
  })

  //////
  db.Create(&models.Image{
    HotelRoomId: 7,
    Path:        "../../../assets/hotel/search/hotel-images/shinchan-image.jpg",
  })
  db.Create(&models.Image{
    HotelRoomId: 7,
    Path:        "../../../assets/hotel/search/hotel-images/shinchan-image2.jpg",
  })
  db.Create(&models.Image{
    HotelRoomId: 7,
    Path:        "../../../assets/hotel/search/hotel-images/shinchan-image.jpg",
  })
  db.Create(&models.Image{
    HotelRoomId: 7,
    Path:        "../../../assets/hotel/search/hotel-images/shinchan-image2.jpg",
  })

  //////
  db.Create(&models.Image{
    HotelRoomId: 8,
    Path:        "../../../assets/hotel/search/hotel-images/shinchan-image.jpg",
  })
  db.Create(&models.Image{
    HotelRoomId: 8,
    Path:        "../../../assets/hotel/search/hotel-images/shinchan-image2.jpg",
  })
  db.Create(&models.Image{
    HotelRoomId: 8,
    Path:        "../../../assets/hotel/search/hotel-images/shinchan-image.jpg",
  })
  db.Create(&models.Image{
    HotelRoomId: 8,
    Path:        "../../../assets/hotel/search/hotel-images/shinchan-image2.jpg",
  })

  //////
  db.Create(&models.Image{
    HotelRoomId: 9,
    Path:        "../../../assets/hotel/search/hotel-images/shinchan-image.jpg",
  })
  db.Create(&models.Image{
    HotelRoomId: 9,
    Path:        "../../../assets/hotel/search/hotel-images/shinchan-image2.jpg",
  })
  db.Create(&models.Image{
    HotelRoomId: 9,
    Path:        "../../../assets/hotel/search/hotel-images/shinchan-image.jpg",
  })
  db.Create(&models.Image{
    HotelRoomId: 9,
    Path:        "../../../assets/hotel/search/hotel-images/shinchan-image2.jpg",
  })

  //////
  db.Create(&models.Image{
    HotelRoomId: 10,
    Path:        "../../../assets/hotel/search/hotel-images/shinchan-image.jpg",
  })
  db.Create(&models.Image{
    HotelRoomId: 10,
    Path:        "../../../assets/hotel/search/hotel-images/shinchan-image2.jpg",
  })
  db.Create(&models.Image{
    HotelRoomId: 10,
    Path:        "../../../assets/hotel/search/hotel-images/shinchan-image.jpg",
  })
  db.Create(&models.Image{
    HotelRoomId: 10,
    Path:        "../../../assets/hotel/search/hotel-images/shinchan-image2.jpg",
  })


  //////

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


func initRatings(db *gorm.DB){
  db.Create(&models.Rating{
    HotelId:     1,
    Description: "This is so goodddddddddddddddddddddddddd",
    RateScore: 3.5,
    Date: time.Now(),
  })
  db.Create(&models.Rating{
    HotelId:     1,
    Description: "This is so goodd",
    RateScore: 4,
    Date: time.Now(),

  })

  db.Create(&models.Rating{
    HotelId:     1,
    Description: "This is so gooddd",
    RateScore: 3.5,
    Date: time.Now(),
  })
  db.Create(&models.Rating{
    HotelId:     1,
    Description: "This is so gooddddd",
    RateScore: 4,
    Date: time.Now(),
  })
  db.Create(&models.Rating{
    HotelId:     1,
    Description: "This is so gooddddddddddddddddddddddddddddddddddddddddddddddddddddd",
    RateScore: 5,
    Date: time.Now(),
  })


  db.Create(&models.Rating{
    HotelId:     2,
    Description: "This is so good",
    RateScore: 5,
    Date: time.Now(),
  })
  db.Create(&models.Rating{
    HotelId:     2,
    Description: "This is so good",
    RateScore: 3.5,
    Date: time.Now(),

  })

  db.Create(&models.Rating{
    HotelId:     3,
    Description: "This is so good",
    RateScore: 3.5,
    Date: time.Now(),
  })
  db.Create(&models.Rating{
    HotelId:     3,
    Description: "This is so good",
    RateScore: 3.5,
    Date: time.Now(),
  })

  db.Create(&models.Rating{
    HotelId:     4,
    Description: "This is so good",
    RateScore: 3.5,
    Date: time.Now(),

  })
  db.Create(&models.Rating{
    HotelId:     4,
    Description: "This is so good",
    RateScore: 3.5,
    Date: time.Now(),
  })

  db.Create(&models.Rating{
    HotelId:     5,
    Description: "This is so good",
    RateScore: 3.5,
    Date: time.Now(),
  })
  db.Create(&models.Rating{
    HotelId:     5,
    Description: "This is so good",
    RateScore: 3.5,
    Date: time.Now(),
  })

  db.Create(&models.Rating{
    HotelId:     5,
    Description: "This is so good",
    RateScore: 5,
    Date: time.Now(),
  })
  db.Create(&models.Rating{
    HotelId:     5,
    Description: "This is so good",
    RateScore:   5,
    Date: time.Now(),
  })

}


func initHotelTickets(db *gorm.DB){
  db.Create(&models.HotelTicket{
    HotelId:   1,
    Date:       time.Date(2020, 3, 1, 8, 00, 00, 0, time.Now().Location()),

  })
  db.Create(&models.HotelTicket{
    HotelId:   2,
    Date:       time.Date(2020, 3, 1, 8, 00, 00, 0, time.Now().Location()),

  })
  db.Create(&models.HotelTicket{
    HotelId:   3,
    Date:       time.Date(2020, 3, 1, 8, 00, 00, 0, time.Now().Location()),

  })
  db.Create(&models.HotelTicket{
    HotelId:   4,
    Date:       time.Date(2020, 3, 1, 8, 00, 00, 0, time.Now().Location()),

  })
  db.Create(&models.HotelTicket{
    HotelId:   5,
    Date:       time.Date(2020, 3, 1, 8, 00, 00, 0, time.Now().Location()),
  })
}


func initTrainClass(db *gorm.DB){
  db.Create(&models.TrainClass{
    ClassName: "Ekonomi",
    PricePercentage:0,
  })
  db.Create(&models.TrainClass{
    ClassName: "Bisnis",
    PricePercentage:10,
  })
  db.Create(&models.TrainClass{
    ClassName: "Eksekutif",
    PricePercentage:20,
  })
}

func initTrainType(db *gorm.DB){
  db.Create(&models.TrainType{
    Name:      "Argo Perahyangan",
  })
  db.Create(&models.TrainType{
    Name:      "Serayu",
  })
  db.Create(&models.TrainType{
    Name:      "Argo Wilis",
  })
  db.Create(&models.TrainType{
    Name:      "Argo Wilis Priority",
  })
}

func initTrain(db *gorm.DB){
  db.Create(&models.Train{
    Name:          "1",
    TrainClassId:  1,
    TrainSubClass: "Subclass C",
    TrainTypeId: 1,
  })
  db.Create(&models.Train{
    Name:          "2",
    TrainClassId:  1,
    TrainSubClass: "Subclass C",
    TrainTypeId: 1,
  })
  db.Create(&models.Train{
    Name:          "1",
    TrainClassId:  1,
    TrainSubClass: "Subclass C",
    TrainTypeId: 2,
  })
  db.Create(&models.Train{
    Name:          "2",
    TrainClassId:  1,
    TrainSubClass: "Subclass C",
    TrainTypeId: 2,
  })
  db.Create(&models.Train{
    Name:          "1",
    TrainClassId:  2,
    TrainSubClass: "Subclass A",
    TrainTypeId: 3,
  })
  db.Create(&models.Train{
    Name:          "2",
    TrainClassId:  2,
    TrainSubClass: "Subclass A",
    TrainTypeId: 3,
  })
  db.Create(&models.Train{
    Name:          "1",
    TrainClassId:  3,
    TrainSubClass: "Subclass J",
    TrainTypeId: 4,
  })
  db.Create(&models.Train{
    Name:          "2",
    TrainClassId:  3,
    TrainSubClass: "Subclass J",
    TrainTypeId: 4,
  })
}
func initStation(db *gorm.DB){
  db.Create(&models.Station{
    Name:   "Station bebek",
    StationCode:"STE",
    AreaId: 1,
  })
  db.Create(&models.Station{
    Name:   "Station ayam",
    StationCode:"STA",
    AreaId: 1,
  })
  db.Create(&models.Station{
    Name:   "station burung",
    StationCode:"STB",
    AreaId: 1,
  })
  db.Create(&models.Station{
    Name:   "station kuda",
    StationCode:"STK",
    AreaId: 3,
  })
  db.Create(&models.Station{
    Name:   "station ikan",
    StationCode:"STI",
    AreaId: 3,
  })
}

func initTrainTrips(db *gorm.DB){
  //1-3 4-5
  db.Create(&models.TrainTrip{
    TrainId: 1,
    FromRefer:     1,
    ToRefer:       2,
    Departure:     time.Date(2020, 3, 1, 8, 00, 00, 0, time.Now().Location()),
    Arrival:       time.Date(2020, 3, 1, 10, 00, 00, 0, time.Now().Location()),
    Duration:      120,
    Price:         90000,
    Tax:           10000,
    ServiceCharge: 0,
  })
  db.Create(&models.TrainTrip{
    TrainId:  1,
    FromRefer:     1,
    ToRefer:       2,
    Departure:     time.Date(2020, 3, 1, 12, 00, 00, 0, time.Now().Location()),
    Arrival:       time.Date(2020, 3, 1, 14, 00, 00, 0, time.Now().Location()),
    Duration:      120,
    Price:         90000,
    Tax:           10000,
    ServiceCharge: 0,
  })
  db.Create(&models.TrainTrip{
    TrainId: 1,
    FromRefer:     1,
    ToRefer:       3,
    Departure:     time.Date(2020, 3, 1, 10, 00, 00, 0, time.Now().Location()),
    Arrival:       time.Date(2020, 3, 1, 13, 00, 00, 0, time.Now().Location()),
    Duration:      180,
    Price:         120000,
    Tax:           10000,
    ServiceCharge: 0,
  })
  db.Create(&models.TrainTrip{
    TrainId: 2,
    FromRefer:     1,
    ToRefer:       4,
    Departure:     time.Date(2020, 3, 1, 10, 00, 00, 0, time.Now().Location()),
    Arrival:       time.Date(2020, 3, 1, 12, 00, 00, 0, time.Now().Location()),
    Duration:      120,
    Price:         150000,
    Tax:           10000,
    ServiceCharge: 0,
  })
  db.Create(&models.TrainTrip{
    TrainId: 2,
    FromRefer:     1,
    ToRefer:       5,
    Departure:     time.Date(2020, 3, 1, 9, 00, 00, 0, time.Now().Location()),
    Arrival:       time.Date(2020, 3, 1, 11, 00, 00, 0, time.Now().Location()),
    Duration:      120,
    Price:         150000,
    Tax:           10000,
    ServiceCharge: 0,
  })
  db.Create(&models.TrainTrip{
    TrainId: 3,
    FromRefer:     1,
    ToRefer:       5,
    Departure:     time.Date(2020, 3, 1, 8, 00, 00, 0, time.Now().Location()),
    Arrival:       time.Date(2020, 3, 1, 12, 00, 00, 0, time.Now().Location()),
    Duration:      240,
    Price:         200000,
    Tax:           20000,
    ServiceCharge: 0,
  })
  db.Create(&models.TrainTrip{
    TrainId: 3,
    Train:         models.Train{},
    FromRefer:     1,
    From:          models.Station{},
    ToRefer:       5,
    To:            models.Station{},
    Departure:     time.Date(2020, 3, 1, 9, 00, 00, 0, time.Now().Location()),
    Arrival:       time.Date(2020, 3, 1, 12, 00, 00, 0, time.Now().Location()),
    Duration:      180,
    Price:         250000,
    Tax:           25000,
    ServiceCharge: 0,
  })
  db.Create(&models.TrainTrip{
    TrainId: 3,
    FromRefer:     1,
    ToRefer:       5,
    Departure:     time.Date(2020, 3, 1, 18, 00, 00, 0, time.Now().Location()),
    Arrival:       time.Date(2020, 3, 1, 20, 00, 00, 0, time.Now().Location()),
    Duration:      120,
    Price:         250000,
    Tax:           25000,
    ServiceCharge: 0,
  })
  db.Create(&models.TrainTrip{
    TrainId: 3,
    Train:         models.Train{},
    FromRefer:     1,
    From:          models.Station{},
    ToRefer:       2,
    To:            models.Station{},
    Departure:     time.Date(2020, 3, 1, 20, 00, 00, 0, time.Now().Location()),
    Arrival:       time.Date(2020, 3, 1, 22, 00, 00, 0, time.Now().Location()),
    Duration:      120,
    Price:         200000,
    Tax:           20000,
    ServiceCharge: 0,
  })
  db.Create(&models.TrainTrip{
    TrainId: 3,
    Train:         models.Train{},
    FromRefer:     2,
    From:          models.Station{},
    ToRefer:       1,
    To:            models.Station{},
    Departure:     time.Date(2020, 3, 1, 21, 00, 00, 0, time.Now().Location()),
    Arrival:       time.Date(2020, 3, 1, 23, 00, 00, 0, time.Now().Location()),
    Duration:      120,
    Price:         200000,
    Tax:           20000,
    ServiceCharge: 0,
  })

}

func initVendor(db *gorm.DB){
  db.Create(&models.Vendor{
    Name:      "Ayam",
    ImagePath: "../../../assets/hotel/search/hotel-images/shinchan-image.jpg",
  })
  db.Create(&models.Vendor{
    Name:      "Bebek",
    ImagePath: "../../../assets/hotel/search/hotel-images/shinchan-image.jpg",
  })

  db.Create(&models.Vendor{
    Name:      "Burung",
    ImagePath: "../../../assets/hotel/search/hotel-images/shinchan-image.jpg",
  })
}

func initBrand(db *gorm.DB){
  db.Create(&models.Brand{
    Name:      "Nissan",
    ImagePath: "../../../assets/hotel/search/hotel-images/shinchan-image.jpg",
  })
  db.Create(&models.Brand{
    Name:      "Toyota",
    ImagePath: "../../../assets/hotel/search/hotel-images/shinchan-image.jpg",
  })
}
func initVendorCar(db *gorm.DB){
  db.Create(&models.VendorCar{
    CarId:     1,
    VendorId:  1,
    Price:     1000000,
    AreaId: 1,
  })
  db.Create(&models.VendorCar{
    CarId:     1,
    VendorId:  2,
    Price:     1200000,
    AreaId: 1,
  })
  db.Create(&models.VendorCar{
    CarId:     1,
    VendorId:  3,
    Price:     1300000,
    AreaId: 1,
  })
  //
  db.Create(&models.VendorCar{
    CarId:     2,
    VendorId:  1,
    Price:     1400000,
    AreaId: 1,


  })
  db.Create(&models.VendorCar{
    CarId:     2,
    VendorId:  2,
    Price:     1100000,
    AreaId: 3,
  })
  db.Create(&models.VendorCar{
    CarId:     2,
    VendorId:  3,
    Price:     1000000,
    AreaId: 3,
  })
  //
  db.Create(&models.VendorCar{
    CarId:     3,
    VendorId:  1,
    Price:     1100000,
    AreaId: 1,
  })
  db.Create(&models.VendorCar{
    CarId:     3,
    VendorId:  2,
    Price:     1500000,
    AreaId: 1,
  })
  db.Create(&models.VendorCar{
    CarId:     3,
    VendorId:  3,
    Price:     1100000,
    AreaId: 2,
  })

  db.Create(&models.VendorCar{
    CarId:     4,
    VendorId:  1,
    Price:     1000000,
    AreaId: 2,
  })
  db.Create(&models.VendorCar{
    CarId:     4,
    VendorId:  2,
    Price:     1200000,
    AreaId: 2,
  })
  db.Create(&models.VendorCar{
    CarId:     4,
    VendorId:  3,
    Price:     1300000,
    AreaId: 2,
  })
  //
  db.Create(&models.VendorCar{
    CarId:     5,
    VendorId:  1,
    Price:     1400000,
    AreaId: 2,
  })
  db.Create(&models.VendorCar{
    CarId:     5,
    VendorId:  2,
    Price:     1100000,
    AreaId: 3,
  })
  db.Create(&models.VendorCar{
    CarId:     5,
    VendorId:  3,
    Price:     1000000,
    AreaId: 3,
  })
  //
  db.Create(&models.VendorCar{
    CarId:     6,
    VendorId:  1,
    Price:     1100000,
    AreaId: 3,
  })
  db.Create(&models.VendorCar{
    CarId:     6,
    VendorId:  2,
    Price:     1500000,
    AreaId: 2,
  })
  db.Create(&models.VendorCar{
    CarId:     6,
    VendorId:  3,
    Price:     1100000,
    AreaId: 3,
  })

}

func initCar(db *gorm.DB){
  db.Create(&models.Car{
    Price:       500000,
    BrandId:     1,
    Model:       "Daihatsu Xenia",
    Capacity:    4,
    Luggage:     2,
    ImagePath:   "../../../assets/hotel/search/hotel-images/mobil.jpg",

  })
  db.Create(&models.Car{
    Price:       200000,
    BrandId:     2,
    Model:       "Avanza",
    Capacity:    6,
    Luggage:     3,
    ImagePath:   "../../../assets/hotel/search/hotel-images/mobil.jpg",
  })
  db.Create(&models.Car{
    Price:       300000,
    BrandId:     2,
    Model:       "Yaris",
    Capacity:    4,
    Luggage:     2,
    ImagePath:   "../../../assets/hotel/search/hotel-images/mobil.jpg",
  })

  //
  db.Create(&models.Car{
    Price:       700000,
    BrandId:     1,
    Model:       "Agya",
    Capacity:    4,
    Luggage:     2,
    ImagePath:   "../../../assets/hotel/search/hotel-images/mobil.jpg",
  })
  db.Create(&models.Car{
    Price:       800000,
    BrandId:     2,
    Model:       "Sigra",
    Capacity:    4,
    Luggage:     2,
    ImagePath:   "../../../assets/hotel/search/hotel-images/mobil.jpg",
  })
  db.Create(&models.Car{
    Price:       1000000,
    BrandId:     2  ,
    Model:       "Livina",
    Capacity:    6,
    Luggage:     4,
    ImagePath:   "../../../assets/hotel/search/hotel-images/mobil.jpg",
  })
}
func initBank(db *gorm.DB){
  db.Create(&models.Bank{
    Name:      "BCA",
  })
  db.Create(&models.Bank{
    Name:      "BNI",
  })
  db.Create(&models.Bank{
    Name:      "BRI",
  })
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
      &models.HotelTicket{},
      &models.City{},
      &models.Region{},
      &models.Image{},
      &models.Rating{},
      &models.TrainTrip{},
      &models.Train{},
      //&models.TrainType{},
      &models.TrainClass{},
      &models.Station{},
      &models.TrainType{},
      &models.Area{},
      &models.Car{},
      &models.Brand{},
      &models.VendorCar{},
      &models.Vendor{},

    )
}


func initAllData(db *gorm.DB){
  initDBUser(db)
  initRegion(db)
  initCity(db)
  initArea(db)
  initHotel(db)
  initFacilities(db)
  initHotelFacilities(db)
  initAirline(db)
  initAirlineFacilities(db)
  initAirport(db)
  initFlight(db)
  initRoute(db)
  initBed(db)
  initHotelRoomBed(db)
  initImagesForHotelRoom(db)
  initHotelRoom(db)
  initRatings(db)

  initHotelTickets(db)
  //initHotelTickets(db)
  initTrainClass(db)
  initTrainType(db)
  initTrain(db)
  initStation(db)
  initTrainTrips(db)
  initVendor(db)
  initVendorCar(db)
  initBrand(db)
  initCar(db)

  initBank(db)

}

func main() {
  // FOR CREATE TABLE
  //--------------------------------------------------------
  db,err := database.Connect()
  if err!=nil{
    panic(err)
  }
  defer db.Close()


  dropAllTable(db)
  migrateDB(db)
  initAllData(db)



  t,_ := time.Parse("01/02/2006", "02/10/2020")
  println(t.Day() )

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



