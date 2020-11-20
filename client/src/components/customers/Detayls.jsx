import React, { useState, useEffect  } from 'react';
import { connect } from "react-redux"; 
//import Detayls from "./Detayls"
import { NavLink } from 'react-router-dom'
import { BrowserRouter, Switch, Route } from 'react-router-dom';

// ES6 Modules or TypeScript
//import Swal from 'sweetalert2'

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';


import { getClient, deleteClient, allEpisodes, insertClient, allChar, originChar } from '../../actions/index';




 function Galery({ id, getClient, all_client, allEpisodes, allChar, all_episodes}) {

  useEffect(() => {
    getClient();
    allChar(); 
    allEpisodes(id-2);       
    },[])
    const useStyles = makeStyles((theme) => ({
      root: {
        flexGrow: 1,
      },
      paper: {
        padding: theme.spacing(2),
        margin: 'auto',
        maxWidth: 500,
      },
      image: {
        width: 128,
        height: 128,
      },
      img: {
        margin: 'auto',
        display: 'block',
        maxWidth: '100%',
        maxHeight: '100%',
      },
      item:{
        marginLeft: 300,
        fontSize: 18,
      }
    }));
    
    
      const [spacing, setSpacing] = React.useState(2);
      const classes = useStyles();
    
      const handleChange = (event) => {
        setSpacing(Number(event.target.value));
      };

      var roots = all_client.map(function(nombre) {
        return nombre.name
        
    });
    var imagen = all_client.map(function(img) {
      return img.image
      
  });

  const mapeo = all_episodes ? all_episodes.map(function(epi) {
    return epi
    
}): 'No hay nada';

// for (let i = 0; i < all_episodes.length; i++) {
//   const element = all_episodes[i];
//   console.log(element)
  
// }
console.log('mapea estoooo ',mapeo)

 
  

  global.id = id -2
  return (

    <div  style={{marginTop:'100px', marginLeft:'200px',  marginRight:'2px'}}>

<div className={classes.root}>
      <Paper className={classes.paper}>
        <Grid container spacing={2}>
          <Grid item>
            <ButtonBase className={classes.image}>
              <img className={classes.img} alt="complex" src={imagen[id-2]}/>
            </ButtonBase>
          </Grid>
          <Grid item xs={12} sm container>
            <Grid item xs container direction="column" spacing={2}>
              <Grid item xs>
                <Typography gutterBottom variant="subtitle1">                  
                </Typography>
                <Typography variant="body2" gutterBottom>
                 
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  <h3>{roots[id-2]}</h3>
                </Typography>
              </Grid>
              <Grid item>
                 
              </Grid>
            </Grid>
            <Grid item>
              <Typography>EPISODES</Typography>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </div>
    <hr></hr>
    <Grid className={classes.item}>
    <ol>
    {all_episodes ? all_episodes.map((ep) => (
      <a href={ep} title="Clik para ver">
        <li>
          {ep}
        </li>
        </a>
      )): 'Ups! no se encontraron resultados con esos parametros de busqueda'}
    </ol>
    </Grid>
      
      
    </div>

  );
}

const mapDispatchToProps = dispatch => {    
  return {
    getClient: () => dispatch(getClient()),
    deleteClient: (idClient) => dispatch(deleteClient(global.idClient)),
    insertClient: (client) => dispatch(insertClient(client)),
    allEpisodes: (idEpi) => dispatch(allEpisodes(global.id)),
    allChar: () => dispatch(allChar()),
    originChar: (index) => dispatch(originChar(global.index)),
     
  }
}

const mapStateToProps = state => {
  return {
    all_client: state.all_client,
    all_char: state.all_char,
    all_episodes: state.all_episodes
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Galery);