package query

import (
  "github.com/graphql-go/graphql"
  "query/resolvers"
  "query/types"
)

func GetRoot() *graphql.Object{
  return graphql.NewObject(graphql.ObjectConfig{
    Name: "RootQuery",
    Fields: graphql.Fields{
      "userById":{
        Type:graphql.NewList(types.GetUserType()),
        Args: graphql.FieldConfigArgument{
          "id" : &graphql.ArgumentConfig{
              Type: graphql.Int,
          },
        },
        Resolve: resolvers.GetUser,
        Description:"GET A USER",
      },
      "userByEmail":{
        Type:types.GetUserType(),
        Args: graphql.FieldConfigArgument{
          "email" : &graphql.ArgumentConfig{
            Type: graphql.String,
          },
        },
        Resolve: resolvers.GetUserByEmail,
        Description:"GET A USER",
      },
      "userByEmailAndPassword":{
        Type:types.GetUserType(),
        Args: graphql.FieldConfigArgument{
          "email" : &graphql.ArgumentConfig{
            Type: graphql.String,
          },
          "password" : &graphql.ArgumentConfig{
            Type: graphql.String,
          },
        },
        Resolve: resolvers.GetUserByEmailAndPassword,
        Description:"GET A USER",
      },
      "users":{
              Type: graphql.NewList(types.GetUserType()),
              Resolve: resolvers.GetUsers,
              Description:"Get all users",

      },
      "hotels": {
          Type:graphql.NewList(types.GetHotelType()),
          Resolve: resolvers.GetHotels,
      },
      "hotelById":{
          Type:types.GetHotelType(),
          Resolve:resolvers.GetHotelById,
          Args:graphql.FieldConfigArgument{
            "hotelId": &graphql.ArgumentConfig{
              Type:  graphql.Int,
            },
          },
      },
      "availableDateForHotel":{
            Type:graphql.NewList(types.GetAvailableForHotelType()),
            Resolve:resolvers.GetAvailableDateForHotels,
      },
      //"locations":{
      //      Type:graphql.NewList(types.GetLocationType()),
      //      Resolve:resolvers.GetLocations,
      //},
      "cities":{
            Type:graphql.NewList(types.GetCityType()),
            Resolve:resolvers.GetCities,
      },
      "regions":{
            Type:graphql.NewList(types.GetRegionType()),
            Resolve:resolvers.GetRegions,
      },
      "facilities":{
            Type:graphql.NewList(types.GetFacilityType()),
            Resolve:resolvers.GetFacilities,
      },
      "hotelFacilities":{
            Type:graphql.NewList(types.GetHotelFacilityType()),
            Resolve:resolvers.GetHotelFacilities,
      },
      "flights":{
            Type:graphql.NewList(types.GetFlightType()),
            Resolve:resolvers.GetFlights,
      },
      "airlines":{
            Type:graphql.NewList(types.GetAirlineType()),
            Resolve:resolvers.GetAirlines,
      },
      "airports":{
            Type:graphql.NewList(types.GetAirportType()),
            Resolve:resolvers.GetAirports,
      },
      "routes": {
            Type:graphql.NewList(types.GetRouteType()),
            Resolve:resolvers.GetRoutes,
      },
      "facilitiesByForObject": {
            Type:graphql.NewList(types.GetFacilityType()),
            Resolve:resolvers.GetFacilitiesByForObject,
            Args: graphql.FieldConfigArgument{
              "forObject": &graphql.ArgumentConfig{
                Type:graphql.String,
              },
            },
      },
      "flightsByFromToDate":{
        Type:graphql.NewList(types.GetFlightType()),
        Resolve:resolvers.GetFlightsByFromToDate,
        Args: graphql.FieldConfigArgument{
          "fromId": &graphql.ArgumentConfig{
            Type:graphql.Int,
          },
          "toId": &graphql.ArgumentConfig{
            Type: graphql.Int,
          },
          "date": &graphql.ArgumentConfig{
              Type:graphql.String,
          },
        },
      },
      "hotelRoomByHotelId": {
         Type: graphql.NewList(types.GetHotelRoomType()),
         Resolve: resolvers.GetHotelRoomByHotelId,
         Args: graphql.FieldConfigArgument{
           "hotelId": &graphql.ArgumentConfig{
             Type: graphql.Int,
           },
         },
      },
      "hotelRooms": {
         Type:    graphql.NewList(types.GetHotelRoomType()),
         Resolve: resolvers.GetHotelRooms,
      },



      },






  })



}

