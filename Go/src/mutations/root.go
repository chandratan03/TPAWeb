package mutations

import (
  "github.com/graphql-go/graphql"
  "mutations/resolvers"
  //"query/resolvers"
  "query/types"
)

func GetRoot() *graphql.Object{
  return graphql.NewObject(graphql.ObjectConfig{
    Name: "RootMutation",
    Fields:graphql.Fields{
      "createUser": &graphql.Field{
        Type:              types.GetUserType(),
        Args: graphql.FieldConfigArgument{
          "firstName" : &graphql.ArgumentConfig{
            Type: graphql.NewNonNull(graphql.String),
          },
          "lastName" : &graphql.ArgumentConfig{
            Type: graphql.NewNonNull(graphql.String),
          },
          "password" : &graphql.ArgumentConfig{
            Type: graphql.NewNonNull(graphql.String),
          },
          "email" : &graphql.ArgumentConfig{
            Type: graphql.NewNonNull(graphql.String),
          },
          "phoneNumber" : &graphql.ArgumentConfig{
            Type: graphql.NewNonNull(graphql.String),
          },
        },
        Resolve: resolvers.CreateUser,
      },
      "createFlight": &graphql.Field{
          Type:types.GetFlightType(),
          Args: graphql.FieldConfigArgument{
            "airlineRefer": &graphql.ArgumentConfig{
              Type:graphql.NewNonNull(graphql.Int),
            },
            "routeIds": &graphql.ArgumentConfig{
                Type: graphql.NewList(graphql.Int),
            },
            "transit": &graphql.ArgumentConfig{
              Type:graphql.Int,
            },
            "fromRefer": &graphql.ArgumentConfig{
                Type:graphql.Int,
            },
            "toRefer": &graphql.ArgumentConfig{
              Type:graphql.Int,
            },
            "departure": &graphql.ArgumentConfig{
              Type:graphql.String,
            },
            "arrival": &graphql.ArgumentConfig{
              Type:graphql.String,
            },
            "duration": &graphql.ArgumentConfig{
              Type:graphql.Int,
            },
            "price": &graphql.ArgumentConfig{
              Type:graphql.Int,
            },
            "tax": &graphql.ArgumentConfig{
              Type:graphql.Int,
            },
            "serviceCharge": &graphql.ArgumentConfig{
              Type:graphql.Int,
            },
          },
          Resolve:resolvers.CreateFlight,
      },
      "updateFlight": &graphql.Field{
        Type:types.GetFlightType(),
        Args: graphql.FieldConfigArgument{
          "id": &graphql.ArgumentConfig{
            Type:graphql.NewNonNull(graphql.Int),
          },
          "airlineRefer": &graphql.ArgumentConfig{
            Type:graphql.NewNonNull(graphql.Int),
          },
          "routeIds": &graphql.ArgumentConfig{
            Type: graphql.NewList(graphql.Int),
          },
          "transit": &graphql.ArgumentConfig{
            Type:graphql.Int,
          },
          "fromRefer": &graphql.ArgumentConfig{
            Type:graphql.Int,
          },
          "toRefer": &graphql.ArgumentConfig{
            Type:graphql.Int,
          },
          "departure": &graphql.ArgumentConfig{
            Type:graphql.String,
          },
          "arrival": &graphql.ArgumentConfig{
            Type:graphql.String,
          },
          "duration": &graphql.ArgumentConfig{
            Type:graphql.Int,
          },
          "price": &graphql.ArgumentConfig{
            Type:graphql.Int,
          },
          "tax": &graphql.ArgumentConfig{
            Type:graphql.Int,
          },
          "serviceCharge": &graphql.ArgumentConfig{
            Type:graphql.Int,
          },
        },
        Resolve:resolvers.UpdateFlight,
      },
      "deleteFlight": &graphql.Field{
        Type:types.GetFlightType(),
        Args: graphql.FieldConfigArgument{
          "id": &graphql.ArgumentConfig{
            Type:graphql.NewNonNull(graphql.Int),
          },
        },
        Resolve:resolvers.DeleteFlight,
      },
      "insertTrainTrip": &graphql.Field{
        Type:              types.GetTrainTripType(),
        Args:   graphql.FieldConfigArgument{
          "trainId": &graphql.ArgumentConfig{
            Type:graphql.NewNonNull(graphql.Int),
          },
          "fromRefer": &graphql.ArgumentConfig{
            Type: graphql.NewNonNull(graphql.Int),
          },
          "toRefer": &graphql.ArgumentConfig{
            Type: graphql.NewNonNull(graphql.Int),
          },
          "departure":&graphql.ArgumentConfig{
            Type: graphql.NewNonNull(graphql.String),
          },
          "arrival": &graphql.ArgumentConfig{
            Type:graphql.NewNonNull(graphql.String),
          },
          "duration": &graphql.ArgumentConfig{
            Type: graphql.NewNonNull(graphql.Int),
          },
          "price": &graphql.ArgumentConfig{
            Type:graphql.NewNonNull(graphql.Float),
          },
          "tax": &graphql.ArgumentConfig{
            Type: graphql.NewNonNull(graphql.Float),
          },
          "serviceCharge": &graphql.ArgumentConfig{
            Type:graphql.NewNonNull(graphql.Float),
          },
        },
        Resolve: resolvers.InsertTrainTrip,
      },
      "updateTrainTrip": &graphql.Field{
        Type:              types.GetTrainTripType(),
        Args:   graphql.FieldConfigArgument{
          "id": &graphql.ArgumentConfig{
            Type:graphql.NewNonNull(graphql.Int),
          },
          "trainId": &graphql.ArgumentConfig{
            Type:graphql.NewNonNull(graphql.Int),
          },
          "fromRefer": &graphql.ArgumentConfig{
            Type: graphql.NewNonNull(graphql.Int),
          },
          "toRefer": &graphql.ArgumentConfig{
            Type: graphql.NewNonNull(graphql.Int),
          },
          "departure":&graphql.ArgumentConfig{
            Type: graphql.NewNonNull(graphql.String),
          },
          "arrival": &graphql.ArgumentConfig{
            Type:graphql.NewNonNull(graphql.String),
          },
          "duration": &graphql.ArgumentConfig{
            Type: graphql.NewNonNull(graphql.Int),
          },
          "price": &graphql.ArgumentConfig{
            Type:graphql.NewNonNull(graphql.Float),
          },
          "tax": &graphql.ArgumentConfig{
            Type: graphql.NewNonNull(graphql.Float),
          },
          "serviceCharge": &graphql.ArgumentConfig{
            Type:graphql.NewNonNull(graphql.Float),
          },
        },
        Resolve: resolvers.UpdateTrainTrip,
      },
      "deleteTrainTrip": &graphql.Field{
        Type:types.GetTrainTripType(),
        Args: graphql.FieldConfigArgument{
          "id": &graphql.ArgumentConfig{
            Type:graphql.NewNonNull(graphql.Int),
          },
        },
        Resolve:resolvers.DeleteTrainTrip,
      },
      "insertHotelTicket": &graphql.Field{
        Type:types.GetHotelTicketType(),
        Args: graphql.FieldConfigArgument{
          "hotelId": &graphql.ArgumentConfig{
            Type:graphql.NewNonNull(graphql.Int),
          },
          "date": &graphql.ArgumentConfig{
            Type:graphql.NewNonNull(graphql.String),
          },
          "quantity": &graphql.ArgumentConfig{
            Type:graphql.NewNonNull(graphql.Int),
          },
          "price": &graphql.ArgumentConfig{
            Type:graphql.NewNonNull(graphql.Float),
          },
        },
        Resolve:resolvers.InsertHotelTicket,
      },
      "updateHotelTicket": &graphql.Field{
        Type:types.GetHotelTicketType(),
        Args: graphql.FieldConfigArgument{
          "id": &graphql.ArgumentConfig{
            Type:graphql.NewNonNull(graphql.Int),
          },
          "hotelId": &graphql.ArgumentConfig{
            Type:graphql.NewNonNull(graphql.Int),
          },
          "date": &graphql.ArgumentConfig{
            Type:graphql.NewNonNull(graphql.String),
          },
          "quantity": &graphql.ArgumentConfig{
            Type:graphql.NewNonNull(graphql.Int),
          },
          "price": &graphql.ArgumentConfig{
            Type:graphql.NewNonNull(graphql.Float),
          },
        },
        Resolve:resolvers.UpdateHotelTicket,
      },
      "deleteHotelTicket": &graphql.Field{
        Type:types.GetHotelTicketType(),
        Args: graphql.FieldConfigArgument{
          "id": &graphql.ArgumentConfig{
            Type:graphql.NewNonNull(graphql.Int),
          },

        },
        Resolve:resolvers.DeleteHotelTicket,
      },
    },



  })
}
