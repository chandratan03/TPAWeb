package handlers

import (
  "fmt"
  "net/http"
)

func RegisterHandler(w http.ResponseWriter, r *http.Request) {
  r.ParseForm()

  firstName := r.FormValue("firstName")
  lastName := r.FormValue("lastName")
  password := r.FormValue("password")
  email := r.FormValue("email")
  phoneNumber := r.FormValue("phoneNumber")
  fmt.Print("Test")
  fmt.Println(firstName, lastName, password, email, phoneNumber)

  

}
