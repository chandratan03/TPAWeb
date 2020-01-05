package handlers

import (
  "github.com/gorilla/securecookie"
  "net/http"
)
var cookieHandler = securecookie.New(
  securecookie.GenerateRandomKey(64),
  securecookie.GenerateRandomKey(32))

func LoginEmailPhonenumberHandler(response http.ResponseWriter, request *http.Request){
  emailOrPhonenumber := request.FormValue("emailOrPhonenumber")
  //passwrd := request.FormValue("password")
  //redirectTarget:= "localhost:4200/"
  SetCookie(emailOrPhonenumber, response)
  redirectTarget := "localhost:4200/"
  http.Redirect(response, request, redirectTarget, 302)
}

func SetCookie(emailOrPhonenumber string, response http.ResponseWriter) {
  value := map[string]string{
    "name": emailOrPhonenumber,
  }

  if encoded, err := cookieHandler.Encode("cookie", value); err == nil {
    cookie := &http.Cookie{
      Name:  "cookie",
      Value: encoded,
      Path:  "/",
    }
    http.SetCookie(response, cookie)
  }
}
