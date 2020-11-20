// import axios from "axios";

import {    
    ALL_CLIENT,     
    INSERT_CLIENT,     
    UPDATE_CLIENT,
    DELETE_CLIENT,
    ALL_CHAR,
    ORIGIN_CHAR,
    SERCH,
    ALL_EPISODES


} from "../actions/index";

const initialState = {
   
  all_client: [],
  all_char: [],
  origin_char: [],
  all_epidodes: []
   
};


const reducer = (state = initialState, action) => {
  switch (action.type) {     

      case ALL_CLIENT:
      return {
        ...state,
        all_client: action.payload,
      };
      

      case INSERT_CLIENT:
        
      return {
        ...state, 
        all_client: [...state.all_client, action.payload]
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
      return {
      ...state,
      all_client: [...state.all_client],
      }

      case ALL_CHAR:
      return {
        ...state,
        all_char: [...state.all_char, action.payload],
      };
      case ORIGIN_CHAR:
      return {
        ...state,
        origin_char: [...state.origin_char, action.payload],
      };

      case SERCH: 
      console.log(action.payload)
      return {
      ...state,
      all_client: action.payload
      };
      case ALL_EPISODES:
      return {
        ...state,
        all_episodes: action.payload,
      };

    default:
      return state;
  }
}; 

export default reducer;