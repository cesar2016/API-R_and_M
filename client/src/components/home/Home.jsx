import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';


// tables
import clsx from 'clsx';
 
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import FilledInput from '@material-ui/core/FilledInput';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import MenuItem from '@material-ui/core/MenuItem';
 
 

import { getAllTools, insertTools, getClient, updateTools } from '../../actions/index';
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
}));

function Alquilar({getClient, all_client, getAllTools, all_tools}) {

  useEffect(() => {
    getAllTools();
    getClient();
    },[])
  const classes = useStyles();
  const [input, setInput] = React.useState({
    client: '',
    herramienta: '',
    fdesde: '',
    fhasta: '',
    precio: '',
    nota: '',
  });

  const handleChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  console.log('los inputs ',input)
 
 
  return (
    <div style={{marginTop:'100px', marginLeft:'250px',  marginRight:'20px'}}> 
      
    <Toolbar />
    <h5>ALQUILAR</h5>
    <Breadcrumbs aria-label="breadcrumb" className={classes.marginBreadcumb}>
      <Link color="inherit" href="/" >
        Inicio
      </Link>
      <Typography color="textPrimary">Herramientas</Typography>
    </Breadcrumbs>
    <p></p>
    
    <div className={classes.root}>
       
      <TextField
          id="client"
          name="client"
          select
          label="Nombre Cliente"  
          required         
          onChange={handleChange}
          helperText="Selecciones un cliente"
          variant="outlined"
        >
          {all_client ? all_client.map((option) => (
            <MenuItem value={option.id}>
              {option.name +' '+option.lastname}
            </MenuItem>
          )): 'No hay clientes cargados'}
        </TextField>
         
         
        <TextField
          id="herramienta"
          name="herramienta"
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
          name="fdesde"
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
          name="fhasta"
          required
          className={clsx(classes.margin, classes.textField)}
          InputProps={{
            startAdornment: <InputAdornment position="start"></InputAdornment>,
          }}
          variant="outlined"
        />
      <TextField
          onChange={handleChange}
          label="Precio $ *"
          id="precio"
          name="precio"
          required
          className={clsx(classes.margin, classes.textField)}
          InputProps={{
            startAdornment: <InputAdornment position="start"></InputAdornment>,
          }}
          variant="outlined"
        />
      <FormControl fullWidth className={classes.margin} variant="outlined">
          <InputLabel htmlFor="outlined-adornment-amount">Anotar</InputLabel>
          <OutlinedInput
            id="nota"
            name="nota"
            required
            onChange={handleChange}
           //onChange={handleChange('amount')}
            startAdornment={<InputAdornment position="start">Comentario</InputAdornment>}
            labelWidth={60}
          />
        </FormControl>
        <div>
        <Button variant="contained" color="secondary">
          ENVIAR
        </Button>
        </div>
        
    </div>
    </div>
  )}

  const mapDispatchToProps = dispatch => {
    return {
      getAllTools: () => dispatch(getAllTools()),
      insertTools: (inputTools) => dispatch(insertTools(inputTools)),
      getClient: () => dispatch(getClient()),
      updateTools: (tools)=> dispatch(updateTools(tools)) 
    }
  }

  const mapStateToProps = state => {
    return {
      all_tools: state.all_tools,
      all_client: state.all_client

    }
  }

export default connect(mapStateToProps, mapDispatchToProps)(Alquilar);
