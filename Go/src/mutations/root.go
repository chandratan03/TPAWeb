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
          "nationality": &graphql.ArgumentConfig{
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
      "deleteCartById": &graphql.Field{
        Type:types.GetCartType(),
        Args: graphql.FieldConfigArgument{
          "id": &graphql.ArgumentConfig{
            Type:graphql.NewNonNull(graphql.Int),
          },

        },
        Resolve:resolvers.DeleteCartById,
      },

      "InsertCart": &graphql.Field{
        Type:types.GetCartType(),
        Args: graphql.FieldConfigArgument{
          "userId": &graphql.ArgumentConfig{
            Type:graphql.NewNonNull(graphql.Int),
          },
          "flightId": &graphql.ArgumentConfig{
            Type:graphql.NewNonNull(graphql.Int),
          },
          "quantity": &graphql.ArgumentConfig{
            Type:graphql.NewNonNull(graphql.Int),
          },
          "type": &graphql.ArgumentConfig{
            Type:graphql.NewNonNull(graphql.String),
          },
          "date": &graphql.ArgumentConfig{
            Type:graphql.NewNonNull(graphql.String),
          },
        },
        Resolve:resolvers.InsertCart,
      },
      //Title: Title,
      //Name: Name,
      //Email:Email,
      //Nationality: Nationality,
      //PhoneNumber:PhoneNumber,
      "InsertHeaderTransaction": &graphql.Field{
        Type:types.GetHeaderTransactionType(),
        Args: graphql.FieldConfigArgument{
          "userId": &graphql.ArgumentConfig{
            Type:graphql.Int,
          },
          "title": &graphql.ArgumentConfig{
            Type:graphql.String,
          },
          "name":&graphql.ArgumentConfig{
            Type:graphql.String,
          },
          "email":&graphql.ArgumentConfig{
            Type:graphql.String,
          },
          "nationality":&graphql.ArgumentConfig{
            Type:graphql.String,
          },
          "phoneNumber":&graphql.ArgumentConfig{
            Type:graphql.String,
          },
          "bankId":&graphql.ArgumentConfig{
            Type:graphql.Int,
          },
          "bankNumber":&graphql.ArgumentConfig{
            Type:graphql.String,
          },
        },
        Resolve:resolvers.InsertHeaderTransaction,
      },
      "deletePromoCodeByCode": &graphql.Field{
        Type:types.GetPromoCodeType(),
        Args: graphql.FieldConfigArgument{
          "code": &graphql.ArgumentConfig{
            Type:graphql.NewNonNull(graphql.String),
          },
        },
        Resolve:resolvers.DeletePromoCodeByCode,
      },

      //Title:       Title,
      //Name:        Name,
      //Nationality: Nationality,
      //HeaderId:    HeaderId,
      "insertPassenger": &graphql.Field{
        Type:types.GetPassengerType(),
        Args: graphql.FieldConfigArgument{
          "title": &graphql.ArgumentConfig{
            Type:graphql.NewNonNull(graphql.String),
          },
          "name": &graphql.ArgumentConfig{
            Type:graphql.NewNonNull(graphql.String),
          },
          "nationality": &graphql.ArgumentConfig{
            Type:graphql.NewNonNull(graphql.String),
          },
          "headerId": &graphql.ArgumentConfig{
            Type:graphql.NewNonNull(graphql.Int),
          },
        },
        Resolve:resolvers.InsertPassenger,
      },
      "insertDetailTransaction": &graphql.Field{
        Type:types.GetDetailTransactionType(),
        //HeaderId int, FlightId int, Quantity int, Type string
        Args: graphql.FieldConfigArgument{
          "headerId": &graphql.ArgumentConfig{
            Type:graphql.NewNonNull(graphql.Int),
          },
          "flightId": &graphql.ArgumentConfig{
            Type:graphql.NewNonNull(graphql.Int),
          },
          "quantity": &graphql.ArgumentConfig{
            Type:graphql.NewNonNull(graphql.Int),
          },
          "type": &graphql.ArgumentConfig{
            Type:graphql.NewNonNull(graphql.String),
          },
        },
        Resolve:resolvers.InsertDetailTransaction,
      },
      "insertMessage": &graphql.Field{
        Type:types.GetMessageType(),
        //HeaderId int, FlightId int, Quantity int, Type string
        Args: graphql.FieldConfigArgument{
          "from": &graphql.ArgumentConfig{
            Type:graphql.NewNonNull(graphql.Int),
          },
          "to": &graphql.ArgumentConfig{
            Type:graphql.NewNonNull(graphql.Int),
          },
          "message": &graphql.ArgumentConfig{
            Type:graphql.NewNonNull(graphql.String),
          },
        },
        Resolve:resolvers.InsertMessage,
      },
      "UpdateUserById": &graphql.Field{
        Type: types.GetUserType(),
        Args:graphql.FieldConfigArgument{
          "id": &graphql.ArgumentConfig{
            Type:graphql.NewNonNull(graphql.Int),
          },
          "firstName": &graphql.ArgumentConfig{
            Type: graphql.NewNonNull(graphql.String),
          },
          "lastName": &graphql.ArgumentConfig{
            Type: graphql.NewNonNull(graphql.String),
          },
          "email": &graphql.ArgumentConfig{
            Type: graphql.NewNonNull(graphql.String),
          },
          "phoneNumber": &graphql.ArgumentConfig{
            Type: graphql.NewNonNull(graphql.String),
          },
          "nationality": &graphql.ArgumentConfig{
            Type: graphql.NewNonNull(graphql.String),
          },
          "address": &graphql.ArgumentConfig{
            Type: graphql.NewNonNull(graphql.String),
          },
          "cityId": &graphql.ArgumentConfig{
            Type: graphql.NewNonNull(graphql.Int),
          },
          "postCode": &graphql.ArgumentConfig{
            Type: graphql.NewNonNull(graphql.String),
          },
          "gender": &graphql.ArgumentConfig{
            Type: graphql.NewNonNull(graphql.String),
          },
        },
        Resolve:resolvers.UpdateUserById,
      },
      "updateVerifiedPhone": &graphql.Field{
        Type: types.GetUserType(),
        Resolve:resolvers.UpdateVerifiedPhone,
        Args:graphql.FieldConfigArgument{
          "id": &graphql.ArgumentConfig{
            Type:graphql.NewNonNull(graphql.Int),
          },
        },
      },
      "updateVerifiedEmail": &graphql.Field{
        Type: types.GetUserType(),
        Resolve:resolvers.UpdateVerifiedEmail,
        Args:graphql.FieldConfigArgument{
          "id": &graphql.ArgumentConfig{
            Type:graphql.NewNonNull(graphql.Int),
          },
        },
      },
      "insertBlog":&graphql.Field{
         Type: types.GetBlogType(),
         Resolve:resolvers.InsertBlog,
         Args:graphql.FieldConfigArgument{
           "title": &graphql.ArgumentConfig{
             Type: graphql.NewNonNull(graphql.String),
           },
           "description": &graphql.ArgumentConfig{
             Type: graphql.NewNonNull(graphql.String),
           },
           "userId": &graphql.ArgumentConfig{
             Type: graphql.NewNonNull(graphql.Int),
           },
           "image": &graphql.ArgumentConfig{
             Type: graphql.NewNonNull(graphql.String),
           },
         },
      },
      "updateBlogViewer":&graphql.Field{
        Type: types.GetBlogType(),
        Resolve:resolvers.UpdateBlogViewer,
        Args:graphql.FieldConfigArgument{
          "id": &graphql.ArgumentConfig{
            Type: graphql.NewNonNull(graphql.Int),
          },

        },
      },

    },



  })
}
