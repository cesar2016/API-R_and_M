import axios from "axios";


export const ALL_CLIENT = "ALL_CLIENT";
export const INSERT_CLIENT = "INSERT_CLIENT"; 
export const UPDATE_CLIENT = "UPDATE_CLIENT";
export const DELETE_CLIENT = "DELETE_CLIENT"; 
export const ALL_CHAR = "ALL_CHAR";
export const ORIGIN_CHAR = "ORIGIN_CHAR";
export const SERCH = "SERCH";
export const ALL_EPISODES = "ALL_EPISODES";
export const RESET = "RESET"


export function cargardb () {
  return function(dispatch) {
    return axios.post(`http://localhost:3005/registerhd` )
      .then(result => result.data)
      .then(data => {
        dispatch({
          type: "CARGA_DB",
          payload: data
        })
        console.log("la carga DB ", data)
      })
  };
}

export function getClient() {
  return function(dispatch) {
    return axios.get(`http://localhost:3005/clients` )
    .then(result => result.data)
    .then(data => {
      dispatch({
        type: "ALL_CLIENT",
        payload: data
      })
      //console.log("Estos son todos los clientes", data)
    })
  }
}

export function insertClient(client) {
  console.log("El insertClient llega", client)

  return function(dispatch) {
  return axios.post(`http://localhost:3005/clients/addClient`, client )
    .then(result => result.data)
    .then(data => {
      dispatch({
        type: INSERT_CLIENT,
        payload: data
      })
      console.log("El insertClient devuelve", data)
    })
  }
}


export function updateClient(client) {
console.log("El updateClient llega", client)
  return function(dispatch) {
  return axios.put(`http://localhost:3005/clients/updateClient/${client.id}`, client)
    .then(result => result.data)
    .then(data => {
      dispatch({
        type: UPDATE_CLIENT,
        payload: data
      })
      console.log("El updateClient devuelve", data)
    })
  }
}

export function deleteClient(id) {
  console.log("El deleteClient ID llega", id)
  return function(dispatch) {
  return axios.delete(`http://localhost:3005/clients/delete/${id}`)
    .then(result => result.data)
    .then(data => {
      dispatch({
        type: DELETE_CLIENT,
        payload: data
      })
      console.log("El deleteClient devuelve", data)
    })
  }
}

export function serch(idSerch) {
  console.log("llega clientIdOrder ", idSerch)
  return function (dispatch) {
    return axios.get(`http://localhost:3005/clients/search/${idSerch}`)
      .then(res => res.data)
      .then(data => {
        dispatch({
          type: SERCH,
          payload: data,
        });
        console.log("Me devuelve clientIdOrder..", data)
      });
  };
}


// API RICK AN MORTY

export function allChar () {  
  return function(dispatch) {     
  return axios.get(`https://rickandmortyapi.com/api/character/`)
      .then(result => result.data)
      .then(data => {
        dispatch({
          type: ALL_CHAR,
          payload: data
        })
        //console.log("El Actions ",data)
      })
  };
   
}

export function originChar (id) { 
  return function(dispatch) {     
  return axios.get(`https://rickandmortyapi.com/api/location/${id}`)
      .then(result => result.data)
      .then(data => {
        dispatch({
          type: ORIGIN_CHAR,
          payload: data.name
        })         
      })
  };
   
}

export function allEpisodes(id) { 
  return function(dispatch) {     
  return axios.get(`https://rickandmortyapi.com/api/episode/${id}`)
      .then(result => result.data)
      .then(data => {
        dispatch({
          type: ALL_EPISODES,
          payload: data.characters
        })     
        console.log(data.characters)    
      })
  };
   
}

export function reset() { 
  return function(dispatch) {     
  return axios.get(`http://localhost:3005/reset`)
      .then(result => result.data)
      .then(data => {
        dispatch({
          type: RESET,
          payload: data.characters
        })     
        console.log(data.characters)    
      })
  };
   
}