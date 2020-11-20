import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Swal from 'sweetalert2/src/sweetalert2.js'
import Avatar from '@material-ui/core/Avatar';
// tables
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TablePagination from '@material-ui/core/TablePagination';
import Paper from '@material-ui/core/Paper';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Link from '@material-ui/core/Link';
// buttons
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

//Buscador
import { Autocomplete } from '@material-ui/lab';

//Modal
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';


import { getClient, deleteClient, updateClient, insertClient, allChar, originChar, serch, reset } from '../../actions/index';
import { connect } from 'react-redux';



const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  small: {
    width: theme.spacing(3),
    height: theme.spacing(3),
  },
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
  table: {
    minWidth: 650,
  },
  marginBreadcumb:{
    marginBottom:10,
  },
  button:{
    marginBottom:12,
    margin: 3
  }
}));

function Customers({ getClient, all_client, deleteClient, updateClient, insertClient, allChar, all_char, originChar, origin_char, serch, reset }) {
  const classes = useStyles();

  useEffect(() => {
    getClient();
    allChar();   
    addLocation()  
    },[])

  const [open, setOpen] = React.useState(false);
  const [client, setClient] = React.useState({name:'', status:"" ,species:'',type:'', gender:'' ,origin:'',image:''});
  
  //ESTADOS DEL BUSCADOR
  const [value, setValue] = React.useState();
  const [inputValue, setInputValue] = React.useState('');


  //OPCIONES DEL BUSCADOR;
  var options = all_client.map((ele) => {
    return (
      ele.name 
    )
    
  })
  var usuarioBuscado;
  if(value){
    usuarioBuscado = all_client.filter((ele) => ele.name == value )
  }

  const refresh = ()=> {
    if(value != null || value != undefined){
      allChar()
      getClient()
    }
  }

  const handleOpen = (item) => {
      setClient(item)
      setOpen(true)
  };
  const handleClose = () => {
    setClient({
             name:null,
             status:null,
             species:null,
             type:null,
             gender:null,
             origin:null,             
             image:null
             
            })
    setOpen(false)
  };

  

  const handleSubmit = function(e){
  e.preventDefault();
   

  if(client.id){
    let customer = {
      id: client.id,
      name: document.getElementById('name').value,
      status: document.getElementById('status').value,
      species: document.getElementById('species').value,
      type: document.getElementById('type').value,
      gender: document.getElementById('gender').value,
      origin: document.getElementById('origin').value,     
      image: document.getElementById('image').value
      }
    global.customer = customer
    updateClient(customer)
    console.log('EL customerrr  ',customer)
    handleClose()
  }else{
    insertClient(client);
    handleClose()
  }
 
}

  const handleChangeClient = function(e) {
    const {id, value } = e.target
      setClient({
      ...client,
      [id]: value,
    });
  }

   
  // pagination
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  function clientDelete(id, name, lastname){  
    global.idClient = id     
    Swal.fire({
     title: 'ATENCION!',
     text: "Vas a eliminar a: " + name +" "+lastname ,
     icon: 'warning',
     showCancelButton: true,
     confirmButtonColor: '#3085d6',
     cancelButtonColor: '#d33',
     confirmButtonText: 'Si, eliminar'
   }).then((result) => {
     if (result.isConfirmed) {
      deleteClient(id)
      getClient();
      getClient();
       
       Swal.fire(
         'Eliminado!',
         'Con exito.',
         'success'
       )
     }
   })
    
  }

  function resetDB(){  
         
    Swal.fire({
     title: 'ATENCION!',
     text: "Quiere resetear los datos de la DB" ,
     icon: 'warning',
     showCancelButton: true,
     confirmButtonColor: '#3085d6',
     cancelButtonColor: '#d33',
     confirmButtonText: 'Si, eliminar'
   }).then((result) => {
     if (result.isConfirmed) {
      reset()
      getClient();
      getClient();
       
       Swal.fire(
         'Delete!',
         'Con exito.',
         'success'
       )
     }
   })
    
  }

//Sacando toda la info de los personajes sin 
var roots = all_char.map(function(num) {
    return num.results;
    
}); 

var char = roots[0] ? roots[0].map(function(personaje) {
  return personaje;
  
}):'Ups! no hay personajes';
 
 
const addLocation = ()=>{    
  for (let j = 0; j < char.length; j++) {
    global.index = j
    originChar(j)       
  
  }

}
  

 
const insertChar = ()=>{
 
  for (let i = 0; i < char.length; i++) {
    const date = char[i];

    const dates ={     
      gender: date.gender,     
      image: date.image,
      name: date.name,
      origin: origin_char[i+1],
      species: date.species,
      status: date.status,
      type: date.type
    }

    insertClient(dates)    

  }

}
  
  return (
    <div style={{marginTop:'100px', marginLeft:'250px',  marginRight:'20px'}}>
    <Toolbar />
    <h3>RICK AND MORTY</h3>
    <Breadcrumbs aria-label="breadcrumb" className={classes.marginBreadcumb}>
      <Link color="inherit" href="/" >
        Home
      </Link>
      <Typography color="textPrimary">List Characters</Typography>
    </Breadcrumbs>
    
    {/* Buscador de Usuarios */}
    <div>
      <Autocomplete
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);          
          
        }}
        inputValue={inputValue}
        onInputChange={(event, newInputValue) => {
          setInputValue(newInputValue);
          serch(options.indexOf(newInputValue)+1)
          refresh() 
          
        }}
        id="controllable-states-demo"
        options={options}
        style={{ width: 300 }}
        renderInput={(params) => <TextField {...params} label="Search Characters" variant="outlined" />}
      />
    </div>


    <Grid container>
       <Grid item sm={12} align="right">
       <Button variant="contained" color="secundary" className={classes.button} onClick={()=>resetDB()}>
           RESET DB
          </Button>
        <Button variant="contained" color="primary" className={classes.button} onClick={()=>handleOpen(client)}>
           New Characters
          </Button>
          <Button variant="contained" color="primary" className={classes.button} onClick={()=>insertChar()}>
           Add All Characters
          </Button>
         
            <Dialog  open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
              <DialogTitle id="form-dialog-title">{client.id ? 'Modificar' : 'Nuevo'} Cliente</DialogTitle>
              <form onSubmit={handleSubmit}>
        <DialogContent>
              <Grid container spacing={4}>
                 <Grid item sm={12} md={4}>
                   <TextField
                     autoFocus
                     margin="dense"
                     id="name"
                     defaultValue={client.name}
                     label="NAME"
                     InputLabelProps={{
                        shrink: true,
                      }}
                     type="text"
                     fullWidth
                     onChange={handleChangeClient}
                   />
                 </Grid>
                 <Grid item sm={12} md={4}>
                   <TextField
                     autoFocus
                     defaultValue={client.status}
                     margin="dense"
                     id="status"
                     name="status"
                     label="STATUS"
                     InputLabelProps={{
                        shrink: true,
                      }}
                     type="text"
                     fullWidth
                     onChange={handleChangeClient}
                   />
                 </Grid>
                 <Grid item sm={12} md={4}>
                   <TextField
                     autoFocus
                     defaultValue={client.species}
                     margin="dense"
                     id="species"
                     name="species"
                     label="SPECIES"
                     type="text"
                     InputLabelProps={{
                        shrink: true,
                      }}
                      fullWidth
                      onChange={handleChangeClient}
                   />
                 </Grid>
                 <Grid item sm={12} md={4}>
                 <TextField
                   autoFocus
                   defaultValue={client.type}
                   margin="dense"
                   id="type"
                   label="TYPE"
                   type="text"
                   InputLabelProps={{
                      shrink: true,
                    }}
                    fullWidth
                    onChange={handleChangeClient}
                 />
                 </Grid>
                 <Grid item sm={12} md={4}>
                 <TextField
                   autoFocus
                   defaultValue={client.gender}
                   margin="dense"
                   id="gender"
                   label="GENDER"
                   type="text"
                   InputLabelProps={{
                      shrink: true,
                    }}
                    fullWidth
                    onChange={handleChangeClient}
                 />
                 </Grid>
                 <Grid item sm={12} md={4}>
                 <TextField
                   autoFocus
                   defaultValue={client.origin}
                   margin="dense"
                   id="origin"
                   name="origin"
                   label="ORIGIN"
                   type="text"
                   InputLabelProps={{
                      shrink: true,
                    }}
                    fullWidth
                    onChange={handleChangeClient}
                 />
                 </Grid>
                 <Grid item sm={12} md={4}>
                 <TextField
                   autoFocus
                   defaultValue={client.image}
                   margin="dense"
                   id="image"
                   name="image"
                   label="URL IMAGE"
                   type="text"
                   InputLabelProps={{
                      shrink: true,
                    }}
                    fullWidth
                    onChange={handleChangeClient}
                 />
                 </Grid>                  
              </Grid>
              <DialogActions>
                <Button onClick={handleClose} color="primary">
                  Cancelar
                </Button>
                <Button id="send" type="submit" color="primary">
                  Agregar
                </Button>
              </DialogActions>
        </DialogContent>
        </form>
            </Dialog>
        </Grid>
    </Grid>
    <TableContainer component={Paper}>
     <Table className={classes.table} aria-label="simple table">
       <TableHead>
         <TableRow>
           <TableCell>Name</TableCell>
           <TableCell align="center">Status</TableCell>
           <TableCell align="center">Species</TableCell>
           <TableCell align="center">Type</TableCell>                      
           <TableCell align="center">Geneder</TableCell>
           <TableCell align="center">Origin</TableCell>
           <TableCell align="center">Image</TableCell>
           <TableCell align="center">Acciones</TableCell>
         </TableRow>
       </TableHead>
       <TableBody>
       {all_client ? all_client.map((row) => (
           <TableRow key={row.name}>             
             <TableCell component="th" scope="row">
              <strong>{row.name}</strong> 
             </TableCell>
             <TableCell align="center">{row.status}</TableCell>
             <TableCell align="center">{row.species}</TableCell>
             <TableCell align="center">{row.type}</TableCell> 
             <TableCell align="center">{row.gender}</TableCell>             
             <TableCell align="center">{row.origin}</TableCell>
             <TableCell align="center">
              <div align="center" className={classes.root}>
                <Avatar alt="Remy Sharp" src={row.image} className={classes.large} />
              </div>
             </TableCell>
             <TableCell align="center">
             <IconButton aria-label="edit" onClick={() => handleOpen(row)}>
               <EditIcon />
             </IconButton>
             <IconButton aria-label="delete" onClick={()=>clientDelete(row.id, row.name, row.lastname)}>
               <DeleteIcon />
             </IconButton>
             </TableCell>
           </TableRow>
         )): "Aún no hay clientes."
         }
       </TableBody>
     </Table>
   </TableContainer>
   <TablePagination
     rowsPerPageOptions={[5, 10, 25]}
     component="div"
     count={all_client.length}
     rowsPerPage={rowsPerPage}
     page={page}
     onChangePage={handleChangePage}
     onChangeRowsPerPage={handleChangeRowsPerPage}
   />
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
      serch: (client) => dispatch(serch(client)),
      reset: () => dispatch(reset())
    }
  }

  const mapStateToProps = state => {
    return {
      all_client: state.all_client,
      all_char: state.all_char,
      origin_char: state.origin_char
    }
  }

export default connect(mapStateToProps, mapDispatchToProps)(Customers);