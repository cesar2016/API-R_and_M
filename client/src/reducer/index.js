// import axios from "axios";

import {
    PRUEBA_API,
    ALL_CLIENT,
    GET_ALL_TOOLS,
    INSERT_TOOLS,
    GET_ALL_CATEGORY,
    LOGIN,
    LOGIN_TRUE,
    LOGIN_COOKIE,
    INSERT_CLIENT,
    UPDATE_TOOLS,
    UPDATE_CLIENT,
    DELETE_CLIENT,
    TOOLS_DELETE,
    USER_LOGOUT,
    ORDER
    //INSERT_CATEGORY
} from "../actions/index";

const initialState = {
  info_movie: [],
  all_client: [],
  all_tools: [],
  all_categorys: [],
  users: true,
  orders: []
};


const reducer = (state = initialState, action) => {
  switch (action.type) {
    case PRUEBA_API:
      return {
        ...state,
        info_movie: action.payload,
      };

      case ALL_CLIENT:
      return {
        ...state,
        all_client: action.payload,
      };

      case GET_ALL_TOOLS:
      return {
        ...state,
        all_tools: action.payload,
      };

      case GET_ALL_CATEGORY:
      return {
        ...state,
        all_categorys: action.payload,
      };

      case INSERT_TOOLS:
      return {
        ...state, 
        all_tools:  [...state.all_tools, action.payload] //Usar esto para actualizar el estado
      };

      case UPDATE_TOOLS:  //Updetear el array        
      let id = action.payload.id;  
      for (let i = 0; i < state.all_tools.length; i++) {
        const item = state.all_tools[i];
        if(item.id === id){
          state.all_tools.splice(i, 1, action.payload)
         // console.log('que tiene esto ',state.all_tools)
        } 
      }
      return {
        ...state,
      all_tools:  [...state.all_tools],
      };

      case LOGIN:
      return {
        ...state,
        users: action.payload,
      };
      case LOGIN_TRUE:
        return {
          ...state,
          users: true,
      };
      
      case LOGIN_COOKIE:
        return {
          ...state,
          users: action.payload,
      }

      case USER_LOGOUT:
        return {
          ...state,
          users: true,
      }

      case INSERT_CLIENT:
        console.log('llega al reducer ',action.payload)
      return {
        ...state, 
        all_client: [...state.all_client, action.payload] //Usar esto para actualizar el estado
      };

      case UPDATE_CLIENT:  //Updetear el array
      let clientId = action.payload.id;  
      for (let i = 0; i < state.all_client.length; i++) {
        const customer = state.all_client[i];
        if(customer.id === clientId){
          state.all_client.splice(i, 1, action.payload)
         console.log('que tiene esto ',state.all_client)
        }
      }
      return {
        ...state,
      all_client: [...state.all_client],
      };

      case DELETE_CLIENT: 
      console.log('El REDUCERRR ',action.payload)       
      return {
      ...state,
      all_client: [...state.all_client],
      }

      case TOOLS_DELETE: 
      return {
      ...state,
      all_tools: [...state.all_tools],
      }

      case TOOLS_DELETE: 
      return {
      ...state,
      all_tools: [...state.all_tools]
      }

      case ORDER: 
      return {
      ...state,
      orders: action.payload
      }

    default:
      return state;
  }
}; 

export default reducer;