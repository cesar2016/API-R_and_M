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
    USER_LOGOUT
    //INSERT_CATEGORY
} from "../actions/index";

const initialState = {
  info_movie: [],
  all_client: [],
  all_tools: [],
  all_categorys: [],
  users: true,
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

      case UPDATE_TOOLS:       
      return {
        ...state,
      all_tools:  [...state.all_tools, action.payload]
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
      return {
        ...state, 
        all_client: [...state.all_client, action.payload] //Usar esto para actualizar el estado
      };

      case UPDATE_CLIENT:
      return {
        ...state, 
        all_client: [...state.all_client, action.payload] //Usar esto para modificar el estado
      };

      case  DELETE_CLIENT: 
      return {
      ...state,
      users: [...state.users.filter(user => user.id !== action.payload)]
      }

    default:
      return state;
  }
}; 

export default reducer;