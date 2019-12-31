package main

import (
  "github.com/graphql-go/graphql"
  "github.com/graphql-go/handler"
  _ "github.com/lib/pq"
  "log"
  "middleware"
  "net/http"
  "query"
)




const (
  host     = "167.71.168.135"
  port     = 5432
  user     = "CT"
  password = "CTCTCT"
  dbname   = "CT"
)
func main() {
  //
  //sqlInfo:=fmt.Sprintf("host=%s port=%d user=%s password=%s dbname=%s sslmode=disable", host, port, user, password, dbname)
  //  //db,error:= sql.Open("postgres", sqlInfo)
  //  //if error!=nil{
  //  // panic(error)
  //  //}
  //  //defer db.Close()
  //  //
  //  //error=db.Ping()
  //  //if error!=nil{
  //  // //fmt.Println(sqlInfo)
  //  // panic(error)
  //  //
  //  //}
  //  //
  //  //sqlInfo:=fmt.Sprintf("host=%s port=%d user=%s password=%s dbname=%s sslmode=disable", host, port, user, password, dbname)
  //  //db,error:= sql.Open("postgres", sqlInfo)
  //  //if error!=nil{
  //  // panic(error)
  //  //}
  //  //defer db.Close()
  //  //
  //  //error=db.Ping()
  //  //if error!=nil{
  //  // //fmt.Println(sqlInfo)
  //  // panic(error)
  //  //
  //  //}

  //fmt.Print("success")
  schema, err := graphql.NewSchema(graphql.SchemaConfig{
    Query:        query.GetRoot(),
    Mutation:     nil,
  })

  if err !=nil{
    panic(err)
  }
  h:= handler.New(&handler.Config{
    Schema:           &schema,
    Pretty:           true,
    GraphiQL:         true,
    Playground:       true,
  })

  wrapped := middleware.CorsMiddleware(h)

  log.Fatal(http.ListenAndServe(":8000", wrapped))




}
