package main

import "net/http"

type CustomMux struct{
  http.ServeMux
  middlewares []func(next http.Handler)http.Handler
}

func (c *CustomMux) ServeHttp(w http.ResponseWriter, r *http.Request){
  var current http.Handler = &c.ServeMux

  for _, next := range c.middlewares{
    current = next(current)
  }
  current.ServeHTTP(w,r)
}


