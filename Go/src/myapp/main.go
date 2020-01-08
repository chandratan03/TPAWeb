package main

import (
  "Connect/database"
  "github.com/gorilla/mux"
  "github.com/graphql-go/graphql"
  "github.com/graphql-go/handler"
  _ "github.com/lib/pq"
  "log"
  "middleware"
  "models"
  "mutations"
  "net/http"
  "query"
)




//const (
//  host     = "167.71.168.135"
//  port     = 5432
//  user     = "CT"
//  password = "CTCTCT"
//  dbname   = "CT"
//)
var router = mux.NewRouter()
func main() {
  //
  //sqlInfo:=fmt.Sprintf("host=%s port=%d user=%s password=%s dbname=%s sslmode=disable", host, port, user, password, dbname)
  // db,error:= gorm.Open("postgres", sqlInfo)
  // if error!=nil{
  //    panic(error)
  // }
  // defer db.Close()

    //for double check
   //error=db.Ping()
   //if error!=nil{
   //  fmt.Println(sqlInfo)
   //  panic(error)
   //
   //}
   // auto migrate is creating a table
  //db.AutoMigrate(&models.User{})

  //is inserting
  //db.Create(&models.User{Name:"chandra"})



   //fmt.Print("Success")



  // FOR CREATE TABLE
  //--------------------------------------------------------
  db,err := database.Connect()
  if err!=nil{
  panic(err)
  }
  db.AutoMigrate(models.Region{})
  //db.AutoMigrate(models.City{})
  db.AutoMigrate(models.City{})

  //db.AutoMigrate(&models.User{})
  //db.Create(&models.User{
  //  //ID:          0,
  //  //CreatedAt:   time.Time{},
  //  //UpdatedAt:   time.Time{},
  //  //DeletedAt:   nil,
  //  FirstName:   "Chandra",
  //  LastName:    "hehe",
  //  Email:       "chandra",
  //  Password:    "chandra",
  //  PhoneNumber: "+628123123123",
  //})
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
  log.Fatal(http.ListenAndServe(":8000", wrapped))
  //http.ListenAndServe(":80")


}
