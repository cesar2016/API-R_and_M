import React from 'react';
import Toolbar from '@material-ui/core/Toolbar';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import { connect } from 'react-redux';
import { Button } from '@material-ui/core';
import { userLogout } from '../../actions';
import { useHistory } from 'react-router-dom';


function Home({userLogout}) {
  const history = useHistory();
  function handleClick(){
    userLogout();
    history.push('/')
  }

  return (
    <div style={{marginTop:'100px', marginLeft:'250px'}}> 
      <p>asdkosadksdflfsdlfsdl;fsdalfaslfkaslfasklfakssfkkfkfkkffkkfkfaskslkdlakgfkgjoihefjiajfkalnghgirohjsdMFK</p>
      <Button onClick={handleClick}> Logout</Button>
    </div>
  )
}

const mapDispatchToProps = dispatch => {
  return {
    userLogout: () => dispatch(userLogout()),

  }
}

const mapStateToProps = state => {
  return {
    users: state.users
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)

