
import React, { useState, useEffect  } from 'react';
import { connect } from "react-redux";  
import { NavLink } from 'react-router-dom'
 

import { getClient, deleteClient, updateClient, insertClient, allChar, originChar, serch } from '../../actions/index';

 
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
 


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 2,
    margin: 20
    
  },
  paper: {
    height: 240,
    width: 300,
    marginTop: '70px',
    marginLeft: 10
  },
  control: {
    padding: theme.spacing(1),
  },
   
  
  
}));

 

  

function Galery({ getClient, all_client, deleteClient, updateClient, insertClient, allChar, all_char, originChar, origin_char, serch }) {
  const classes = useStyles();  

  useEffect(() => {
    getClient();
    allChar();  
      
    },[])

   
  
  return (

     
    <div  style={{marginTop:'10px', marginLeft:'200px',  marginRight:'2px'}}>
       
     <Grid container className={classes.root} spacing={1} boxShadow={1}>  
       {all_client ? all_client.map((image) => (
        <NavLink to ={`/detayls/${image.id}`} >
          
        <Grid item xs={3}>        
        <Paper className={classes.paper}>    
        <div key={image}>
            <img className={classes.img} src={image.image} title={image.name}  />             
        </div>     
        </Paper>
        </Grid> 
        </NavLink>
      )): 'Ups! no se encontraron resultados con esos parametros de busqueda'}
    </Grid>
    </div>
     
  )}

  const mapDispatchToProps = dispatch => {    
    return {
      getClient: () => dispatch(getClient()),
      deleteClient: (idClient) => dispatch(deleteClient(global.idClient)),
      insertClient: (client) => dispatch(insertClient(client)),
      updateClient: (customer) => dispatch(updateClient(global.customer)),
      allChar: () => dispatch(allChar()),
      originChar: (index) => dispatch(originChar(global.index)),
      serch: (client) => dispatch(serch(client))
    }
  }

  const mapStateToProps = state => {
    return {
      all_client: state.all_client,
      all_char: state.all_char,
      origin_char: state.origin_char
    }
  }

export default connect(mapStateToProps, mapDispatchToProps)(Galery);