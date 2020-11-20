import React, {useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';
import Grid from '@material-ui/core/Grid';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import MenuIcon from '@material-ui/icons/Menu';
import Hidden from '@material-ui/core/Hidden';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import BuildIcon from '@material-ui/icons/Build';
import HomeIcon from '@material-ui/icons/Home';
import PeopleIcon from '@material-ui/icons/People';
import Avatar from '@material-ui/core/Avatar'; 
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import ReactLoading from 'react-loading';
import Swal from 'sweetalert2';


const useStyles = makeStyles((theme) => ({
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    background:'#ff1744'
  },
  list: {
    width: 250,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
}));

function ListItemLink(props) {
  return <ListItem button component="a" {...props} />;
}


function Header({users }) {
  const history = useHistory();
 


  
  const classes = useStyles();
  // menu user login
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  // menu sidebar l
  const [anchorElSidebar, setAnchorElSidebar] = React.useState(null);
  const openSidebar = Boolean(anchorElSidebar);
  const handleMenuSidebar = (event) => {
    setAnchorElSidebar(event.currentTarget);
  };
  const handleCloseSidebar = () => {
    setAnchorElSidebar(null);
  };


  const list = () => (
    <div
      className={classes.list}
      role="presentation"
    >
         
    </div>
)

  return (
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
        <Grid container spacing={3}>
          
          <Grid item xs={2} >
          <Hidden mdUp>
            <IconButton
              display={{ xs: 'block', md: 'none', lg: 'none' }}
              color="inherit"
              aria-label="open drawer"
              onClick={handleMenuSidebar}
              edge="start"
              >
                <MenuIcon display={{ xs: 'block', md: 'none', lg: 'none' }} />
              </IconButton>
              
          </Hidden>
          </Grid>
            <Grid item xs={8}>
            <IconButton
                edge="end"
                aria-label="account of current user"
                //aria-controls={menuId}
                aria-haspopup="true"
                //onClick={handleProfileMenuOpen}
                color="inherit"
              > 
              <img src='https://lh3.googleusercontent.com/proxy/R8SVmtLp2kJAvwd-c0NYfbzDswTWuDlRoO0pF3gz65HdGA4AMzh4hga4wRoukX3RQwHwTlLYSLycEM8cBNr_qZeJ1yLqlG4NE32gAMxf_Xremd0s9tHgqMAgcq76ablL' width="160px" height="50px" />
              </IconButton>              
            </Grid>
            <Grid item align="right" xs={2}>
            <div>
              
            <IconButton
              edge="end"
              aria-label="account of current user"
              //aria-controls={menuId}
              aria-haspopup="true"
              //onClick={handleProfileMenuOpen}
              color="inherit"
            >                     
              <Avatar className={classes.large} alt="Cindy Baker" src="https://icon-library.com/images/developers_colorai-02-512_45584.png" /> 
              &nbsp; <small style={{"color": "#fff", "fontSize": "13px"}}>Welcome! <br/> 
              <b>ADMIN</b>
              </small>      
            </IconButton>   
        
              
          </div>
          
          </Grid>
        </Grid>
        </Toolbar>
      </AppBar>
    );
}
  const mapDispatchToProps = dispatch => {
    return {
       
    }
  }
  
  const mapStateToProps = state => {
    return {
      users: state.users
    }
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(Header);