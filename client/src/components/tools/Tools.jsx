import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import ModalCategory from './ModalCategory';

//Modal
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import NativeSelect from '@material-ui/core/NativeSelect';
import FormHelperText from '@material-ui/core/FormHelperText';
import InputLabel from '@material-ui/core/InputLabel';

// tables
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TablePagination from '@material-ui/core/TablePagination';
import Paper from '@material-ui/core/Paper';
// buttons
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import Swal from 'sweetalert2';

import { getAllTools, insertTools, getAllCategory, updateTools, deleteTools } from '../../actions/index';
import { connect } from 'react-redux';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  marginBreadcumb:{
    marginBottom:10,
  },
  button:{
    marginBottom:12,
  }
});

function Tools({ getAllTools, all_tools, getAllCategory, all_categorys, insertTools, updateTools, deleteTools }) {
  useEffect(() => {
    getAllTools();
    getAllCategory();
    },[])
  const classes = useStyles();
  const [tools, setTool] = React.useState({categoryId:null,
                                           createdAt:null,
                                           description:null,
                                           id:null,
                                           name:null,
                                           orderId:null,
                                           status:null,
                                           stock:null,
                                           updatedAt:null
                                          });
  const [open, setOpen] = React.useState(false);
 

  const handleOpen = (item) => {
      setTool(item)
      setOpen(true)
  };
  const handleClose = () => {
    setTool({categoryId:null,
             createdAt:null,
             description:null,
             id:null,
             name:null,
             orderId:null,
             status:null,
             stock:null,
             updatedAt:null
            })
    setOpen(false)
  };

   function deleteTool(idTools){

     Swal.fire({
      title: 'Desea eliminar esta herramienta?',
      text: "Elija una opcion",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'SI'
    }).then((result) => {
      if (result.value) {
        deleteTools(idTools)
        getAllTools()                                   
        Swal.fire({
            icon: 'success',
            title: 'Herramienta eliminada con exito',
            showConfirmButton: false,
            timer: 2000
        })
      }
    })

   }
    
    
    
      
   
  
  const handleSubmit = function(e){
    e.preventDefault();
     
     
    if(tools.id){
      let data = {
        id: tools.id,
        name: document.getElementById('name').value,
        description: document.getElementById('description').value,
        stock: document.getElementById('stock').value,
        categoryId: document.getElementById('categoryId').value       
                }
      global.data = data   
      
      console.log('a ver el data ',data)
      updateTools(data)        
      getAllCategory();
       

    }else{      
      insertTools(tools); 
      getAllTools();  
      
    }
    handleClose()
     
    
  }



  const handleChangeTools = function(e) {
    const {name, value } = e.target
    setTool({
    ...tools,
    [name]: value,
   });
  }

  
 

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };


  return (
    <div style={{marginTop:'100px'}}>
    <Grid container  direction="row" justify="flex-end" spacing={0}>
      <Grid item xs={5} >
        <Grid container direction="row"  spacing={0}>
        <Grid item xs={6}>
          <Button variant="contained" color="primary" className={classes.button} onClick={()=>handleOpen(tools)}>
            Nueva Herramienta
          </Button>
            <Dialog  open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
              <DialogTitle id="form-dialog-title">{tools.id ? 'Modificar' : 'Nueva'} Herramienta</DialogTitle>
              <form onSubmit={handleSubmit}>
              <DialogContent>
                <Grid container spacing={2}>
                   <Grid item sm={12} md={6}>
                     <TextField
                     required
                       autoFocus
                       margin="dense"
                       defaultValue={tools.name}
                       id="name"
                       name="name"
                       label="Nombre(*)"
                       InputLabelProps={{
                          shrink: true,
                        }}
                       type="text"
                       fullWidth
                       onChange={handleChangeTools}
                     />
                   </Grid>
                   <Grid item sm={12} md={6}>
                     <TextField
                      required
                       autoFocus
                       margin="dense"
                       defaultValue={tools.description}
                       id="description"
                       name="description"
                       label="Descripción(*)"
                       InputLabelProps={{
                          shrink: true,
                        }}
                       type="text"
                       fullWidth
                       onChange={handleChangeTools}
                     />
                   </Grid>

                   <Grid item sm={12} md={6}>

                     <TextField
                      required
                       margin="dense"
                       id="stock"
                       name="stock"
                       label="Stock(*)"
                       type="number"
                       defaultValue={tools.stock}
                       InputLabelProps={{
                          shrink: true,
                        }}
                         fullWidth
                         onChange={handleChangeTools}
                     />
                   </Grid>
                   <Grid item sm={12} md={6}>                        
                      <FormControl className={classes.formControl}>
                      <NativeSelect   
                        onChange={handleChangeTools}                        
                        name="categoryId"
                        defaultValue={tools.categoryId}                        
                        id="categoryId"
                      >
                        
                        
                       { tools.id === null ? <option>Elegir categoria </option>: 'null'}
                        {all_categorys.map((cat)=>{
                          return <option value={cat.id}>{cat.name}</option>
                        })
                        }
                        
                      </NativeSelect>
                      </FormControl>         
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
        <Grid item xs={6}>
          <ModalCategory></ModalCategory>
        </Grid>
        </Grid>
      </Grid>
    </Grid>
    <TableContainer component={Paper}>
     <Table className={classes.table} aria-label="simple table">
       <TableHead>
         <TableRow>
           <TableCell>Descripción</TableCell>
           <TableCell align="center">Desacripcion</TableCell>
           <TableCell align="center">Stock</TableCell>
           <TableCell align="center">Categoria</TableCell>
           <TableCell align="center">Acciones</TableCell>
         </TableRow>
       </TableHead>
       <TableBody>
         {all_tools.length > 0 ? all_tools.map((row) => (
           <TableRow key={row.name}>
             <TableCell component="th" scope="row">
               {row.name}
             </TableCell>
             <TableCell align="center">{row.description}</TableCell>
             <TableCell align="center">{row.stock}</TableCell>
             <TableCell align="center">{
              all_categorys.map((cat)=>{                
                  return cat.id === parseInt(row.categoryId) ? cat.name : ''
               })
              
             }
             </TableCell>
             <TableCell align="center">
             <IconButton aria-label="edit" onClick={()=>handleOpen(row)}>
               <EditIcon />
             </IconButton>
             <IconButton aria-label="delete" onClick={()=>deleteTool(row.id)} >
               <DeleteIcon />
             </IconButton>
             </TableCell>
           </TableRow>
         )): "No se han encontrado herramientas."}
       </TableBody>
     </Table>
   </TableContainer>
   <TablePagination
     rowsPerPageOptions={[5, 10, 25]}
     component="div"
     count={all_tools.length}
     rowsPerPage={rowsPerPage}
     page={page}
     onChangePage={handleChangePage}
     onChangeRowsPerPage={handleChangeRowsPerPage}
   />



    </div>
  )}

  const mapDispatchToProps = dispatch => {
    return {
      getAllTools: () => dispatch(getAllTools()),
      insertTools: (inputTools) => dispatch(insertTools(inputTools)),
      getAllCategory: () => dispatch(getAllCategory()),
      updateTools: (tools)=> dispatch(updateTools(tools)),
      deleteTools: (idTools)=> dispatch(deleteTools(idTools)) 
    }
  }

  const mapStateToProps = state => {
    return {
      all_tools: state.all_tools,
      all_categorys: state.all_categorys

    }
  }

export default connect(mapStateToProps, mapDispatchToProps)(Tools);
