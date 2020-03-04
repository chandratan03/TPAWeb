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
      "areas":{
         Type:graphql.NewList(types.GetAreaType()),
         Resolve:resolvers.GetAreas,
      },
      "trains":{
         Type:graphql.NewList(types.GetTrainType()),
         Resolve:resolvers.GetTrains,
      },
      "trainTrips":{
         Type:graphql.NewList(types.GetTrainTripType()),
         Resolve:resolvers.GetTrainTrips,
      },
      "stations": {
         Type:graphql.NewList(types.GetStationType()),
         Resolve:resolvers.GetStations,
      },
      "trainTripsFromToDate":{
        Type:graphql.NewList(types.GetTrainTripType()),
        Resolve:resolvers.GetTrainTripsByFromToDate,
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
      "cars": {
         Type:graphql.NewList(types.GetCarType()),
         Resolve:resolvers.GetCars,
      },
      "CarsByCity":{
           Type: graphql.NewList(types.GetCarType()),
           Resolve:resolvers.GetCarsByCity,
           Args:graphql.FieldConfigArgument{
             "cityId":&graphql.ArgumentConfig{
               Type:graphql.Int,
             },
           },
      },
      "trainTypes":{
         Type:graphql.NewList(types.GetTrainTypeType()),
         Resolve:resolvers.GetTrainTypes,

      },
      "hotelTickets": {
           Type:graphql.NewList(types.GetHotelTicketType()),
           Resolve:resolvers.GetHotelTickets,
      },
      "hotelTicketsByDate": {
         Type: graphql.NewList(types.GetHotelTicketType()),
         Resolve:resolvers.GetHotelTicketsByDate,
         Args:graphql.FieldConfigArgument{
           "date": &graphql.ArgumentConfig{
             Type:graphql.String,
           },
         },
      },
      "hotelTicketById": {
        Type: graphql.NewList(types.GetHotelTicketType()),
        Resolve:resolvers.GetHotelTicketById,
        Args:graphql.FieldConfigArgument{
          "id": &graphql.ArgumentConfig{
            Type:graphql.Int,
          },
        },
      },
      "banks":{
        Type:graphql.NewList(types.GetBankType()),
        Resolve:resolvers.GetBanks,
      },
      "carts":{
        Type:graphql.NewList(types.GetCartType()),
        Resolve:resolvers.GetCarts,
      },
      "cartsByUserId": {
        Type: graphql.NewList(types.GetCartType()),
        Resolve:resolvers.GetCartsByUserId,
        Args:graphql.FieldConfigArgument{
          "userId": &graphql.ArgumentConfig{
            Type:graphql.Int,
          },
        },
      },

      "headerTransactions":{
        Type: graphql.NewList(types.GetHeaderTransactionType()),
        Resolve:resolvers.GetHeaderTransations,

      },

      "headerTransactionsByUserId":{
        Type: graphql.NewList(types.GetHeaderTransactionType()),
        Resolve:resolvers.GetHeaderTransactionByUserId,
        Args:graphql.FieldConfigArgument{
          "userId": &graphql.ArgumentConfig{
            Type:graphql.Int,
          },
        },
      },
      "detailTransactions":{
        Type:graphql.NewList(types.GetDetailTransactionType()),
        Resolve:resolvers.GetDetailTransactions,
      },
      "promoCodeByCode":{
          Type:types.GetPromoCodeType(),
          Resolve:resolvers.GetPromoByCode,
          Args:graphql.FieldConfigArgument{
            "code": &graphql.ArgumentConfig{
              Type:graphql.String,
            },
          },
      },
      "promoCodes":{
         Type: graphql.NewList(types.GetPromoCodeType()),
         Resolve:resolvers.GetPromoCodes,
      },
      "passengers":{
         Type:graphql.NewList(types.GetPassengerType()),
         Resolve:resolvers.GetPassengers,
      },
      "entertainments":{
        Type:graphql.NewList(types.GetEntertainmentType()),
        Resolve:resolvers.GetEntertainments,
      },
      "entertainmentTickets":{
        Type:graphql.NewList(types.GetEntertainmentTicketType()),
        Resolve:resolvers.GetEntertainmentTickets,
      },
      "entertainmentTicketById":{
        Type:types.GetEntertainmentTicketType(),
        Resolve:resolvers.GetEntertainmentTicketById,
        Args:graphql.FieldConfigArgument{
          "id": &graphql.ArgumentConfig{
            Type:graphql.Int,
          },
        },
      },
      "entertainmentsTicketsByCategory":{
        Type:graphql.NewList(types.GetEntertainmentTicketType()),
        Resolve:resolvers.GetEntertainmentTicketsByCategory,
        Args:graphql.FieldConfigArgument{
          "category": &graphql.ArgumentConfig{
            Type:graphql.String,
          },
        },
      },
      "entertainmentsTicketsByEntertainmentIdAndDate":{
        Type:graphql.NewList(types.GetEntertainmentTicketType()),
        Resolve:resolvers.GetEntertainmentTicketsByEntertainmentIdAndDate   ,
        Args:graphql.FieldConfigArgument{
          "entertainmentId": &graphql.ArgumentConfig{
            Type:graphql.Int,
          },
          "date": &graphql.ArgumentConfig{
            Type:graphql.String,
          },
        },
      },
      "entertainmentsTicketsByCategoryAndCityId":{
        Type:graphql.NewList(types.GetEntertainmentTicketType()),
        Resolve:resolvers.GetEntertainmentTicketsByCategoryAndCityId,
        Args:graphql.FieldConfigArgument{
          "category": &graphql.ArgumentConfig{
            Type:graphql.String,
          },
          "cityId": &graphql.ArgumentConfig{
            Type:graphql.Int,
          },
        },
      },
      "entertainmentsTicketsByCityId":{
        Type:graphql.NewList(types.GetEntertainmentTicketType()),
        Resolve:resolvers.GetEntertainmentTicketsByCityId,
        Args:graphql.FieldConfigArgument{
          "cityId": &graphql.ArgumentConfig{
            Type:graphql.Int,
          },
        },

      },
      "allMessages":{
        Type:graphql.NewList(types.GetMessageType()),
        Resolve:resolvers.GetAllMessages,
      },
      "allMessagesBySenderAndReceiver":{
        Type:graphql.NewList(types.GetMessageType()),
        Resolve:resolvers.GetAllMessagesBySenderAndReceiver,
        Args:graphql.FieldConfigArgument{
          "from": &graphql.ArgumentConfig{
            Type:graphql.Int,
          },
          "to": &graphql.ArgumentConfig{
            Type:graphql.Int,
          },
        },
      },
      "blogs":{
        Type: graphql.NewList(types.GetBlogType()),
        Resolve:resolvers.GetBlogs,
      },
      "trendingBlogs":{
        Type: graphql.NewList(types.GetBlogType()),
        Resolve:resolvers.GetTrendingBlogs,
      },
      "blogById":{
        Type: types.GetBlogType(),
        Resolve:resolvers.GetBlogById,
        Args:graphql.FieldConfigArgument{
          "id": &graphql.ArgumentConfig{
            Type:graphql.Int,
          },
        },

      },
      "entertainmentById":{
        Type: types.GetEntertainmentType(),
        Resolve:resolvers.GetEntertainmentById,
        Args:graphql.FieldConfigArgument{
          "id": &graphql.ArgumentConfig{
            Type:graphql.Int,
          },
        },

      },
      "nearestHotels":{
        Type: graphql.NewList(types.GetHotelType()) ,
        Resolve:resolvers.GetNearestHotels,
        Args:graphql.FieldConfigArgument{
          "longitude": &graphql.ArgumentConfig{
            Type:graphql.Float,
          },
          "latitude": &graphql.ArgumentConfig{
            Type: graphql.Float,
          },

        },
      },
      "promos":{
        Type:graphql.NewList(types.GetPromoType()),
        Resolve:resolvers.GetPromos,
      },
      "latestPromo":{
        Type: types.GetPromoType(),
        Resolve:resolvers.GetLatestPromo,
      },

    },






  })



}

