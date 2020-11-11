import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Swal from 'sweetalert2/src/sweetalert2.js'


// tables
import clsx from 'clsx';
 

import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Icon from '@material-ui/core/Icon';
import Grid from '@material-ui/core/Grid';
 
 

import { getAllTools, insertTools, getClient, updateTools, order } from '../../actions/index';
import { connect } from 'react-redux';
 

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
  margin: {
    margin: theme.spacing(1),
  },
  withoutLabel: {
    marginTop: theme.spacing(3),
  },
  textField: {
    width: '25ch',
  },
  button: {
    margin: theme.spacing(1),
  },
}));

function Alquilar({getClient, all_client, getAllTools, all_tools, order, orders}) {

  useEffect(() => {
    getAllTools();
    getClient();
    },[])

  const classes = useStyles();
  const [input, setInput] = React.useState({
    clientId: '',
    tool: '',
    dateA: '',
    dateB: '',
    price: '',
    commentA: '',
  });

  const handleChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = function(e) {
    e.preventDefault();
    order(input)
    Swal.fire({
      icon: 'success',
      title: 'Orden agregada correctamente!',
      showConfirmButton: false,
      timer: 1500
    })
  }


  return (

    <div style={{marginTop:'100px', marginLeft:'250px',  marginRight:'20px'}}> 
    <Toolbar />
    <h5>Alquilar</h5>
    <Breadcrumbs aria-label="breadcrumb" className={classes.marginBreadcumb}>
      <Link color="inherit" href="/" >
        Inicio
      </Link>
      <Typography color="textPrimary">Herramientas</Typography>
    </Breadcrumbs>
    <form onSubmit={handleSubmit}>
    <div className={classes.root}>

      <TextField
          id="client"
          name="clientId"
          select
          label="Nombre Cliente"
          required
          onChange={handleChange}
          helperText="Selecciones un cliente"
          variant="outlined"
        >
          {all_client ? all_client.map(option => (
            <MenuItem value={option.id}>
              {option.name + ' ' + option.lastname}
            </MenuItem>
          )): 'No hay clientes cargados'}
        </TextField>

        <TextField
          id="herramienta"
          name="tool"
          required
          select
          label="Herramienta"
          onChange={handleChange}
          helperText="Seleccione una herramienta"
          variant="outlined"
        >
          {all_tools ? all_tools.map((option) => (
            <MenuItem value={option.id}>
              {option.name}
            </MenuItem>
          )): 'Aun no hay herramintas cargadas'}
        </TextField>

    </div>
    <div className={classes.root}>

      <TextField
          onChange={handleChange}
          label="Fecha desde *"
          id="fdesde"
          name="dateA"
          required
          type="date"
          className={clsx(classes.margin, classes.textField)}
          InputProps={{
            startAdornment: <InputAdornment position="start"></InputAdornment>,
          }}
          variant="outlined"
        />

      <TextField
          onChange={handleChange}
          label="Fecha hasta *"
          type="date"
          id="fhasta"
          name="dateB"
          required
          className={clsx(classes.margin, classes.textField)}
          InputProps={{
            startAdornment: <InputAdornment position="start"></InputAdornment>,
          }}
          variant="outlined"
        />

      <TextField
          onChange={handleChange}
          label="Precio"
          id="precio"
          name="price"
          required
          className={clsx(classes.margin, classes.textField)}
          // InputProps={{
          //   startAdornment: <InputAdornment position="start"></InputAdornment>,
          // }}
          variant="outlined"
        />

      <Grid item xs={12}>
        <TextField
          className={classes.root}
          id="comentario"
          name="commentA"
          label="Comentario *"
          // placeholer="Comentario"
          multiline
          rows={4}
          variant="outlined"
          maxWidth
          alignItems="flex-start"
          onChange={handleChange}

        />

        <div>
        <Button
        type="submit"
        variant="contained"
        color="primary"
        className={classes.button}
        endIcon={<Icon>send</Icon>}
        alignItems="flex-start"
        >
        ENVIAR
        </Button>
        </div>
      </Grid>
        </div>
        </form>
    </div>
  )}

  const mapDispatchToProps = dispatch => {
    return {
      getAllTools: () => dispatch(getAllTools()),
      insertTools: (inputTools) => dispatch(insertTools(inputTools)),
      getClient: () => dispatch(getClient()),
      updateTools: (tools) => dispatch(updateTools(tools)),
      order: (data) => dispatch(order(data))
    }
  }

  const mapStateToProps = state => {
    return {
      all_tools: state.all_tools,
      all_client: state.all_client,
      orders: state.orders
    }
  }

export default connect(mapStateToProps, mapDispatchToProps)(Alquilar);