package middleware

import "github.com/gorilla/mux"

func NewRoutes() *mux.Router {
  r := mux.NewRouter()
  r.Use(LogMiddleware)

  return r
}
